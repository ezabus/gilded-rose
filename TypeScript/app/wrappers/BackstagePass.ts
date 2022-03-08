import {GeneralItem} from "./GeneralItem";

export class BackstagePass extends GeneralItem {
    protected calcNewQuality(): number {
        const sellIn = this.item.sellIn;
        if (sellIn === 0) {
            return 0;
        }
        let increaseRate = 1;
        if (sellIn <= 10) {
            increaseRate = 2;
        }
        if (sellIn <= 5) {
            increaseRate = 3;
        }
        return this.item.quality + increaseRate;
    }
}
