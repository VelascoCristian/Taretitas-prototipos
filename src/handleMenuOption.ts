import { Task, ITask } from "./Task";

let tasks: ITask[] = [];

export function handleMenuOption(option: string) {
  switch (option) {
    case "1":
      const taskPrototypeForView = Object.create(Task.prototype);
      taskPrototypeForView.viewTasks(tasks);
      break;
    case "2":
      const taskPrototypeForSearch = Object.create(Task.prototype);
      tasks = taskPrototypeForSearch.searchTask(tasks);
      break;
    case "3":
      const taskPrototype = Object.create(Task.prototype);
      const newTask = taskPrototype.addTask(tasks);
      if (newTask) {
        tasks.push(newTask);
      }
      break;
    case "0":
      console.log("Saliendo, saludos 👋...");
      break;
    default:
      console.error("Por favor, ingresa un número válido.");
  }
}
