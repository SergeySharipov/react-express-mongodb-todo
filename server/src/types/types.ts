import { Document } from "mongoose"

export interface IUser extends Document {
  username: string,
  email: string,
  password: string,
  roles: Array<IRole>
}

export interface IRole extends Document {
  name: string
}

export interface ITodo extends Document {
  name: string
  description: string
  status: boolean
  creator: string
}

export interface IRequest extends Document {
  userId: string
}
