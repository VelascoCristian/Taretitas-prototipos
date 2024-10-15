import { containsIgnoreCase } from "./containsIgnoreCase";
import { ITask } from "./Task";

export function filterTasksBySearchTerm(
  tasks: ITask[],
  searchTerm: string,
): ITask[] {
  const filteredTasks: ITask[] = [];
  for (let i: number = 0; i < tasks.length; i++) {
    if (containsIgnoreCase(tasks[i].title, searchTerm)) {
      filteredTasks.push(tasks[i]);
    }
  }
  return filteredTasks;
}
