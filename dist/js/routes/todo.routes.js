"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.get("/:creator/todos", [middlewares_1.authJwt.verifyToken], todo_controller_1.getTodos);
router.post("/:creator/add-todo", [middlewares_1.authJwt.verifyToken], todo_controller_1.addTodo);
router.put("/:creator/edit-todo/:id", [middlewares_1.authJwt.verifyToken], todo_controller_1.updateTodo);
router.delete("/:creator/delete-todo/:id", [middlewares_1.authJwt.verifyToken], todo_controller_1.deleteTodo);
router.delete("/:creator/delete-all-todos", [middlewares_1.authJwt.verifyToken], todo_controller_1.deleteAllTodos);
exports.default = router;
