// Задание: Создание мини-симуляции IT-команды
// Контекст: Вам нужно описать процесс создания и проверки фич (функций) в IT-компании с помощью трех классов: FrontendDev (разработчик), QAEngineeer (тестировщик) и ProjectManager (менеджер).
// Шаг 1: Класс FrontendDev (Разработчик)
// Свойства: name (имя).
// Методы: writeCode(featureName: string). Метод принимает название фичи и возвращает объект готовой задачи: { featureName: string, status: "written" }.
// Шаг 2: Класс QAEngineer (Тестировщик)
// Свойства: name (имя), developer (приватное свойство, куда передается объект разработчика).
// Конструктор: принимает имя тестировщика и объект разработчика, с которым он работает в паре.
// Методы: testFeature(taskName: string). Внутри метода тестировщик «просит» разработчика написать код (writeCode), забирает результат и возвращает обновленный объект, меняя статус: { ...результатРазработчика, status: "tested" }.
// Шаг 3: Класс ProjectManager (Менеджер проекта)
// Свойства: name (имя), qa (приватное свойство, куда передается объект тестировщика).
// Конструктор: принимает имя менеджера и объект тестировщика.
// Методы: releaseTask(userStory: string). Метод отправляет задачу на проверку тестировщику (testFeature) и возвращает финальный результат для релиза, добавляя версию: { ...результатТестировщика, version: "v1.0" }.

// 1. Разработчик делает свою часть работы
class FrontendDev {
  name: string;

  constructor(devName: string) {
    this.name = devName;
  }

  writeCode(featureName: string) {
    return { featureName, status: "written" };
  }
}

// 2. Тестировщик зависит от Разработчика
class QAEngineer {
  public name: string;
  private developer: FrontendDev;

  constructor(qaName: string, devObj: FrontendDev) {
    this.name = qaName;
    this.developer = devObj;
  }

  testFeature(taskName: string) {
    const task = this.developer.writeCode(taskName);
    return { ...task, status: "tested" };
  }
}

// 3. Менеджер зависит от Тестировщика и выпускает готовый продукт
class ProjectManager {
  public name: string;
  private qa: QAEngineer;

  constructor(pmName: string, qaObj: QAEngineer) {
    this.name = pmName;
    this.qa = qaObj;
  }

  releaseTask(userStory: string) {
    return {...this.qa.testFeature(userStory), version: "v1.0"};
  }
}

// Проверка работы цепочки
const samDev = new FrontendDev("Sam");
const maxQA = new QAEngineer("Max", samDev);
const annaPM = new ProjectManager("Anna", maxQA);

// Запуск процесса менеджером
const finalRelease = annaPM.releaseTask("Авторизация через Google");
console.log(finalRelease)