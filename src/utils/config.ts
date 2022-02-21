const PORT = process.env.PORT

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.yalci.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

const AUTH_SECRET = "super-secret-key"

export default {
  AUTH_SECRET,
  MONGODB_URI,
  PORT
}