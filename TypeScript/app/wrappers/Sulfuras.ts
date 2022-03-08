import {GeneralItem} from "./GeneralItem";

export class Sulfuras extends GeneralItem {

    public calcNewQuality(): number {
        // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        // TODO Clarify this requirement. Current assumption is: "Sulfuras" are not losing quality
        return this.item.quality;
    }
}
