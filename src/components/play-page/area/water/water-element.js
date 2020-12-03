import template from "./water-element.html";
import "./water-element.scss";


export default class Water {
    constructor() {
        this.main;
        this.standart = 70;
    }

    init() {
        const fragment = document.createElement('div');
        fragment.innerHTML = template;
        this.main = fragment.querySelector('.water');
    }
    waterIncrease() {
        console.log(1);
        let i = 1;
        let time = setInterval(() => {
            if(i >= this.standart) {
                clearInterval(time);
                return;
            }
            i++;
            this.main.style.height = `${this.main.offsetHeight + 1}px` 
        },10);
        
    }

    waterDecrease() {
        let i = 1;
        let time = setInterval(() => {
            if(i >= this.standart) {
                clearInterval(time);
                return;
            }
            i++;
            this.main.style.height = `${this.main.offsetHeight - 1}px` 
        },10);
        
    }

    
    
}