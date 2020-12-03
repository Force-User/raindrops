import Area from "./area/game-area";
import InterfaceArea from "./interface-area/interface";
import template from "./play-page.html";
import "./play-page.scss";

export default class PlayPage {
  constructor() {
    this.main;
    this.area = new Area();
    this.interface = new InterfaceArea();
    this.level = 1;
    this.time = null;
    this.isDecided = false;
    this.missed = 0;
    this.mistakes = 0;
    this.dropsCount = 0;
    this.solution = 0;

  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".play-page");
    this.area.init();
    this.interface.init();
    this.main.append(this.area.main, this.interface.main);
    this.handleEvents();
  }

  showPage() {
    document.querySelector('.game').prepend(this.main);
    this.main.classList.remove('play-page--hidden');
    this.main.style.display = "flex";
  }
  hiddePage() {
    this.main.style.display = "none";
  }
  nextPage() {
    this.main.classList.add("play-page--hidden");
  }

  removePage() {
    this.main.classList.remove("play-page--hidden");
    this.main.remove();
}

  startGame() {
    
    this.area.drop.repaintingElement(this.area.main);
    this.dropsCount ++;
    this.time = setInterval(() => {
      this.area.drop.fallDrop();
      this.checkFall();
    }, 20);
  }

  checkFall() {
    if (
      this.area.drop.main.offsetTop >=
      this.area.water.main.getBoundingClientRect().y -
        this.area.drop.main.getBoundingClientRect().height
    ) {
      this.area.water.waterIncrease(); 
      this.interface.score.decreaseScrore();
      this.missed++;
      if(this.area.water.main.offsetTop / 2 <= this.area.drop.main.offsetHeight) {
        this.nextPage();
        console.log(`solutions  = ${this.solution}
        dropsCount = ${this.dropsCount}
        mistakes = ${this.mistakes}
        missed = ${this.missed}`);
        clearInterval(this.time);
        return
      }
      clearInterval(this.time);
      this.startGame();
    }
  }

  handleEvents() {
    this.interface.keyboard.buttons.main.addEventListener("click", (e) => {
      const selectedButton = e.target.closest("button");
      if (selectedButton) {
        if (selectedButton.dataset.name === "NumpadEnter") {
          this.checkSolution();
          this.interface.keyboard.clearScreen();
          return;
        } else if (selectedButton.dataset.name === "Backspace") {
          this.interface.keyboard.deleteOneNumberToScreen();
          return;
        } else if (selectedButton.dataset.name === "clear") {
          this.interface.keyboard.clearScreen();
          return;
        }

        this.interface.keyboard.screen.display.value +=
          selectedButton.textContent;
      }
    });
  }


  mathOperation() {
    const firstValue = Number(this.area.drop.firstValue.textContent);
    const secondValue = Number(this.area.drop.secondValue.textContent);
    this.interface.keyboard.screen.display.value = "";
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

  checkSolution() {
    const displayValue = Number(this.interface.keyboard.screen.display.value);
    const solution = this.mathOperation();
    if (solution === displayValue) {
      this.solution ++;
      this.isDecided = true; //Решено
      this.verifyDecided();
      this.interface.score.increaseScore();
      return;
    }
    this.mistakes ++;
    this.interface.score.decreaseScrore();
  }
  setStatistics() {

  }
  verifyDecided() {
    if (this.isDecided) {
      this.isDecided = false;
      clearInterval(this.time);
      this.startGame();
    }
  }
}

