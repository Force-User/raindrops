import template from "./score-element.html";
import "./score-element.scss";
export default class Score {
  constructor() {
    this.main;
    this.score;
    this.scoreCounter = 10;
  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".score");
    this.score = fragment.querySelector(".score__value");
  }

  increaseScore() { 
    this.score.textContent = Number(this.score.textContent) + this.scoreCounter;
    this.scoreCounter++;
  }
  getScore() {
    return this.score.textContent;
  }

  clearScore() {
    this.score.textContent = "0";
  }

  decreaseScrore() {
    if (this.score.textContent > "0") {
      this.score.textContent -= 15;
    }
  }
}
