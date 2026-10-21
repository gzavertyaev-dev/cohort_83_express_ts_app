import { Router } from "express";
import { v4 } from "uuid";

import { Post } from "../types";

// С помощью router в дальнейшем мы сможем прописывать
// логику ответов на запросы (router.get())
const router = Router();

// Пока мы будем хранить данные локально (без БД)
// Мы сможем использовать любые методы и они будут работать, но
// при перезагрузки сервера новые данные будут потеряны
const posts: Post[] = [
  {
    id: v4(),
    firstName: "John",
    lastName: "Johnson",
    title: "Weather",
    text: "It is dark again!!!",
  },
  {
    id: v4(),
    firstName: "Brayan",
    lastName: "Johnson",
    title: "Job",
    text: "I've got a new job!))",
  },
];

// GET /posts - получить всее посты от пользователей
// т.к в index.ts мы используем url /posts, то в данном файле
// мы можем не указывать каждый раз /posts, а указывать просто /
router.get("/", (_request, response) => {
  response.status(200).json(posts);
});

// GET /posts/:id - получение одного поста
router.get("/:id", (request, response) => {
  // path params
  // params - обьект с параметрами запроса
  // {id} - деструктуризация обьекта params
  const { id }: any = request.params;

  const findedPost = posts.find((post) => post.id === id);

  if (!findedPost) {
    response
      .status(404)
      .json({ code: 404, message: `Post with id ${id} not found` });
  } else {
    response.status(200).json(findedPost);
  }
});

export default router;

// POST /posts - добавление нового поста
// {firstName: "", lastName: "", title: "", text: ""}
router.post("/", (_request, response) => {
  // Забираем данные которые нам прислал клиент с фронтенда
  const { firstName, lastName, title, text }: Post = _request.body;

  if (!firstName || !lastName || !title || !text) {
    response.status(400).json({ code: 400, message: "Bad request" });
  } else {
    const post = { id: v4(), firstName, lastName, title, text };
    posts.push(post);
    response.status(201).json(post);
  }
});

// PATCH /posts/:id - изменение(обновление) поста по id
router.patch("/:id", (request, response) => {
  // Получаем id поста, который пользователь хочет изменить
  const { id } = request.params;
  // Получаем данные с тела запроса, которые пользовтель хочет изменить
  const { firstName, lastName, title, text }: Post = request.body;

  const postForUpdate = posts.find((post) => post.id === id);

  if (!postForUpdate) {
    response
      .status(404)
      .json({ code: 404, message: `Post with ${id} is not found` });
    throw new Error("Not found");
  }

  if (!firstName && !lastName && !title && !text) {
    response.status(400).json({ code: 400, message: "Bad request" });
  }

  if (firstName) {
    postForUpdate.firstName = firstName;
  }

  if (lastName) {
    postForUpdate.lastName = lastName;
  }

  if (title) {
    postForUpdate.title = title;
  }

  if (text) {
    postForUpdate.text = text;
  }

  response.status(200).json(postForUpdate);
});
