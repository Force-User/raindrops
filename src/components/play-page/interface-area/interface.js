import template from "./interface.html";
import Keyboard from "./keyboard/keyboard";
import Score from "./score/score-element";
import "./interface.scss";
export default class InterfaceArea {
  constructor() {
    this.main;
    this.score = new Score();
    this.keyboard = new Keyboard();
  }

  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".interface");
    this.score.init();
    this.keyboard.init();
    this.main.append(this.score.main, this.keyboard.main);
  }
}
