import config from './utils/config'
import express from 'express'
import cors from 'cors'
import routes from "./routes"
import db from "./models/index"
import { requestLogger } from './middlewares/index'
import log from './utils/log'
import path from "path"

const app = express()

const production = 'https://react-todo-list-js.herokuapp.com'
const development = 'http://localhost:3000'
const isProduction = process.env.NODE_ENV === "production"
const url = isProduction ? production : development

if (isProduction) {
  app.use(function (req, res, next) {
    var schema = req.headers['x-forwarded-proto'];

    if (schema === 'https') {
      next();
    }
    else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

var corsOptions = {
  origin: url
};
app.use(cors(corsOptions));
// serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));
// application/json
app.use(express.json())
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger)

app.use(routes.authRoutes)
app.use(routes.userRoutes)
app.use(routes.todoRoutes)

// The "CatchAll" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

log.i('connecting to', config.MONGODB_URI)

db.mongoose.connect(config.MONGODB_URI)
  .then(() => {
    log.i('connected to MongoDB')
  })
  .catch((error) => {
    log.e('error connection to MongoDB:', error.message)
  })

export default app