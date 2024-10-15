import { State } from "./state";
import { Difficulty } from "./difficulty";
import promptSync from "prompt-sync";
import { isTitleDuplicate } from "./isTitleDuplicate";
import { getValidDueDate } from "./getValidDueDate";
import { getDifficulty } from "./getDifficulty";
import { filteredTasks } from "./filteredTasks";
import { sortTasks } from "./sortTasks";
import { displayTasks } from "./displayTasks";
import { findTaskIndex } from "./findTaskIndex";
import { filterTasksBySearchTerm } from "./filterTasksBySearchTerm";
import { displayFilteredTasks } from "./displayFilteredTasks";
import { promptForTaskSelection } from "./promptForTaskSelection";
import { findTaskIndexByTitle } from "./findTaskIndexByTitle";

export interface ITask {
  title: string;
  description: string;
  state: string;
  creationDate: Date;
  dueDate: Date | null;
  difficulty: string;
  modified: Date | null;
}

export interface TaskConstructor {
  new (
    titulo: string,
    descripcion?: string,
    vencimiento?: Date | null,
    dificultad?: string,
  ): ITask;
}

export const Task: TaskConstructor = function (
  this: ITask,
  title: string,
  description: string = "",
  dueDate: Date | null = null,
  difficulty: string = Difficulty.EASY,
) {
  this.title = title;
  this.description = description;
  this.state = State.PENDING;
  this.creationDate = new Date();
  this.dueDate = dueDate;
  this.difficulty = difficulty;
  this.modified = null;
} as any;

const prompt = promptSync();

Task.prototype.addTask = function addTask(tasks: ITask[]): ITask {
  console.log("Agregar una nueva tarea:");
  let title: string;
  let isDuplicate: boolean = false;

  do {
    title = prompt("Título (obligatorio): ").trim();
    if (title === "") {
      console.log("El título no puede estar vacío. Intenta nuevamente.");
      continue;
    }
    isDuplicate = isTitleDuplicate(tasks, title);
    if (isDuplicate) {
      console.log("El título ya existe. Por favor, elige otro título.");
    }
  } while (title === "" || isDuplicate);

  const description: string =
    prompt("Descripción (opcional): ") || "Sin descripción";

  const dueDate: Date | null = getValidDueDate(new Date());
  const difficulty: string = getDifficulty(prompt);

  const newTask = new Task(title, description, dueDate, difficulty);

  console.log("Tarea agregada exitosamente.");
  return newTask;
};

Task.prototype.editTask = function (task: ITask): ITask {
  console.log("\nEditando tarea:");

  console.log(`Título actual: ${task.title}`);
  let newTitle: string =
    prompt("Nuevo título (dejar en blanco para mantener el actual): ") || "";
  if (newTitle.trim() !== "") {
    task.title = newTitle;
  }

  console.log(`Descripción actual: ${task.description}`);
  let newDescription: string =
    prompt("Nueva descripción (dejar en blanco para mantener la actual): ") ||
    "";
  if (newDescription !== "") {
    task.description = newDescription;
  }

  console.log(`Estado actual: ${task.state}`);
  let newState: string;
  do {
    newState =
      prompt(
        `Nuevo estado (1.${State.PENDING}, 2.${State.ONGOING}, 3.${State.FINISHED}, ingrese 1, 2, 3 o deja en blanco para mantener el actual): `,
      ) || "";
    if (
      newState !== "" &&
      newState !== "1" &&
      newState !== "2" &&
      newState !== "3"
    ) {
      console.log("Estado inválido. Por favor, intente nuevamente.");
    }
  } while (
    newState !== "" &&
    newState !== "1" &&
    newState !== "2" &&
    newState !== "3"
  );
  if (newState !== "") {
    switch (newState) {
      case "1":
        newState = State.PENDING;
        break;
      case "2":
        newState = State.ONGOING;
        break;
      case "3":
        newState = State.FINISHED;
        break;
      default:
        newState = State.PENDING;
    }
    task.state = newState;
  }

  console.log(
    `Fecha de vencimiento actual: ${task.dueDate || "Sin vencimiento"}`,
  );
  let newDueDate: string =
    prompt(
      "Nueva fecha de vencimiento (formato YYYY-MM-DD, 'Sin vencimiento', o dejar en blanco para mantener la actual): ",
    ) || "";

  if (newDueDate === "Sin vencimiento") {
    task.dueDate = null;
  } else if (newDueDate !== "") {
    task.dueDate = new Date(newDueDate);
  }

  console.log(`Dificultad actual: ${task.difficulty}`);
  let newDifficulty: string;
  do {
    newDifficulty =
      prompt(
        "Nueva dificultad (1. Facil, 2. Medio, 3. Dificil, ingrese 1, 2, 3 o deja en blanco para mantener la actual): ",
      ) || "";
    if (
      newDifficulty !== "" &&
      newDifficulty !== "1" &&
      newDifficulty !== "2" &&
      newDifficulty !== "3"
    ) {
      console.log("Dificultad inválida. Por favor, intente nuevamente.");
    }
  } while (
    newDifficulty !== "" &&
    newDifficulty !== "1" &&
    newDifficulty !== "2" &&
    newDifficulty !== "3"
  );
  if (newDifficulty !== "") {
    switch (newDifficulty) {
      case "1":
        newDifficulty = Difficulty.EASY;
      case "2":
        newDifficulty = Difficulty.MEDIUM;
      case "3":
        newDifficulty = Difficulty.HARD;
      default:
        newDifficulty = Difficulty.EASY;
    }
    task.difficulty = newDifficulty;
  }

  task.modified = new Date();
  console.clear();
  console.log("Tarea actualizada con éxito.");

  displayTasks([task]);
  return task;
};

Task.prototype.viewTasks = function (tasks: ITask[]): ITask[] {
  let option: string;
  let modifiedTasks: ITask[] = tasks.slice();

  do {
    console.log("\n--------------");
    console.log("Ver Tareas");
    console.log("1. Todas");
    console.log("2. Pendientes");
    console.log("3. En progreso");
    console.log("4. Terminadas");
    console.log("0. Salir");
    option = prompt("Seleccione una opción: ") || "";

    let currentFilteredTasks: ITask[] = [];
    let filterCondition: string = "";

    switch (option) {
      case "1":
        currentFilteredTasks = modifiedTasks.slice();
        break;
      case "2":
        filterCondition = State.PENDING;
        break;
      case "3":
        filterCondition = State.ONGOING;
        break;
      case "4":
        filterCondition = State.FINISHED;
        break;
      case "0":
        console.log("Volviendo al menú principal...");
        return modifiedTasks;
      default:
        console.log(
          "Opción inválida. Por favor, seleccione un número del 0 al 4.",
        );
        continue;
    }

    if (filterCondition !== "") {
      currentFilteredTasks = filteredTasks(modifiedTasks, filterCondition);
    }

    if (currentFilteredTasks.length === 0) {
      console.log("No hay tareas disponibles en esta categoría.");
    } else {
      sortTasks(currentFilteredTasks);

      displayTasks(currentFilteredTasks);

      let taskOption: string;
      do {
        taskOption =
          prompt(
            "Seleccione el número de la tarea para editar (0 para volver): ",
          ) || "0";
        let selectedIndex: number = parseInt(taskOption) - 1;

        if (taskOption === "0") {
          break;
        }

        if (selectedIndex >= 0 && selectedIndex < currentFilteredTasks.length) {
          let editConfirm: string = prompt(
            "¿Deseas editar esta tarea? (s/n): ",
          ).toLowerCase();
          if (editConfirm === "s") {
            let originalIndex: number = findTaskIndex(
              modifiedTasks,
              currentFilteredTasks[selectedIndex].title,
            );
            if (originalIndex !== -1) {
              let editedTask = this.editTask(modifiedTasks[originalIndex]);
              modifiedTasks[originalIndex] = editedTask;

              if (filterCondition !== "") {
                currentFilteredTasks = filteredTasks(
                  modifiedTasks,
                  filterCondition,
                );
              } else {
                currentFilteredTasks = modifiedTasks.slice();
              }

              sortTasks(currentFilteredTasks);
              displayTasks(currentFilteredTasks);
            }
          }
        } else {
          console.log(
            "Número de tarea inválido. Por favor, intente nuevamente.",
          );
        }
      } while (taskOption !== "0");
    }
  } while (option !== "0");

  return modifiedTasks;
};

Task.prototype.searchTask = function (tasks: ITask[]): ITask[] {
  const searchTerm: string = prompt(
    "Ingrese un término para buscar en los títulos: ",
  );
  const filteredTasks: ITask[] = filterTasksBySearchTerm(tasks, searchTerm);

  if (filteredTasks.length === 0) {
    console.log("No se encontraron tareas que coincidan con la búsqueda.");
    return tasks;
  }

  displayFilteredTasks(filteredTasks);
  console.log("\n¿Deseas ver el detalle de alguna tarea?");
  console.log("Introduce el número para ver la tarea o '0' para salir");

  const selectedIndex = promptForTaskSelection(filteredTasks);
  if (selectedIndex === -1) {
    return tasks;
  }

  displayTasks([filteredTasks[selectedIndex]]);

  const editConfirm: string = prompt(
    "¿Deseas editar esta tarea? (s/n): ",
  ).toLowerCase();
  if (editConfirm === "s") {
    const originalIndex = findTaskIndexByTitle(
      tasks,
      filteredTasks[selectedIndex].title,
    );
    if (originalIndex !== -1) {
      tasks[originalIndex] = this.editTask(tasks[originalIndex]);
    }
  }

  return tasks;
};
