export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: string;
  password: string;
  accessLevel: number;
}
