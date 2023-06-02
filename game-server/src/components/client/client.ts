class Client {
  username: string;
  // userId: string;
  characterName: string;
  // characterId: string;
  isConnected: boolean;
  disconnectTimestamp: number | null;
  constructor(
    username: string,
    // userId: string,
    characterName: string
    // characterId: string,
  ) {
    this.username = username;
    // this.userId = userId;
    this.characterName = characterName;
    // this.characterId = characterId;
    this.isConnected = false;
    this.disconnectTimestamp = null;
  }

  setConnected() {
    this.disconnectTimestamp = null;
    this.isConnected = true;
  }

  setDisconnected() {
    this.disconnectTimestamp = Date.now();
    this.isConnected = false;
  }
}

export default Client;
