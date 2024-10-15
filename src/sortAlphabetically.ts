import { ITask } from "./Task";

export function sortAlphabetically(tasks: ITask[]): void {
  for (let i: number = 0; i < tasks.length - 1; i++) {
    for (let j: number = 0; j < tasks.length - i - 1; j++) {
      if (tasks[j].title.toLowerCase() > tasks[j + 1].title.toLowerCase()) {
        let temp: ITask = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }
}
