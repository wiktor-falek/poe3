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
  partyLeader: string;
  invites: { [characterName: string]: string };
  clients: { [characterId: string]: Client };

  constructor(client: Client) {
    const characterId = client.character._id.toString();
    this.socketRoomId = "party:" + nanoid();
    this.partyLeader = characterId;
    this.invites = {};
    this.clients = {
      characterId: client,
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
          isPartyLeader: this.partyLeader === character._id.toString(),
        };
      }),
    };
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

    this.clients[client.character._id.toString()] = client;
    return { ok: true };
  }

  leaveParty() {
    // if the client that leaves the party is a party leader, party leader is assigned to another client
    // when the client leaves the party, client.party is set to new Party();
  }
}

export default Party;
