export interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  age?: number;
  isStudent: boolean;
  accessToken?: string;
  refreshToken?: string;
}
