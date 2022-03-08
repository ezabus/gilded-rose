import {GeneralItem} from "./GeneralItem";

export class AgedBrie extends GeneralItem {

    protected calcNewQuality(): number {
        return this.item.quality + 1;
    }

}
