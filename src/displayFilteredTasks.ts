import { ITask } from "./Task";
export function displayFilteredTasks(filteredTasks: ITask[]): void {
  console.log("\nResultados de búsqueda:");
  for (let i = 0; i < filteredTasks.length; i++) {
    const stateText = filteredTasks[i].state;
    console.log(`${i + 1}. ${filteredTasks[i].title} - Estado: ${stateText}`);
  }
}
