import { v4 } from "uuid";

import { Todo, TodoRepositoryData } from "./todo.entity";

class TodoReposity implements TodoRepositoryData {
  // Пример того что мы будем получать с помощью метода GET
  // const store = [
  //   { id: 1234, title: "Shopping", done: false, createdAt: "22.10.2026" },
  //   { id: 12345, title: "Cooking", done: false, createdAt: "22.10.2026" },
  // ];
  private store: Todo[] = [];

  async findAllTodos(): Promise<Todo[]> {
    return this.store;
  }

  async createTodo(title: string): Promise<Todo> {
    const todo: Todo = {
      id: v4(),
      title,
      done: false,
      createdAt: new Date(),
    };

    this.store.push(todo);

    return todo;
  }
}

export { TodoReposity };
