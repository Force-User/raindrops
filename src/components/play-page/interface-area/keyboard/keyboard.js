import template from "./keyboard.html";
import "./keyboard.scss";
import "../../../../assets/image/health.png";
import "../../../../assets/image/BlackHealth.png";
export default class Keyboard {
  constructor() {
    this.main;
    this.screen = {};
    this.buttons = {};
    this.healths = [];
  }
  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".keyboard");

    this.screen.main = this.main.querySelector(".keyboard-screen");
    this.screen.display = this.screen.main.querySelector(
      ".keyboard-screen__display"
    );
    this.buttons.main = this.main.querySelector(".keyboard-buttons");
    this.buttons.allButtons = this.buttons.main.querySelectorAll(
      ".keyoard-buttons__button"
    );

    this.healths = this.main.querySelectorAll(".health__heart");
    
  }

  deleteOneNumberToScreen() {
    let currentValue = this.screen.display.value;
    this.screen.display.value = currentValue.substring(
      0,
      currentValue.length - 1
    );
  }

  clearScreen() {
    this.screen.display.value = "";
  }

  mathOperation() {
    const firstValue = Number(this.area.drop.firstValue.textContent);
    const secondValue = Number(this.area.drop.secondValue.textContent);
    let solution;
    switch (this.area.drop.operation.textContent) {
      case "+":
        solution = firstValue + secondValue;
        break;
      case "-":
        solution = firstValue - secondValue;
        break;

      case "/":
        solution = firstValue / secondValue;
        break;
      case "*":
        solution = firstValue * secondValue;
        break;
    }
    return solution;
  }

  drawLife() {
    this.healths.forEach((item) =>
      item.classList.remove("health__heart--black")
    );
  }

  addHeart() {
    const array = Array.from(this.healths);
    array.every((item) => {
      if (item.classList.contains("health__heart--black")) {
        item.classList.remove("health__heart--black");
        return;
      }
      return true;
    });
  }
  removeHeart() {
    const array = Array.from(this.healths);
    array.every((item, index) => {
      if (
        array[array.length - 1].classList.contains("health__heart") &&
        !array[array.length - 1].classList.contains("health__heart--black")
      ) {
        array[array.length - 1].classList.add("health__heart--black");
        return;
      }

      if (item.classList.contains("health__heart--black") && index - 1 === -1) {
        return;
      }

      if (item.classList.contains("health__heart--black")) {
        array[index - 1].classList.add("health__heart--black");
        return;
      }

      return true;
    });
  }
  pressButton(button) {
    button.classList.add('keyboard-buttons__button--press');
    setTimeout(() => {
      button.classList.remove('keyboard-buttons__button--press');
    },200);
  }
}
