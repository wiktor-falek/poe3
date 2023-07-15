export interface User {
  id: number;
  username: string;
  email: string;
  hasConfirmedEmail: boolean;
  hash: string;
  registrationTimestamp: number;
  sessionId: string;
  characterLimit: number;
}
