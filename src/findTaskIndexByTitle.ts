import { ITask } from "./Task";

export function findTaskIndexByTitle(tasks: ITask[], title: string): number {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title === title) {
      return i;
    }
  }
  return -1;
}
