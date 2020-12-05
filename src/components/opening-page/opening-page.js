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
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".opening");
    this.title = fragment.querySelector(".opening__title");
    this.buttons = fragment.querySelector(".opening-buttons");

    document.querySelector(".game").prepend(this.main);
    this.handleEvent();
  }

  handleEvent() {
    this.buttons.addEventListener("click", (e) => {
      const selectedButton = e.target.closest("button");
      if (selectedButton) {
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

  hiddenComponent() {
    this.main.style.display = "none";
  }
  removePage() {
    this.main.remove();
  }
}
