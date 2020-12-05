import Statistics from "./statistics/statistics";
import template from "./end-page.html";
import "./end-page.scss";

export default class EndPage {
  constructor() {
    this.main = null;
    this.statistics = new Statistics();
    this.title = null;
  }

  init() {
    const container = document.createElement("div");
    container.innerHTML = template;

    this.main = container.querySelector(".end-page");
    this.title = this.main.querySelector(".end-page__title");

    this.buttons = this.main.querySelector(".end-page__buttons");

    this.statistics.init();
    this.main.append(this.statistics.main);
    this.handleEvenet();
  }

  handleEvenet() {
    this.statistics.buttons.addEventListener("click", (e) => {
      const selectedButton = e.target.closest("button");

      if (selectedButton) {
        if (selectedButton.dataset.name === "restart") {
          this.restartGame();
        } else if (selectedButton.dataset.name === "return") {
          this.returnMenu();
        }
      }
    });
  }

  showPage() {
    document.querySelector(".game").append(this.main);
    this.main.style.display = "flex";
    this.main.classList.remove("end-page--restart", "end-page--return");
  }

  restartGame() {
    this.statistics.removeAllValue();
    this.main.classList.add("end-page--restart");
  }
  returnMenu() {
    this.statistics.removeAllValue();
    this.main.classList.add("end-page--return");
  }

  removePage() {
    this.main.style.display = "none";
    this.main.remove();
  }
}
