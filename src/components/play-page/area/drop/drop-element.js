import template from "./drop-element.html";
import "./drop-element.scss";
export default class Drop {
  constructor() {
    this.main;
    this.firstValue;
    this.secondValue;
    this.operation;
    
  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    fragment.remove();
    this.main = fragment.querySelector(".drop");
    this.firstValue = this.main.querySelector('[data-name="firstValue"]');
    this.secondValue = this.main.querySelector('[data-name="secondValue"]');
    this.operation = this.main.querySelector('[data-name="operation"]');
    
  }


  fallDrop() {
    this.main.style.top = `${this.main.offsetTop + this.speedFall}px`;
  }

  repaintingElement() {
    this.parent.prepend(this.main);
    this.setValue();
    this.checkNumbers();
    if (this.checkDivide()) {
      this.parent.prepend(this.main);
    } else {
      this.repaintingElement();
    }
  }

  setValue() {
    this.main.style.top = `-${100}px`;
    this.main.style.left = `${
      this.getRandomPosition() - this.main.getBoundingClientRect().width * 2
    }px`;
    this.firstValue.textContent = this.getRandomValue(
      this.minValue,
      this.maxValue
    );
    this.secondValue.textContent = this.getRandomValue(
      this.minValue,
      this.maxValue
    );
    this.operation.textContent = this.getRandomOperation();
  }

  fallDrop() {
    this.main.style.top = `${this.main.offsetTop + this.speed}px`;
  }

  getRandomPosition() {
    const parentWidth = this.parent.getBoundingClientRect().width;
    const dropWidth = this.main.getBoundingClientRect().width * 2;
    return Math.ceil(Math.random() * (parentWidth - dropWidth) + dropWidth);
  }
  getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  getRandomOperation() {
    const arrayOperation = [];
    this.selectedOperations.forEach((item) => arrayOperation.push(item));
    return arrayOperation[this.getRandomValue(0, arrayOperation.length - 1)];
  }

  checkDivide() {
    if (this.operation.textContent === "/") {
      return this.firstValue.textContent % this.secondValue.textContent === 0;
    }

    return true;
  }

  destroyDrop() {
    const dropTop = this.main.getBoundingClientRect().y;
    const dropLeft = this.main.getBoundingClientRect().x;
    this.main.remove();

    const newDrop = document.createElement('div');
    newDrop.classList.add("drop--boom");
    newDrop.style.top = `${dropTop}px`;
    newDrop.style.left = `${dropLeft}px`;
    this.parent.prepend(newDrop);
    newDrop.addEventListener('animationend', (e) => {
      if(e.animationName === "boom") {
        newDrop.remove();
      }

    })
  }

  sprayWater() {
const dropTop = this.main.getBoundingClientRect().y;
    const dropLeft = this.main.getBoundingClientRect().x;
    this.main.remove();
    
    const newDrop = document.createElement('div');
    newDrop.classList.add("drop--spray");
    newDrop.style.top = `${dropTop}px`;
    newDrop.style.left = `${dropLeft}px`;
    this.parent.prepend(newDrop);
    newDrop.addEventListener('animationend', (e) => {
      if(e.animationName === "spray") {
        newDrop.remove();
      }

    })
  }

  checkNumbers() {
    const first = Number(this.firstValue.textContent);
    const second = Number(this.secondValue.textContent);
    if (first < second) {
      [this.firstValue.textContent, this.secondValue.textContent] = [
        second,
        first,
      ];
    }
  }
}
