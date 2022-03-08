import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import {GeneralItem} from "../app/wrappers/GeneralItem";
import {AgedBrie} from "../app/wrappers/AgedBrie";
import {BackstagePass} from "../app/wrappers/BackstagePass";
import {Conjured} from "../app/wrappers/Conjured";
import {Sulfuras} from "../app/wrappers/Sulfuras";

function holdItemForDays(wrapper: GeneralItem, days: number) {
    for (let i = 0; i < days; i++) {
        wrapper.updateQuality();
    }
}

function holdItemsForDays(glidedRose: GildedRose, days: number): Item[] {
    let updatedItems: Item[] = [];
    for (let i = 0; i < days; i++) {
        updatedItems = glidedRose.updateQuality();
    }
    return updatedItems;
}

describe('Gilded Rose', function () {

    it('should properly update quality for list of items', function() {
        const gildedRose = new GildedRose([
            new Item('Aged Brie', 10, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 4, 10),
            new Item('Sulfuras, Hand of Ragnaros', 12, 12),
            new Item('Conjured', 13, 13),
        ]);
        const items = holdItemsForDays(gildedRose, 1);
        const agedBrie = items[0];
        const backstagePass = items[1];
        const sulfurus = items[2];
        const conjured = items[3];
        expect(agedBrie.quality).to.equal(11);
        expect(backstagePass.quality).to.equal(13);
        expect(sulfurus.quality).to.equal(12);
        expect(conjured.quality).to.equal(11);
    });

    it('should decrease quality by 1, but not less than 0', function () {
        const testItem = new Item("TestItem", 20, 10);
        const wrapper = new GeneralItem(testItem);
        holdItemForDays(wrapper, 9);
        expect(wrapper.unwrap().quality).to.equal(1);
        holdItemForDays(wrapper, 1);
        expect(wrapper.unwrap().quality).to.equal(0);
        holdItemForDays(wrapper, 1);
        expect(wrapper.unwrap().quality).to.equal(0);
    });

    it('should decrease quality by 2 after expire', function () {
        const testItem = new Item("TestItem", 10, 20);
        const wrapper = new GeneralItem(testItem);
        holdItemForDays(wrapper, 10);
        expect(wrapper.unwrap().quality).to.equal(10);
        holdItemForDays(wrapper, 1);
        expect(wrapper.unwrap().quality).to.equal(8);
    });

    it('should increase value for AgedBrie, but not over 50', function () {
        const agedBrie = new AgedBrie(new Item("Aged Brie", 30, 30));
        holdItemForDays(agedBrie, 10);
        expect(agedBrie.unwrap().quality).to.equal(40);
        holdItemForDays(agedBrie, 10);
        expect(agedBrie.unwrap().quality).to.equal(50);
        holdItemForDays(agedBrie, 10);
        expect(agedBrie.unwrap().quality).to.equal(50);
    });

    it('should increase value for Backstage Pass with specific rate and reset to 0 when expired', function () {
        const backstagePass = new BackstagePass(new Item("Backstage Bass", 15, 10));
        holdItemForDays(backstagePass, 5);
        expect(backstagePass.unwrap().quality).to.equal(15);
        holdItemForDays(backstagePass, 1);
        expect(backstagePass.unwrap().quality).to.equal(17);
        holdItemForDays(backstagePass, 4);
        expect(backstagePass.unwrap().quality).to.equal(25);
        holdItemForDays(backstagePass, 1);
        expect(backstagePass.unwrap().quality).to.equal(28);
        holdItemForDays(backstagePass, 4);
        expect(backstagePass.unwrap().quality).to.equal(40);
        holdItemForDays(backstagePass, 1);
        expect(backstagePass.unwrap().quality).to.equal(0);
    });

    it('should decrease quality of conjured items twice as speed as usual', function () {
        const conjured = new Conjured(new Item("Conjured", 4, 16));
        holdItemForDays(conjured, 4);
        expect(conjured.unwrap().quality).to.equal(8);
        holdItemForDays(conjured, 2);
        expect(conjured.unwrap().quality).to.equal(0);
    });

    it('should not decrease value for sulfuras', function () {
        const sulfarus = new Sulfuras(new Item("Sulfarus", 10, 10));
        holdItemForDays(sulfarus, 20);
        expect(sulfarus.unwrap().quality, ).to.equal(10);
    })

});
