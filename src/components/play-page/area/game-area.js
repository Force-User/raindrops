import Water from "./water/water-element";
import template from "./game-area.html";
import Drop from "./drop/drop-element";
import "./game-area.scss";
import OrdinaryDrop from "./drop/normal-drop/normal-drop";
import GoldDrop from "./drop/gold-drop/gold-drop";
import PlatinumDrop from "./drop/platinum-drop/platinum-drop";
import Heart from "./drop/heart/heart";

export default class Area {
  constructor() {
    this.main;
    this.water = new Water();
    this.arrayDrops = [];
    this.point = 3;
  }
  init() {
    const fragment = document.createElement("div");
    fragment.innerHTML = template;
    this.main = fragment.querySelector(".game-area");
    Drop.prototype.parent = this.main;
    this.water.init();
    this.pause = this.main.querySelector('.pause');
    this.pauseScreen = this.main.querySelector(".back");
    this.main.append(this.pause,this.pauseScreen,this.water.main);
  }

  addDrop() {
    if (this.getRandom(1, 100) > 50 && this.arrayDrops.length >= 2) {
      const isDrop = !this.arrayDrops.find((item) =>
        item.main.classList.contains("drop--gold")
      );
      if (isDrop) {
        this.arrayDrops.push(new GoldDrop());
      }
    } else if (
      this.getRandom(1, 100) > 70 &&
      this.water.main.getBoundingClientRect().height > this.water.standart
    ) {
      const isDrop = !this.arrayDrops.find((item) =>
        item.main.classList.contains("drop--platinum")
      );
      if (isDrop) {
        this.arrayDrops.push(new PlatinumDrop());
      }
    } else if (this.getRandom(1, 10) === 7 && this.point < 3) {
      const isDrop = !this.arrayDrops.find((item) =>
        item.main.classList.contains("health__heart")
      );
      if (isDrop) {
        this.arrayDrops.push(new Heart());
      }
    }

    this.arrayDrops.push(new Drop());
    this.arrayDrops.forEach((item) => {
      if (!item.main) {
        item.init();
        item.repaintingElement();
      }
    });
  }

  destroyAllDrops() {
    this.arrayDrops.forEach((item) => item.main.remove());
    this.arrayDrops.length = 0;
  }

  getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
