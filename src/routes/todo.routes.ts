import { Request, Response, NextFunction } from 'express';
import { Router } from "express"
import { authJwt } from "../middlewares/"
import { getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos } from "../controllers/todo.controller"

const router: Router = Router()

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/:creator/todos", [authJwt.verifyToken], getTodos)

router.post("/:creator/add-todo", [authJwt.verifyToken], addTodo)

router.put("/:creator/edit-todo/:id", [authJwt.verifyToken], updateTodo)

router.delete("/:creator/delete-todo/:id", [authJwt.verifyToken], deleteTodo)

router.delete("/:creator/delete-all-todos", [authJwt.verifyToken], deleteAllTodos)

export default router