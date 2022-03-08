import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import {GeneralItem} from "../app/wrappers/GeneralItem";
import {AgedBrie} from "../app/wrappers/AgedBrie";
import {BackstagePass} from "../app/wrappers/BackstagePass";
import {Conjured} from "../app/wrappers/Conjured";

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
    })

});
