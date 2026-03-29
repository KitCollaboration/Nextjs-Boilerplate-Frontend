export interface IUser {
  full_name: string;
  email: string;
  organize: { name: string };
}

export interface IUserLoginParams {
  email: string;
  password: string;
}
