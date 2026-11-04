import express from "express";
import { pinoHttp } from "pino-http";

import postsRouter from "./modules/posts/routes/posts.routes";
import buildTodoRouter from "./modules/todos/todo.containers";
import { logger } from "./utils/logger";
import { customLogger } from "./middleware/custom-logger";
import { privateGuard } from "./middleware/private-guard";

// Создание бэкенд приложения. Для "управления" сервером
const app = express();

// use - специальный Middleware. Учит сервер понимать JSON(преобразовывать JSON в js обьекты и наоборот)
app.use(express.json());

// Вызов middleware для каждого запроса
app.use(customLogger);

// Подключение логгера из библиотеки pino
app.use(pinoHttp({ logger: logger }));

// Тестовый метод для проверки работы приложения
// get - использование метода запроса GET.
// "/user" - адрес (+ http://localhost:3000)
// (_requset, response) => {
//   response.status(200).json({
//     status: "OK",
//     data: {
//       firstName: "John",
//       lastName: "Johnson",
//       age: 30,
//       job: "Backend Developer",
//     },
//   } - выполняется, когда на адрес идёт запрос
// app.get("/user", (_requset, response) => {
//   response.status(200).json({
//     status: "OK",
//     data: {
//       firstName: "John",
//       lastName: "Johnson",
//       age: 30,
//       job: "Backend Developer",
//     },
//   });
// });

// Применение middleware для определенного запроса
app.get("/private", privateGuard, (_request, response) => {
  response
    .status(200)
    .json({ message: "This is private information and you have acceess" });
});

app.use("/posts", postsRouter);
app.use("/todos", buildTodoRouter());

// Порт, через который открывается наше приложение
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT} http://localhost:${PORT}`);
});
