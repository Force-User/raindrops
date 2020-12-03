import Water from "./water/water-element";
import template from "./game-area.html"
import Drop from "./drop/drop-element";
import "./game-area.scss";

export default class Area { 
    constructor() {
        this.main;
        this.drop = new Drop();
        this.water = new Water();
    }
    init() { 
        const fragment = document.createElement('div');
        fragment.innerHTML = template;
        this.main = fragment.querySelector('.game-area');
        this.water.init();
        this.drop.init();
        this.main.append(this.water.main);
        this.main.append(this.drop.main);
    }

    setValueDrop(){
        this.drop.setValue(this.main);
    }

}