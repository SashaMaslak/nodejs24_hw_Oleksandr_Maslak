export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserSignUp extends IUserSignIn {
  firstName: string;
  lastName?: string;
  age?: number;
  isStudent: boolean;
}
