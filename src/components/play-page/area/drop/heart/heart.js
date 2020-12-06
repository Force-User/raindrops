import Drop from "../drop-element";
import "./heart.scss";


export default class Heart extends Drop {
    init() {
        super.init();
        this.main.classList.add("heart");
    }
}