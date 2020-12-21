import Drop from "../drop-element";

export default class PlatinumDrop extends Drop {
    init() {
        super.init();
        this.main.classList.add("drop--platinum");
    }
}