import template from "./drop-element.html";
import "./drop-element.scss";
export default class Drop {

    constructor() {
        this.main;
        this.firstValue;
        this.secondValue;
        this.operation;
        this.speed = 1;
    }
    


    init() {
        const fragment = document.createElement('div');
        fragment.innerHTML = template;
        fragment.remove();
        this.main = fragment.querySelector('.drop');
        this.firstValue = this.main.querySelector(`[data-name="firstValue"]`);
        this.secondValue = this.main.querySelector(`[data-name="secondValue"]`);
        this.operation = this.main.querySelector(`[data-name="operation"]`);
    }

    fallDrop () {
        this.main.style.top = `${this.main.offsetTop + this.speedFall}px`;
    }

    repaintingElement() {
        this.setValue();
        this.checkNumbers();
        if(this.checkDivide()){
            this.parent.prepend(this.main);
        } else {
            this.repaintingElement();
        }
    }

    

    setValue() {
        this.main.style.top = `-${70}px`;
        this.main.style.left = `${this.getRandomPosition() - this.main.getBoundingClientRect().width * 2}px`;
        this.firstValue.textContent = this.getRandomValue(this.minValue,this.maxValue);
        this.secondValue.textContent = this.getRandomValue(this.minValue,this.maxValue);
        this.operation.textContent = this.getRandomOperation();
    }

    fallDrop () {
        this.main.style.top = `${this.main.offsetTop + this.speed}px`;
    }


    getRandomPosition() {
        
        const parentWidth = this.parent.getBoundingClientRect().width;
        const dropWidth  = this.main.getBoundingClientRect().width * 2 ;
        return Math.ceil(Math.random() * (parentWidth - dropWidth) + dropWidth);
    }
    getRandomValue(min,max) {
        return Math.round(Math.random() * (max - min) + min); 
    }
    getRandomOperation() {
        const arrayOperation = [];
        this.selectedOperations.forEach(item=> arrayOperation.push(item));
        return arrayOperation[this.getRandomValue(0,arrayOperation.length-1)];
    }

    checkDivide() {
        if(this.operation.textContent === "/") {
            return this.firstValue.textContent % this.secondValue.textContent === 0;
        } 

        return true;
      
    }

    checkNumbers() {

        if(this.firstValue.textContent < this.secondValue.textContent) {
            [this.firstValue.textContent, this.secondValue.textContent] = [this.secondValue.textContent, this.firstValue.textContent];
        }
    } 
}

