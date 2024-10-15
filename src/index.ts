import promptSync from "prompt-sync";
import { displayMenu } from "./displayMenu";
import { handleMenuOption } from "./handleMenuOption";

export function menu() {
  let option: string;
  const prompt = promptSync();

  do {
    displayMenu();
    option = prompt("Seleccione una opción: ");
    handleMenuOption(option);
  } while (option !== "0");
}

menu();
