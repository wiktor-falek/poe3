export interface User {
  username: string;
  email: string;
  hasConfirmedEmail: boolean;
  registrationTimestamp: number;
  hash: string;
  sessionId: string;
  characterLimit: number;
}
