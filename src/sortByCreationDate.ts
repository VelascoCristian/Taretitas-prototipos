import { ITask } from "./Task";

export function sortByCreationDate(tasks: ITask[]): void {
  for (let i: number = 0; i < tasks.length - 1; i++) {
    for (let j: number = 0; j < tasks.length - i - 1; j++) {
      let date1: Date = new Date(tasks[j].creationDate);
      let date2: Date = new Date(tasks[j + 1].creationDate);
      if (date1 > date2) {
        let temp: ITask = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }
}
