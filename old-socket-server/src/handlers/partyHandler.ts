import type { Socket } from "socket.io";
import { PARTY_SIZE_LIMIT } from "../constants/party";
import type Client from "../helpers/Client";
import ClientStorage from "../helpers/ClientStorage";
import { PartyMessage, SystemMessage } from "../helpers/message";
import Party from "../helpers/Party";

function validateString(characterName: any): string | null {
  if (typeof characterName === "string") {
    return characterName;
  }
  return null;
}

function registerPartyHandler(io: any, socket: Socket, client: Client): void {
  const partyInvite = async (characterName: string) => {
    if (client.instance != null) {
      return socket.emit(
        "error",
        "Cannot invite to party while an instance is active"
      );
    }

    if (validateString(characterName) == null) {
      return socket.emit("error", "Invalid argument");
    }

    const targetClient = ClientStorage.getClientByCharacterName(characterName);
    if (targetClient == null || !targetClient.isConnected) {
      return new SystemMessage("This character is offline");
    }

    const party = client.party;

    // subscribe the sender to party room, since this is the first occurence where it's needed
    socket.join(party.socketRoomId);

    // make sure that size of the room doesnt exceed PARTY_SIZE_LIMIT
    if (party.size >= PARTY_SIZE_LIMIT) {
      return socket.emit("error", "The party is full");
    }

    const result = party.invite(targetClient);
    if (!result.ok) return socket.emit("error", result.message);

    const inviteId = result.data!.inviteId;
    if (inviteId == null) return socket.emit("error", "Invalid invite");

    io.to(targetClient.socketId).emit("party:invite", {
      from: {
        name: client.character.name,
        class: client.character.class,
        level: client.character.level.value,
      },
      inviteId,
    });

    io.to(targetClient.socketId).emit(
      "chat:message",
      new PartyMessage(
        `You have been invited to ${client.character.name}'s party`
      )
    );

    io.to(party.socketRoomId).emit(
      "chat:message",
      new PartyMessage(`Invited ${characterName} to the party`)
    );
  };

  const partyKick = async (characterName: string) => {
    if (validateString(characterName) == null) {
      return socket.emit("error", "Invalid argument");
    }

    const party = client.party;
    if (!party.isPartyLeader(client)) {
      return socket.emit("error", "You are not the party leader");
    }

    const targetClient = ClientStorage.getClientByCharacterName(characterName);

    if (targetClient) {
      client.party.leave(targetClient);
      const roomId = client.party.socketRoomId;
      io.to(roomId).emit("party:data", client.party.publicData);
      targetClient.party = new Party(targetClient);
      io.to(targetClient.socketId).emit(
        "party:data",
        targetClient.party.publicData
      );
    }
  };

  const acceptInvite = (_senderCharacterName: string, _id: string) => {
    const senderCharacterName = validateString(_senderCharacterName);
    const id = validateString(_id);
    if (senderCharacterName == null || id == null) {
      return socket.emit("error", "Invalid input(s)");
    }

    if (client.instance != null) {
      return socket.emit("error", "Cannot join a party while in an instance");
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
      "chat:message",
      new PartyMessage(
        `${client.character.name} has joined the party`,
        "SYSTEM"
      )
    );

    socket.join(roomId);

    io.to(roomId).emit("party:data", client.party.publicData);

    socket.emit(
      "chat:message",
      new PartyMessage(`Joined ${senderCharacterName}'s party`)
    );
  };

  const leaveParty = () => {
    const previousParty = client.party;
    const roomId = client.party.socketRoomId;

    const result = client.party.leave(client);
    if (!result.ok) {
      return socket.emit("error", "Failed to leave party");
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
  socket.on("party:kick-character", partyKick);
  socket.on("party:accept-invite", acceptInvite);
  socket.on("party:leave-party", leaveParty);
  socket.on("party:get-data", getData);
}

export default registerPartyHandler;
