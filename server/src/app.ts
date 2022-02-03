import express, { Express } from "express"
import cors from "cors"
import routes from "./routes"
import db from "./models/index"

const app: Express = express()

const PORT: string | number = process.env.PORT || 8080

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(routes.authRoutes)
app.use(routes.userRoutes)
app.use(routes.todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.yalci.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

db.mongoose
  .connect(uri)
  .then(() => {
    initial()
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  })
  .catch(error => {
    throw error
  })

function initial() {
  db.role.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new db.role({
        name: "user"
      }).save((err) => {
        if (err) {
          console.log("error", err.message);
        }

        console.log("added 'user' to roles collection");
      });

      new db.role({
        name: "moderator"
      }).save((err) => {
        if (err) {
          console.log("error", err.message);
        }

        console.log("added 'moderator' to roles collection");
      });

      new db.role({
        name: "admin"
      }).save((err) => {
        if (err) {
          console.log("error", err.message);
        }

        console.log("added 'admin' to roles collection");
      });
    } else {
      console.log(`initial() roles collection count = ${count}`);
    }
  });
}