import EndPage from "./end-page/end-page";
import OpeningPage from "./opening-page/opening-page";
import Parametrs from "./parametrs-page/parametrs-page";
import PlayPage from "./play-page/play-page";
import template from "./Game.html";
import "./Game.scss";

export default class Game {
  constructor() {
    this.main = null;
    this.fullscreen = null;
    this.opening = new OpeningPage();
    this.parametrs = new Parametrs();
    this.playPage = new PlayPage();
    this.endPage = new EndPage();
  }

  init() {
    const container = document.createElement("div");
    container.innerHTML = template;
    this.main = container.querySelector(".game");
    this.fullscreen = container.querySelector(".fullscreen");
    document.body.prepend(this.main, this.fullscreen);

    this.opening.init();
    this.parametrs.init();
    this.playPage.init();
    this.endPage.init();
    this.handleEvents();
  }

  handleEvents() {
    this.opening.main.addEventListener("animationend", (e) => {
      if (e.animationName === "hidde") {
        this.opening.hiddenPage();
        this.opening.removePage();
        this.parametrs.showPage();
        this.playPage.isAutoPlay = this.opening.isAutoPlay;
      }
    });

    this.parametrs.main.addEventListener("animationend", (e) => {
      if (e.animationName === "hidde") {
        this.parametrs.hiddePage();
        this.parametrs.setValueToDrop();
        this.parametrs.removePage();
        this.playPage.showPage();
        this.playPage.startGame();
      }
    });

    this.playPage.main.addEventListener("animationend", (e) => {
      if (e.animationName === "hidde") {
        this.playPage.hiddePage();
        this.playPage.removePage();
        this.endPage.showPage();
        this.setStatistics();
      }
    });

    this.endPage.main.addEventListener("animationend", (e) => {
      if (e.animationName === "restart") {
        this.playPage.interface.score.clearScore();
        this.endPage.removePage();
        this.playPage.showPage();
        this.playPage.startGame();
      } else if (e.animationName === "return") {
        this.playPage.interface.score.clearScore();
        this.opening.showPage();
        this.endPage.removePage();
      }
    });

    this.fullscreen.addEventListener("click", (e) => {
      if (this.main.webkitRequestFullScreen) {
        this.main.webkitRequestFullScreen();
      } else {
        document.exitFullScreen();
      }
    });
  }

  setStatistics() {
    this.endPage.statistics.score.textContent = this.playPage.interface.score.getScore();
    this.endPage.statistics.solutions.textContent = this.playPage.solution;
    this.endPage.statistics.mistakes.textContent = this.playPage.mistakes;
    this.endPage.statistics.missed.textContent = this.playPage.missed;
  }
}
