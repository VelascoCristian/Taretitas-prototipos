import promptSync from "prompt-sync";
import { isValidDate } from "./isValidDate";
const prompt = promptSync();

export function getValidDueDate(createdAt: Date): Date | null {
  let dueDate: string;
  do {
    dueDate = prompt(
      "Fecha de vencimiento (opcional, formato AAAA-MM-DD): ",
    ).trim();

    if (dueDate === "") {
      return null;
    }

    if (!isValidDate(dueDate)) {
      console.log(
        "La fecha de vencimiento debe ser válida, en el formato correcto y dentro de un rango de años razonable.",
      );
    } else if (new Date(dueDate) <= createdAt) {
      console.log(
        "La fecha de vencimiento debe ser posterior a la fecha de creación.",
      );
    }
  } while (!isValidDate(dueDate) || new Date(dueDate) <= createdAt);

  return new Date(dueDate);
}
