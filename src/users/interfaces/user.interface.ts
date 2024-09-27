export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IGetUser {
  id: number;
}

export class ICreateUser {
  name: string;
  email: string;
}

export interface IUpdateUser {
  name: string;
  email: string;
}

export interface IPartUpdateUser {
  name?: string;
  email?: string;
}
