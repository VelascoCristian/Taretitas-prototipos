import { ITask } from "./Task";

export function sortByDueDate(tasks: ITask[]): void {
  for (let i: number = 0; i < tasks.length - 1; i++) {
    for (let j: number = 0; j < tasks.length - i - 1; j++) {
      let date1: Date =
        tasks[j].dueDate === null
          ? new Date(8640000000000000)
          : tasks[j].dueDate!;
      let date2: Date =
        tasks[j + 1].dueDate === null
          ? new Date(8640000000000000)
          : tasks[j + 1].dueDate!;

      if (date1 > date2) {
        let temp: ITask = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }
}
