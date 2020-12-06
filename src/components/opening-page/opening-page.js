import template from "./opening-page.html";
import "./opening-page.scss";

export default class OpeningPage {
  constructor() {
    this.main;
    this.title;
    this.buttons;
    this.isAutoPlay;
  }

  init() {
    const container = document.createElement("div");
    container.innerHTML = template;
    this.main = container.querySelector(".opening");
    this.title = this.main.querySelector(".opening__title");
    this.buttons = this.main.querySelector(".opening-buttons");

    document.querySelector(".game").prepend(this.main);
    this.handleEvent();
  }

  handleEvent() {
    this.buttons.addEventListener("click", (e) => {
      const selectedButton = e.target.closest("button");
      if (selectedButton) {
        document.querySelector(`[data-name="button-sound"]`).play();
        this.main.classList.add("opening--hidden");
        if (selectedButton.dataset.name === "start") {
          this.isAutoPlay = false;
        } else if (selectedButton.dataset.name === "tutorial") {
          this.isAutoPlay = true;
        }
      }
    });
  }

  showPage() {
    document.querySelector(".game").prepend(this.main);
    this.main.classList.remove("opening--hidden");
    this.main.style.display = "flex";
  }

  hiddenPage() {
    this.main.style.display = "none";
  }
  removePage() {
    this.main.remove();
  }
}
