import { nanoid } from "nanoid";
import Client from "./Client";

interface ActionSuccess {
  ok: true;
  data?: any;
}

interface ActionError {
  ok: false;
  message: string;
}

class Party {
  socketRoomId: string;
  partyLeader: string | null;
  invites: { [characterName: string]: string };
  clients: { [characterName: string]: Client };

  constructor() {
    this.socketRoomId = "party:" + nanoid();
    this.partyLeader = null;
    this.invites = {};
    this.clients = {};
  }

  invite(targetClient: Client) {
    const characterName = targetClient.character.name;
    const socketId = targetClient.socketId;

    if (!targetClient.isConnected) {
      return { ok: false, message: "This player is offline" };
    }

    if (this.invites[characterName]) {
      return { ok: false, message: "This character was already invited" };
    }
    const inviteId = nanoid(8);
    this.invites[characterName] = inviteId;
    return { ok: true, data: { inviteId } };
  }

  acceptInvite(client: Client, id: string) {
    const trueId = this.invites[client.character.name];
    if (trueId == null) {
      return { ok: false, message: "Invite has expired" };
    }
    if (trueId !== id) {
      return { ok: false, message: "Invalid invite id" };
    }
    if (client.socketId == null) {
      return { ok: false, message: "Client not found" };
    }

    this.clients[client.socketId] = client;
    return { ok: true, data: { roomId: this.socketRoomId } };
  }
}

export default Party;
