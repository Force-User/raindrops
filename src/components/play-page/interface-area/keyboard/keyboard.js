import template from "./keyboard.html";
import "./keyboard.scss";
export default class Keyboard {
    constructor() {
        this.main;
        this.screen = {};
        this.buttons = {};
    };
    init() {
        const fragment = document.createElement('div');
        fragment.innerHTML = template;
        this.main = fragment.querySelector('.keyboard');

        this.screen.main = this.main.querySelector('.keyboard-screen');
        this.screen.display = this.screen.main.querySelector('.keyboard-screen__display');

        this.buttons.main = this.main.querySelector('.keyboard-buttons');
        this.buttons.allButtons = this.buttons.main.querySelectorAll('.keyoard-buttons__button');
    }

    deleteOneNumberToScreen() {
        let currentValue = this.screen.display.value;
        this.screen.display.value = currentValue.substring(0, currentValue.length - 1);
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

    
}