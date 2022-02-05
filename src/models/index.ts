import mongoose from "mongoose"
import User from "./user"
import Role from "./role"

mongoose.Promise = global.Promise;

const db = {
  mongoose: mongoose,
  user: User,
  role: Role,
  ROLES: ["user", "admin", "moderator"]
};

export default db