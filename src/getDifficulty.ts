import { Difficulty } from "./difficulty";

export function getDifficulty(prompt: any): string {
  let difficulty: string;
  do {
    difficulty = prompt(
      "Dificultad (1 = Fácil, 2 = Medio, 3 = Difícil), por defecto fácil: ",
    ).trim();
    if (difficulty === "") {
      difficulty = "1";
    }
  } while (difficulty !== "1" && difficulty !== "2" && difficulty !== "3");

  switch (difficulty) {
    case "1":
      return Difficulty.EASY;
    case "2":
      return Difficulty.MEDIUM;
    case "3":
      return Difficulty.HARD;
    default:
      return Difficulty.EASY;
  }
}
