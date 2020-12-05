import Drop from "./area/drop/drop-element";
import OrdinaryDrop from "./area/drop/normal-drop/normal-drop";
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
    this.timeAddDrop = null;
    this.timeGame = null;
    this.isDecided = false;
    this.missed = 0;
    this.mistakes = 0;
    this.dropsCount = 1;
    this.solution = 0;
    this.life = 3;
    this.timeInterval = 6000;
    this.isAutoPlay = false;
    this.isPause = false;
  }

  init() {
    Drop.prototype.speed = 1;
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".play-page");
    this.area.init();
    this.interface.init();

    this.main.append(this.area.main, this.interface.main);
    this.handleEvents();
  }

  showPage() {
    this.clearStatistics();
    document.querySelector(".game").prepend(this.main);
    this.main.classList.remove("play-page--hidden");
    this.main.style.display = "flex";
  }

  clearStatistics() {
    this.mistakes = 0;
    this.solution = 0;
    this.missed = 0;
    this.dropsCount = 0;
  }
  hiddePage() {
    this.main.style.display = "none";
  }
  nextPage() {
    this.main.classList.add("play-page--hidden");
    clearInterval(this.timeAddDrop);
    clearInterval(this.timeGame);
  }

  removePage() {
    this.main.classList.remove("play-page--hidden");
    this.life = 3;
    this.area.destroyAllDrops();
    this.interface.keyboard.drawLife();
    this.main.remove();
  }

  startGame() {
    this.addDrop(this.timeInterval);

    this.beginFallDrop();
  }

  beginFallDrop() {
    this.timeGame = setInterval(() => {
      if (this.life < 1) {
        this.nextPage();
      }
      this.area.arrayDrops.forEach((item) => {
        item.fallDrop();
        this.checkFall(item);
      });
    }, 20);
  }

  AutoPlay() {
    let result = null;
    this.area.arrayDrops.every((item) => {
      result = this.mathOperation(item);
      return false;
    });

    for (let i = 0; i < String(result).length; i++) {
      const button = this.interface.keyboard.buttons.main.querySelector(
        `[data-name="Numpad${String(result)[i]}"]`
      );
      setTimeout(() => {
        button.click();
      }, 2000);
    }

    setTimeout(() => {
      this.checkSolution();
    }, 2500);
  }

  checkFall(item) {
    if (
      item.main.offsetTop >=
      this.area.water.main.getBoundingClientRect().y -
        item.main.getBoundingClientRect().height
    ) {
      this.interface.score.decreaseScrore();
      this.area.water.waterIncrease();
      this.area.arrayDrops.splice(this.area.arrayDrops.indexOf(item), 1);
      item.main.remove();
      this.missed++;
      if (this.area.water.main.offsetTop / 2 <= item.main.offsetHeight) {
        this.nextPage();
        console.log(`solutions  = ${this.solution}
        dropsCount = ${this.dropsCount}
        mistakes = ${this.mistakes}
        missed = ${this.missed}`);
        clearInterval(this.timeAddDrop);
        clearInterval(this.timeGame);
        return;
      }
    }
  }

  handleEvents() {
    this.area.pause.addEventListener("click", (e) => {
      if (this.isPause === false) {
       this.area.pauseScreen.style.display = "flex";
       this.area.pause.innerHTML = `<rect width="30" height="90" fill="white"/>
       <rect x="40" width="30" height="90" fill="white"/>`
        clearInterval(this.timeGame);
      } else {
        this.area.pauseScreen.style.display = "none";
        this.area.pause.innerHTML = `<path d="M68 39L0.499996 77.9711L0.5 0.0288552L68 39Z" fill="white"/>`
        this.beginFallDrop();
      }
      this.isPause = !this.isPause;
    });

    this.interface.keyboard.buttons.main.addEventListener("click", (e) => {
      const selectedButton = e.target.closest("button");
      this.interface.keyboard.pressButton(selectedButton);
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

    window.addEventListener("keydown", (e) => {
      const key = this.interface.keyboard.buttons.main.querySelector(
        `[data-name="${e.code}"]`
      );
      this.interface.keyboard.pressButton(key);
      if (e.code === "NumpadEnter" || e.code === "Enter") {
        this.checkSolution();
        this.interface.keyboard.clearScreen();
        return;
      } else if (e.code === "Backspace") {
        this.interface.keyboard.deleteOneNumberToScreen();
        return;
      }
      this.interface.keyboard.screen.display.value += key.textContent;
    });
  }

  mathOperation(item) {
    const firstValue = Number(item.firstValue.textContent);
    const secondValue = Number(item.secondValue.textContent);
    this.interface.keyboard.screen.display.value = "";
    let solution;
    switch (item.operation.textContent) {
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
    let counter = 0;
    this.area.arrayDrops.forEach((item) => {
      const solution = this.mathOperation(item);

      if (solution === displayValue) {
        if (item.main.classList.contains("drop--platinum")) {
          this.area.water.waterDecrease();
          this.interface.score.increaseScore();
          this.area.arrayDrops.forEach((item) => {
            item.main.remove();
          });
          this.area.arrayDrops.length = 0;
          counter++;
        } else if (item.main.classList.contains("drop--gold")) {
          this.area.arrayDrops.forEach((item) => {
            item.main.remove();
          });
          this.area.arrayDrops.length = 0;
          this.interface.score.increaseScore();
          counter++;
        } else if (item.main.classList.contains("heart")) {
          if (this.life !== 3) {
            this.life++;
            this.area.point++;
          }
          this.interface.keyboard.ah();
          this.area.arrayDrops.splice(this.area.arrayDrops.indexOf(item), 1);
          item.main.remove();
          counter++;
        } else {
          this.interface.score.increaseScore();
          this.area.arrayDrops.splice(this.area.arrayDrops.indexOf(item), 1);
          item.main.remove();
          counter++;
        }
        this.solution++;
        if (this.timeInterval > 1000) {
          this.timeInterval -= 50;
          clearInterval(this.timeAddDrop);
          this.addDrop(this.timeInterval);
          Drop.prototype.speed += 0.01;
        }
      }
    });

    if (counter === 0) {
      this.life--;
      this.area.point--;
      this.interface.keyboard.dh();
      this.interface.score.decreaseScrore();
      this.mistakes++;
    }
  }
  verifyDecided() {
    if (this.isDecided) {
      this.isDecided = false;
      clearInterval(this.time);
      this.startGame();
    }
  }
  addDrop(timeInterval) {
    if (this.isAutoPlay) {
      this.timeAddDrop = setInterval(
        () => {
          if (!this.isPause) {
            this.area.addDrop();
            this.AutoPlay();
          }
        },
        timeInterval,
        this.area.addDrop(),
        this.AutoPlay()
      );
    } else {
      this.timeAddDrop = setInterval(
        () => {
          if (!this.isPause) {
            this.area.addDrop();
            
          }
        },
        timeInterval,
        this.area.addDrop()
      );
    }
  }
}
