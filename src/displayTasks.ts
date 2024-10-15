import { ITask } from "./Task";
import { Difficulty } from "./difficulty";
import { State } from "./state";

export function displayTasks(tasks: ITask[]): void {
  console.log("\nTareas encontradas:");
  for (let i = 0; i < tasks.length; i++) {
    console.log(`------- Tarea ${i + 1} -------`);
    console.log(`Título: ${tasks[i].title}`);
    console.log(`Descripción: ${tasks[i].description}`);
    console.log(
      `Estado: ${
        tasks[i].state === State.PENDING
          ? "Pendiente"
          : tasks[i].state === State.ONGOING
            ? "En proceso"
            : "Terminada"
      }`,
    );
    console.log(
      `Fecha de creación: ${tasks[i].creationDate.toLocaleDateString()}`,
    );
    console.log(
      `Fecha de vencimiento: ${
        tasks[i].dueDate !== null ? tasks[i].dueDate : "Sin vencimiento"
      }`,
    );
    console.log(
      `Dificultad: ${
        tasks[i].difficulty === Difficulty.EASY
          ? "★☆☆"
          : tasks[i].difficulty === Difficulty.MEDIUM
            ? "★★☆"
            : "★★★"
      }`,
    );
  }
}
