// Описание сущности(типизация) и интерфейс для репозитория(описания методов, которые мы можем использовать для этой сущности)

export interface Todo {
    id: string;
    title: string;
    done: boolean;
    createdAt: Date;
}

// Пример того что представляет собой 1 todo
// const todo = {
//     id: "12345",
//     title: "Shopping",
//     done: false,
//     createdAt: "22.10.2026"
// }

// Интерфейс(команды управления) репозитория(хранилища)
export interface TodoRepositoryData {
    findAllTodos: () => Promise<Todo[]>;
    createTodo: (title: string) => Promise<Todo>
}