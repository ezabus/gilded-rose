import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import {GeneralItem} from "../app/wrappers/GeneralItem";
import {AgedBrie} from "../app/wrappers/AgedBrie";

function holdItemForDays(wrapper: GeneralItem, days: number) {
    for (let i = 0; i < days; i++) {
        wrapper.updateQuality();
    }
}

describe('Gilded Rose', function () {

    // it('should foo', function() {
    //     const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
    //     const items = gildedRose.updateQuality();
    //     expect(items[0].name).to.equal('fixme');
    // });

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

});
