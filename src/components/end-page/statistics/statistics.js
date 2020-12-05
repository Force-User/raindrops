import template from "./statistics.html"
import "./statistics.scss";
export default class Statistics {
    constructor() {
        this.main = null;
        this.title = null;
        this.score = null;
        this.solutions = null;
        this.mistakes = null;
        this.missed = null;
        this.drops = null;
    }
    init() {
        const container = document.createElement('div');
        container.innerHTML = template;

        this.main = container.querySelector(".statistics");
        this.title = this.main.querySelector('.statistics__title');
        this.score = this.main.querySelector(`[data-name="score"]`);
        this.solutions = this.main.querySelector(`[data-name="solutions"]`);
        this.mistakes = this.main.querySelector(`[data-name="mistakes"]`);
        this.missed = this.main.querySelector(`[data-name="missed"]`);
        this.drops = this.main.querySelector(`[data-name="drops"]`);
        this.buttons = this.main.querySelector('.statistics-buttons');

    }

    removeAllValue() {
        this.score.textContent = "";
        this.solutions.textContent = "";
        this.mistakes.textContent = "";
        this.missed.textContent = "";
        this.drops.textContent = "";
    }

} 