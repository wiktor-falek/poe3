import { nanoid } from "nanoid";
import pyrand from "pyrand";
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
  partyLeader: string;
  invites: { [characterName: string]: string };
  clients: { [characterId: string]: Client };

  constructor(client: Client) {
    const characterId = client.character.id;
    this.socketRoomId = "party:" + nanoid();
    this.partyLeader = characterId;
    this.invites = {};
    this.clients = {
      [`${characterId}`]: client,
    };
  }

  get publicData() {
    return {
      clients: Object.values(this.clients).map((client) => {
        const { character, isConnected } = client;
        return {
          isConnected,
          character: {
            name: character.name,
            level: character.level.value,
            class: character.class,
          },
          isPartyLeader: this.partyLeader === character.id,
        };
      }),
    };
  }

  get size() {
    return Object.keys(this.clients).length;
  }

  invite(targetClient: Client) {
    const characterName = targetClient.character.name;

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
    delete this.invites[client.character.id];
    this.clients[client.character.id] = client;
    return { ok: true };
  }

  leaveParty(client: Client) {
    if (client.character.id === this.partyLeader) {
      if (this.size === 1) return { ok: false, reason: "Cannot leave own party of size 1" };
      const otherClients = Object.keys(this.clients).filter(
        (id) => id !== client.character.id
      );
      const newPartyLeader = pyrand.choice(otherClients);
      if (newPartyLeader) this.partyLeader = newPartyLeader;
    }
    delete this.clients[client.character.id];
    return { ok: true };
  }
}

export default Party;
