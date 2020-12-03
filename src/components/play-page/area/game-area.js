import Water from "./water/water-element";
import template from "./game-area.html"
import Drop from "./drop/drop-element";
import "./game-area.scss";
import OrdinaryDrop from "./drop/normal-drop/normal-drop";
import GoldDrop from "./drop/gold-drop/gold-drop";
import PlatinumDrop from "./drop/platinum-drop/platinum-drop";

export default class Area { 
    constructor() {
        this.main;
        this.water = new Water();
        this.arrayDrops = [];
        this.index = 0;
    }
    init() { 
        const fragment = document.createElement('div');
        fragment.innerHTML = template;
        this.main = fragment.querySelector('.game-area');
        Drop.prototype.parent = this.main;
        this.water.init();
        this.main.append(this.water.main);
        
    }

    addDrop() {
        console.log(this.getRandom(1,10));
        if(this.getRandom(1,10) === 5) {
            this.arrayDrops.push(new GoldDrop())
        }
        // if(this.getRandom(1,20) === 20) {
        //     this.arrayDrops.push(new PlatinumDrop());
        // }
        this.arrayDrops.push(new OrdinaryDrop());
        this.arrayDrops.forEach(item => {
            if(!item.main) {
                item.init();
                item.repaintingElement();
            }
        })
    }

    getRandom(min,max) {
            return Math.round(Math.random() * (max - min) + min); 
    }

}