// writing - соеденяем все независимые слои

import { Router } from "express";
import { TodoReposity } from "./todo.repository";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { createTodoRouter } from "./todo.router";

function buildTodoRouter(): Router {
  const repository = new TodoReposity();
  const service = new TodoService(repository);
  const controller = new TodoController(service);

  return createTodoRouter(controller);
}

export default buildTodoRouter;
