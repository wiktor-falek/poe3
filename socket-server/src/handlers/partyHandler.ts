import { nanoid } from "nanoid";
import type { Socket } from "socket.io";
import { PARTY_SIZE_LIMIT } from "../constants/party";
import type Client from "../helpers/Client";
import ClientStorage from "../helpers/ClientStorage";
import SystemMessage from "../utils/SystemMessage";
import socketRoomSize from "../utils/socketRoomSize";

function validateCharacterName(characterName: any): string | null {
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

    const characterName = validateCharacterName(unvalidatedCharacterName);
    if (characterName == null) {
      return socket.emit("error", "Character does not exist");
    }

    const targetClient = ClientStorage.getClientByUsername(characterName);
    if (targetClient == null) {
      return socket.emit("error", "Character does not exist");
    }

    // create a new room if doesn't already exist
    if (client.partyRoomId == null) {
      client.partyRoomId = "party:" + nanoid();
    }

    const roomId = client.partyRoomId;

    // make sure that size of the room doesnt exceed PARTY_SIZE_LIMIT
    const roomSize = await socketRoomSize(io, roomId)
    console.log({ roomSize });
    if (roomSize >= PARTY_SIZE_LIMIT) {
      return socket.emit("error", "The party is full");
    }

    socket.join(roomId);
    socket
      .to(roomId)
      .emit(
        "party:new-player-join",
        `${client.character.name} has joined the party`
      );

    // send party invite to target
    io.to(targetClient.socketId).emit("party:invite", {
      from: {
        name: client.character.name,
        level: client.character.level.value,
      },
      // TODO: emit some kind of reference like roomId
      // but only if no other client than the one being
      // invited can join the party rooom
    });

    io.to(targetClient.socketId).emit(
      "chat:message",
      new SystemMessage(
        `You have been invited to ${client.character.name}'s party`
      )
    );

    socket.emit(
      "chat:message",
      new SystemMessage(`Invited ${characterName} to the party`)
    );
  };

  socket.on("party:invite-character", partyInvite);
}

export default registerPartyHandler;
