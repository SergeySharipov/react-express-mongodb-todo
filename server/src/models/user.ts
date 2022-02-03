import { IUser } from "../types/types"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "role"
      }
    ]
  },
  { timestamps: true }
)

export default model<IUser>("user", userSchema)
