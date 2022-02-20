import express, { Express } from "express"
import cors from "cors"
import routes from "./routes"
import db from "./models/index"
import path from "path"

const app: Express = express()

const PORT: string | number = process.env.PORT || 8080

const production = 'https://react-todo-list-js.herokuapp.com';
const development = 'http://localhost:3000';
const isProduction = process.env.NODE_ENV === "production"
const url = isProduction ? production : development;

if (isProduction) {
  app.use(function (req, res, next) {
    var schema = req.headers['x-forwarded-proto'];

    if (schema === 'https') {
      // Already https; don't do anything special.
      next();
    }
    else {
      // Redirect to https.
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

var corsOptions = {
  origin: url
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(routes.authRoutes)
app.use(routes.userRoutes)
app.use(routes.todoRoutes)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.yalci.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

db.mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  })
  .catch(error => {
    throw error
  })