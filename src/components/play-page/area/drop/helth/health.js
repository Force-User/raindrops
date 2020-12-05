import Drop from "../drop-element";
import "./health.scss";


export default class Health extends Drop {
    init() {
        super.init();
        this.main.classList.add("heart");
    }
}