class Client {
  username: string;
  userId: string;
  characterId: string;
  characterName: string;
  isConnected: boolean;
  constructor(
    username: string,
    userId: string,
    characterId: string,
    characterName: string,
    friends?: Array<unknown>
  ) {
    this.username = username;
    this.userId = userId;
    this.characterId = characterId;
    this.characterName = characterName;
    this.isConnected = false;
  }
}

export default Client;
