import { ITask } from "./Task";

export function filteredTasks(
  tasks: ITask[],
  filterCondition: string,
): ITask[] {
  let filtered: ITask[] = [];
  for (let i: number = 0; i < tasks.length; i++) {
    if (tasks[i].state === filterCondition) {
      filtered.push(tasks[i]);
    }
  }
  return filtered;
}
