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
    this.handlerSelectOperation;
    this.handlerButton;
  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".parametrs");
    this.minInputValue = fragment.querySelector('[data-name="min-value"]');
    this.maxInputValue = fragment.querySelector('[data-name="max-value"]');
    this.operationContent = fragment.querySelector(".operation-content");
    this.button = fragment.querySelector(".parametrs__button");
    this.parametersValue = fragment.querySelector(".parametrs-value");

    this.operationCollection.add("+");
  }

  checkMinMaxValue() {
    if (Number(this.maxInputValue.value) < Number(this.minInputValue.value)) {
      this.clearInput(this.maxInputValue);
      this.clearInput(this.minInputValue);
      this.maxInputValue.placeholder = "max должно быть больше min";
      this.minInputValue.placeholder = "min должно быть меньше max";
    } else {
      document.querySelector('[data-name="button-sound"]').play();
      this.main.classList.add("parametrs--hidden");
    }
  }

  removePage() {
    this.main.remove();
    this.main.classList.remove("parametrs--hidden");
    this.removeHandleEvents();
  }
  showPage() {
    document.querySelector(".game").prepend(this.main);
    this.main.style.display = "flex";
    this.handleEvent();
  }
  hiddePage() {
    this.main.style.display = "none";
  }

  handleEvent() {
    const sound = document.querySelector('[data-name="check-sound"]');
    this.operationContent.addEventListener(
      "click",
      (this.handlerSelectOperation = (e) => {
        const selectedInput = e.target.closest("input");

        if (selectedInput) {
          sound.play();
          if (selectedInput.checked) {
            this.operationCollection.add(selectedInput.dataset.name);
          } else {
            this.operationCollection.delete(selectedInput.dataset.name);
          }
        }
      })
    );
    this.button.addEventListener(
      "click",
      (this.handlerButton = () => {
        this.checkMinMaxValue();
      })
    );

    this.parametersValue.addEventListener("keydown", (e) => {
      e.preventDefault();

      const key = e.key;
      if (
        ((e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 105)) &&
        e.target.value.length < 5
      ) {
        e.target.value += key;
      } else if (e.keyCode === 8 && e.target.value.length !== 0) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1);
      } else if (e.keyCode === 13) {
        this.checkMinMaxValue();
      }
    });
  }

  removeHandleEvents() {
    this.button.removeEventListener("click", this.handlerButton);
    this.operationContent.removeEventListener(
      "click",
      this.handlerSelectOperation
    );
  }

  setValueToDrop() {
    Drop.prototype.selectedOperations = this.operationCollection;
    Drop.prototype.minValue = this.minInputValue.value;
    Drop.prototype.maxValue = this.maxInputValue.value;
  }

  getSelectedOperation() {
    return this.operationCollection;
  }
  clearInput(input) {
    input.value = "";
  }
}
