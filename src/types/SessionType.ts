export type SessionType = {
  user: {
    email: string;
    name: string;
    subscription: string;
    token: string;
    avatarURL: string;
  };
} | null;
