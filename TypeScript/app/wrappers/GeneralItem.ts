import {Item} from "../gilded-rose";

export class GeneralItem {
    item: Item;

    constructor(item: Item) {
        this.item = item;
    }

    public updateQuality() {
        if (this.item.quality !== 0) {
            let qualityDegradeRate = 1;
            if (this.item.sellIn === 0) {
                qualityDegradeRate = 2;
            }
            this.item.quality = this.item.quality - qualityDegradeRate;
        }
        this.updateSellIn();
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
