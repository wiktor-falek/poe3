import type { Socket } from "socket.io";
import { PARTY_SIZE_LIMIT } from "../constants/party";
import type Client from "../helpers/Client";
import ClientStorage from "../helpers/ClientStorage";
import socketRoomSize from "../utils/socketRoomSize";
import { PartyMessage, SystemMessage } from "../helpers/message";
import Party from "../helpers/Party";

function validateString(characterName: any): string | null {
  if (typeof characterName === "string") {
    return characterName;
  }
  return null;
}

function registerPartyHandler(io: any, socket: Socket, client: Client): void {
  const partyInvite = async (unvalidatedCharacterName: any) => {
    if (client.instance != null) {
      return socket.emit(
        "error",
        "Cannot invite to party while an instance is active"
      );
    }

    const characterName = validateString(unvalidatedCharacterName);
    if (characterName == null) {
      return socket.emit("error", "Invalid character name");
    }

    const targetClient = ClientStorage.getClientByCharacterName(characterName);
    if (targetClient == null) {
      // NOTE: there is a possibility that character doesn't exist
      return socket.emit("error", "This character is not in game");
    }

    if (!targetClient.isConnected) {
      // This will be reached only if targetClient disconnected recently,
      // before the client was removed from ClientStorage
      return socket.emit("error", "This player is offline");
    }

    // subscribe the sender to party room, since this is the first occurence where it's needed
    socket.join(client.party.socketRoomId);

    const party = client.party;
    const roomId = client.party.socketRoomId;

    // make sure that size of the room doesnt exceed PARTY_SIZE_LIMIT
    const roomSize = await socketRoomSize(io, roomId);
    console.log({ roomSize });
    if (roomSize >= PARTY_SIZE_LIMIT) {
      return socket.emit("error", "The party is full");
    }

    const result = party.invite(targetClient);
    if (!result.ok) return socket.emit("error", result.message);

    const inviteId = result.data?.inviteId;

    // send party invite to target
    io.to(targetClient.socketId).emit("party:invite", {
      from: {
        name: client.character.name,
        level: client.character.level.value,
      },
      inviteId: result.data?.inviteId,
    });

    io.to(targetClient.socketId).emit(
      "chat:message",
      new SystemMessage(
        `You have been invited to ${client.character.name}'s party\n /partyjoin ${client.character.name} ${inviteId}`
      )
    );

    socket.emit(
      "chat:message",
      new PartyMessage(`Invited ${characterName} to the party`, "SYSTEM")
    );
  };

  const acceptInvite = (_senderCharacterName: string, _id: string) => {
    const senderCharacterName = validateString(_senderCharacterName);
    const id = validateString(_id);
    if (senderCharacterName == null || id == null) {
      return socket.emit("error", "Invalid input(s)");
    }

    const senderClient =
      ClientStorage.getClientByCharacterName(senderCharacterName);
    if (senderClient == null || senderClient.party == null) {
      return socket.emit("error", "Party does not exist");
    }

    const result = senderClient.party.acceptInvite(client, id);
    if (!result.ok) return socket.emit("error", result.message);

    client.party = senderClient.party;
    const roomId = client.party.socketRoomId;

    io.to(roomId).emit(
      "party:new-player-join",
      `${client.character.name} has joined the party`
    );

    socket.join(roomId);

    io.to(roomId).emit("party:data", client.party.publicData);

    socket.emit(
      "chat:message",
      new SystemMessage(`Joined ${senderCharacterName}'s party`)
    );
  };

  const leaveParty = () => {
    const previousParty = client.party;
    const roomId = client.party.socketRoomId;

    const result = client.party.leaveParty(client);
    if (!result.ok) {
      socket.emit("chat:message", new SystemMessage("Failed to leave party"));
    }

    socket.leave(roomId);

    io.to(roomId).emit("party:data", client.party.publicData);
    io.to(roomId).emit(
      "chat:message",
      new PartyMessage(
        `Character ${client.character.name} has left the party`,
        "SYSTEM"
      )
    );

    socket.leave(roomId);
    client.party = new Party(client);
    socket.emit("party:data", client.party.publicData);

    console.log("BEFORE", previousParty);
    console.log("AFTER", client.party);

    io.to(previousParty.socketRoomId).emit(
      "party:data",
      previousParty.publicData
    );

    // 1. if client is party leader, assign party leader status to another client at random
    // 2. unsubscribe from the party.socketRoomId
    // 3. emit to the party.socketRoomId that character has left the party
    // 4. set client.party to new Party(client.character.id)
  };

  const getData = () => {
    return socket.emit("party:data", client.party.publicData);
  };

  socket.on("party:invite-character", partyInvite);
  socket.on("party:accept-invite", acceptInvite);
  socket.on("party:leave-party", leaveParty);
  socket.on("party:get-data", getData);
}

export default registerPartyHandler;
