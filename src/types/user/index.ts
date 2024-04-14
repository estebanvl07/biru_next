export interface IUser {
  id: number;
  email: string;
  name: string;
  sessionStep: number;
  state: number;
  avatar?: string;
}

export interface IGoogleUserRequest {
  token: string;
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string;

  [key: string]: any;
}

export interface IAuthUserRequest {
  email: string;
  password: string;

  [key: string]: any;
}

export interface IAuthUserResponse {
  token: string;
  user: IUser;
}
