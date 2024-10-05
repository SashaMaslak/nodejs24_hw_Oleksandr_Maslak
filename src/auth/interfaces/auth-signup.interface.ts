import { IUserSignIn } from './auth-signin.interface';

export interface IUserSignUp extends IUserSignIn {
  firstName: string;
  lastName?: string;
  age?: number;
  isStudent: boolean;
}
