import { sortAlphabetically } from "./sortAlphabetically";
import { sortByDueDate } from "./sortByDueDate";
import { sortByCreationDate } from "./sortByCreationDate";
import { ITask } from "./Task";
import promptSync from "prompt-sync";

export function sortTasks(tasks: ITask[]): void {
  const prompt = promptSync();
  let sortOption: string;
  do {
    console.log("\nOrdenar por:");
    console.log("1. Alfabético ascendente");
    console.log("2. Fecha de vencimiento ascendente");
    console.log("3. Fecha de creación ascendente");
    console.log("0. No ordenar");
    sortOption = prompt("Seleccione una opción de ordenamiento: ") || "";

    switch (sortOption) {
      case "1":
        sortAlphabetically(tasks);
        break;
      case "2":
        sortByDueDate(tasks);
        break;
      case "3":
        sortByCreationDate(tasks);
        break;
      case "0":
        break;
      default:
        console.log(
          "Opción inválida. Por favor, seleccione un número del 0 al 3.",
        );
    }
  } while (
    sortOption !== "0" &&
    sortOption !== "1" &&
    sortOption !== "2" &&
    sortOption !== "3"
  );
}
