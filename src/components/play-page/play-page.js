import Drop from "./area/drop/drop-element";
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
    this.solution = 0;
    this.life = 3;
    this.level = 1;
    this.timeInterval = 6000;
    this.isAutoPlay = false;
    this.isPause = false;

    this.handlerPause;
    this.handlerKeybordClick;
    this.handlerKeypressKeyboard;
    this.handlerPageVisibility;
  }

  init() {
    Drop.prototype.speed = 1;
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".play-page");

    this.area.init();
    this.interface.init();

    this.main.append(this.area.main, this.interface.main);
  }

  showPage() {
    this.clearStatistics();
    document.querySelector(".game").prepend(this.main);
    this.main.classList.remove("play-page--hidden");
    this.main.style.display = "flex";
    this.interface.keyboard.buttons.main.focus();
    this.handleEvents();
  }

  hiddePage() {
    this.main.style.display = "none";
    this.area.water.main.style.height = "0px";
    document.querySelector('[data-name="gameover-sound"]').play();
  }
  nextPage() {
    this.main.classList.add("play-page--hidden");
    clearInterval(this.timeAddDrop);
    clearInterval(this.timeGame);
  }

  removePage() {
    this.main.classList.remove("play-page--hidden");
    this.timeInterval = 6000;
    Drop.prototype.speed = 1;
    this.life = 3;
    this.area.destroyAllDrops();
    this.interface.keyboard.drawLife();
    document.querySelector('[data-name="water-sound"]').pause();
    this.main.remove();
    this.removeHandleEvents();
  }

  clearStatistics() {
    this.mistakes = 0;
    this.solution = 0;
    this.missed = 0;
  }

  startGame() {
    document.querySelector('[data-name="water-sound"]').play();
    document.querySelector('[data-name="water-sound"]').volume = 0.2;
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
    this.interface.keyboard.main.style.pointerEvents = "none";
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
      item.main.offsetTop + 100 >=
      this.area.water.main.getBoundingClientRect().y -
        item.main.getBoundingClientRect().height
    ) {
      document.querySelector('[data-name="drop-sound"]').play();
      this.interface.score.decreaseScrore();
      this.area.water.waterIncrease();
      this.area.arrayDrops.splice(this.area.arrayDrops.indexOf(item), 1);
      this.missed++;
      if (
        this.area.water.main.offsetTop / 2 <=
        item.main.getBoundingClientRect().height * 2
      ) {
        this.nextPage();
        clearInterval(this.timeAddDrop);
        clearInterval(this.timeGame);
      }
      item.sprayWater();
    }
  }

  handleEvents() {
    this.area.pause.addEventListener(
      "click",
      (this.handlerPause = () => {
        this.togglePause();
      })
    );

    this.interface.keyboard.buttons.main.addEventListener(
      "click",
      (this.handlerKeybordClick = (e) => {
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
          document.querySelector('[data-name="click-sound"]').play();
        }
      })
    );

    document.addEventListener(
      "keydown",
      (this.handlerKeypressKeyboard = (e) => {
        if (!this.isAutoPlay) {
          if (document.querySelector(".play-page")) {
            if (
              (e.keyCode >= 48 && e.keyCode <= 57) ||
              (e.keyCode >= 96 && e.keyCode <= 105)
            ) {
              this.interface.keyboard.screen.display.value += e.key;
              return;
            } else if (e.keyCode === 8) {
              this.interface.keyboard.deleteOneNumberToScreen();
              return;
            } else if (e.keyCode === 13) {
              this.checkSolution();
              this.interface.keyboard.clearScreen();
              return;
            }
          }
        }
      })
    );
    document.addEventListener(
      "visibilitychange",
      (this.handlerPageVisibility = () => {
        if (document.querySelector(".play-page")) {
          const sound = document.querySelector('[data-name="water-sound"]');
          if (document.hidden) {
            this.togglePause();
            sound.pause();
          } else {
            sound.play();
            this.togglePause();
          }
        }
      })
    );
  }

  removeHandleEvents() {
    this.area.pause.removeEventListener("click", this.handlerPause);
    this.interface.keyboard.buttons.main.removeEventListener(
      "click",
      this.handlerKeybordClick
    );
    document.removeEventListener("keydown", this.handlerKeypressKeyboar);
    document.addEventListener("visibilitychange", this.handlerPageVisibility);
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
          document.querySelector('[data-name="bonus-sound"]').play();
        } else if (item.main.classList.contains("drop--gold")) {
          this.area.arrayDrops.forEach((item) => {
            item.main.remove();
          });
          this.area.arrayDrops.length = 0;
          this.interface.score.increaseScore();
          counter++;
          document.querySelector('[data-name="bonus-sound"]').play();
        } else if (item.main.classList.contains("heart")) {
          if (this.life !== 3) {
            this.life++;
            this.area.point++;
          }
          this.interface.keyboard.addHeart();
          this.area.arrayDrops.splice(this.area.arrayDrops.indexOf(item), 1);
          item.main.remove();
          counter++;
          document.querySelector('[data-name="life-sound"]').play();
        } else {
          this.interface.score.increaseScore();
          this.area.arrayDrops.splice(this.area.arrayDrops.indexOf(item), 1);
          item.destroyDrop();
          counter++;
          document.querySelector('[data-name="pop-sound"]').play();
        }
        this.solution++;
        this.level++;
        this.addOperation();
        this.increaseNumber();

        if (this.timeInterval > 1000) {
          this.timeInterval -= 10;
          clearInterval(this.timeAddDrop);
          this.addDrop(this.timeInterval);
          Drop.prototype.speed += 0.001;
        }
      }
    });

    if (counter === 0) {
      document.querySelector('[data-name="error-sound"]').play();
      this.life--;
      this.area.point--;
      this.interface.keyboard.removeHeart();
      this.interface.score.decreaseScrore();
      this.mistakes++;
    }
  }

  addDrop(timeInterval) {
    if (this.isAutoPlay) {
      timeInterval = 3000;
      this.timeAddDrop = setInterval(() => {
        if (!this.isPause) {
          this.area.addDrop();
          this.AutoPlay();
        }
      }, timeInterval);
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

  togglePause() {
    if (!this.isPause) {
      const playImage = `<path d="M68 39L0.499996 77.9711L0.5 0.0288552L68 39Z" fill="white"/>`;
      this.area.pauseScreen.style.display = "flex";
      this.area.pause.innerHTML = playImage;
      clearInterval(this.timeGame);
    } else {
      const pauseImage = `<rect width="30" height="90" fill="white"/>
      <rect x="40" width="30" height="90" fill="white"/>`;
      this.area.pauseScreen.style.display = "none";
      this.area.pause.innerHTML = pauseImage;
      this.beginFallDrop();
    }
    this.isPause = !this.isPause;
  }

  addOperation() {
    if (this.level > 20 && Drop.prototype.selectedOperations.size < 2) {
      Drop.prototype.selectedOperations.add("-");
    } else if (this.level > 30 && Drop.prototype.selectedOperations.size < 3) {
      Drop.prototype.selectedOperations.add("*");
    } else if (this.level > 50 && Drop.prototype.selectedOperations.size < 4) {
      Drop.prototype.selectedOperations.add("/");
    }
  }

  increaseNumber() {
    if (this.level % 5 === 0) {
      Drop.prototype.maxValue++;
    }
  }
}
