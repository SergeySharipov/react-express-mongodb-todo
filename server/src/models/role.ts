import { IRole } from "../types/types"
import { model, Schema } from "mongoose"

const roleSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

export default model<IRole>("role", roleSchema)