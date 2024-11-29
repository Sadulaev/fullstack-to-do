export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserSignInDto = {
  name: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  token: string;
  user: User;
};
