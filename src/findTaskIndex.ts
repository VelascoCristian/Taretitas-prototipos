import { ITask } from "./Task";

export function findTaskIndex(tasks: ITask[], taskTitle: string): number {
  for (let i: number = 0; i < tasks.length; i++) {
    if (tasks[i].title === taskTitle) {
      return i;
    }
  }
  return -1;
}
