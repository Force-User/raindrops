import template from "./parametrs-page.html";
import "./parametrs-page.scss";
export default class Parametrs {
  constructor() {
    this.main;
    this.title;
    this.operationCollection = new Set();
    this.parametrsContent = {
      valueContent: {},
      operationContent: {
        operation: {},
      },
    };
    this.button;
  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;

    this.main = fragment.querySelector(".parametrs");
    this.titile = fragment.querySelector(".parametrs__title");
    this.parametrsContent = {
      main: fragment.querySelector(".paramets-content"),
      valueContent: {
        main: fragment.querySelector(".value-content"),
        title: fragment.querySelector(".value-content__title"),
        minInputValue: fragment.querySelector('[data-name="min-value"]'),
        maxInputValue: fragment.querySelector('[data-name="max-value"]'),
      },
      operationContent: {
        main: fragment.querySelector(".operation-content"),
        title: fragment.querySelector(".operation-content__title"),
        operation: {
          plus: fragment.querySelector('[data-name="+"]'),
          minus: fragment.querySelector('[data-name="-"]'),
          multi: fragment.querySelector('[data-name="*"]'),
          divide: fragment.querySelector('[data-name="/"]'),
        },
      },
    };
    this.button = fragment.querySelector(".parametrs__button");
    this.handleEvent();
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
    this.parametrsContent.operationContent.main.addEventListener(
      "click",
      (e) => {
        
        const selectedInput = e.target.closest("input");
        console.log(selectedInput);
        if(selectedInput) {
          if (selectedInput.checked) {
            this.operationCollection.add(selectedInput.dataset.name);
          } else {
            this.operationCollection.delete(selectedInput.dataset.name);
          }
          console.log(this.operationCollection);
        }
        }
        
    );
    this.button.addEventListener("click", (e) => {
      this.main.classList.add("parametrs--hidden");
    });
  }
  setValueToDrop(nextPage) {
    this.operationCollection.forEach((item) => {
      nextPage.area.drop.selectedOperations.add(item);
    });
    nextPage.area.drop.min = this.parametrsContent.valueContent.minInputValue.value;
    nextPage.area.drop.max = this.parametrsContent.valueContent.maxInputValue.value;
  }

  getSelectedOperation() {
    return this.operationCollection;
  }

  hiddePage() {
    this.main.style.display = "none";
  }
}
