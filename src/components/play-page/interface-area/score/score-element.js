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
    let score = Number(this.score.textContent);
    score += this.scoreCounter;
    this.score.textContent = score;
    this.scoreCounter++;
    
  }
  getScore() {
    return this.score.textContent;
  }

  clearScore() {
    this.score.textContent = "0";
  }

  decreaseScrore() {
    let score = Number(this.score.textContent);
    score -= 10;
    if (score < 0) {
      this.score.textContent = 0;
      return
    }

    this.score.textContent = score;
  }
}
