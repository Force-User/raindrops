import Drop from "../play-page/area/drop/drop-element";
import template from "./parametrs-page.html";
import "./parametrs-page.scss";
export default class Parametrs {
  constructor() {
    this.main;
    this.operationCollection = new Set();
    this.minInputValue;
    this.maxInputValue;
    this.operationContent;
    this.button;
  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;

    this.main = fragment.querySelector(".parametrs");
    this.minInputValue =  fragment.querySelector('[data-name="min-value"]');
    this.maxInputValue = fragment.querySelector('[data-name="max-value"]');
    this.operationContent = fragment.querySelector(".operation-content");
    this.button = fragment.querySelector(".parametrs__button");
    this.handleEvent();
    this.operationCollection.add("+");
  }

  removePage() {
    this.main.remove();
    this.main.classList.remove("parametrs--hidden");
  }
  showComponent() {
    document.querySelector(".game").prepend(this.main);
    this.main.style.display = " flex";
  }

  handleEvent() {
    this.operationContent.addEventListener(
      "click",
      (e) => {
        const selectedInput = e.target.closest("input");

        if (selectedInput) {
          document.querySelector(`[data-name="check-sound"]`).play();
          if (selectedInput.checked) {
            this.operationCollection.add(selectedInput.dataset.name);
          } else {
            this.operationCollection.delete(selectedInput.dataset.name);
          }
        }
      }
    );
    this.button.addEventListener("click", (e) => {
      document.querySelector(`[data-name="button-sound"]`).play();
      this.main.classList.add("parametrs--hidden");
    });
  }
  setValueToDrop() {
    Drop.prototype.selectedOperations = this.operationCollection;
    Drop.prototype.minValue = this.minInputValue.value;
    Drop.prototype.maxValue = this.maxInputValue.value;
  }

  getSelectedOperation() {
    return this.operationCollection;
  }

  hiddePage() {
    this.main.style.display = "none";
  }
}
