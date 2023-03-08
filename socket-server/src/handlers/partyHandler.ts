import type { Socket } from "socket.io";
import { PARTY_SIZE_LIMIT } from "../constants/party";
import type Client from "../helpers/Client";
import ClientStorage from "../helpers/ClientStorage";
import socketRoomSize from "../utils/socketRoomSize";
import Party from "../helpers/Party";
import { GlobalMessage, SystemMessage } from "../helpers/message";

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

    // create a new room if doesn't already exist
    if (client.party == null) {
      // create a Party instance
      client.party = new Party();
    }

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
      new SystemMessage(`Invited ${characterName} to the party`)
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

    const { roomId } = result.data!;

    socket.join(roomId);
    socket
      .to(roomId)
      .emit(
        "party:new-player-join",
        `${client.character.name} has joined the party`
      );

    socket.emit(
      "chat:message",
      new SystemMessage(`Joined ${senderCharacterName}'s party`)
    );

    console.log({
      party: senderClient.party,
      roomSize: socketRoomSize(io, roomId),
    });
  };

  socket.on("party:invite-character", partyInvite);
  socket.on("party:accept-invite", acceptInvite);
}

export default registerPartyHandler;
