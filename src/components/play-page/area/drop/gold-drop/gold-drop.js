import Drop from "../drop-element";

export default class GoldDrop extends Drop {
    init() {
        super.init();
        this.main.classList.add("drop--gold");
    }
}