import { ITask } from "./Task";

export function isTitleDuplicate(tasks: ITask[], title: string): boolean {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title === title) {
      return true;
    }
  }
  return false;
}
