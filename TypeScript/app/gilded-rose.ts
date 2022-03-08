import {GeneralItem} from "./wrappers/GeneralItem";
import {AgedBrie} from "./wrappers/AgedBrie";
import {BackstagePass} from "./wrappers/BackstagePass";
import {Sulfuras} from "./wrappers/Sulfuras";
import {Conjured} from "./wrappers/Conjured";

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = []) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        const wrappedItems = this.wrapItems(this.items);
        wrappedItems.forEach(wrappedItem => wrappedItem.updateQuality());
        return this.unwrapItems(wrappedItems);
    }

    protected wrapItems(items: Item[]): GeneralItem[] {
        return items.map(item => {
            if (item.name === 'Aged Brie') {
                return new AgedBrie(item);
            } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                return new BackstagePass(item);
            } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
                return new Sulfuras(item);
            } else if (item.name === 'Conjured') {
                return new Conjured(item);
            } else {
                return new GeneralItem(item);
            }
        })
    }

    protected unwrapItems(wrappedItems: GeneralItem[]): Item[] {
        return wrappedItems.map(wrappedItem => wrappedItem.unwrap());
    }
}
