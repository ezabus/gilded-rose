import {Item} from "../gilded-rose";

export class GeneralItem {
    item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    public updateQuality() {
        this.item.quality = this.calcNewQuality();
        this.checkConstraints();
        this.updateSellIn();
    }

    protected calcNewQuality(): number {
        let qualityDegradeRate = 0;
        if (this.item.quality !== 0) {
            qualityDegradeRate = 1;
            if (this.item.sellIn === 0) {
                qualityDegradeRate = 2;
            }
        }
        return this.item.quality - qualityDegradeRate;
    }

    protected checkConstraints() {
        if (this.item.quality < 0) {
            this.item.quality = 0;
        }
        if (this.item.quality > 50) {
            this.item.quality = 50;
        }
    }

    protected updateSellIn() {
        if (this.item.sellIn > 0) {
            this.item.sellIn--;
        }
    }

    public unwrap(): Item {
        return this.item;
    }
}
