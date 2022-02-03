"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const index_1 = __importDefault(require("./models/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use((0, cors_1.default)(corsOptions));
// parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.default.authRoutes);
app.use(routes_1.default.userRoutes);
app.use(routes_1.default.todoRoutes);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@todo.yalci.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
index_1.default.mongoose
    .connect(uri)
    .then(() => {
    initial();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
    .catch(error => {
    throw error;
});
function initial() {
    index_1.default.role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new index_1.default.role({
                name: "user"
            }).save((err) => {
                if (err) {
                    console.log("error", err.message);
                }
                console.log("added 'user' to roles collection");
            });
            new index_1.default.role({
                name: "moderator"
            }).save((err) => {
                if (err) {
                    console.log("error", err.message);
                }
                console.log("added 'moderator' to roles collection");
            });
            new index_1.default.role({
                name: "admin"
            }).save((err) => {
                if (err) {
                    console.log("error", err.message);
                }
                console.log("added 'admin' to roles collection");
            });
        }
        else {
            console.log(`initial() roles collection count = ${count}`);
        }
    });
}
