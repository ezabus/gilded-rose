import {GeneralItem} from "./GeneralItem";

export class Conjured extends GeneralItem{
    protected calcNewQuality(): number {
        let degradeRate = 2;
        if (this.item.sellIn === 0) {
            degradeRate = 4;
        }
        return this.item.quality - degradeRate;
    }
}
