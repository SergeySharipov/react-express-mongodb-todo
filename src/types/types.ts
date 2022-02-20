import { Document } from "mongoose"

export interface IUser extends Document {
  username: string,
  email: string,
  password: string
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
