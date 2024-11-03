import * as nonBasic from './source/nonBasicMock.json'
import * as basic from './source/basicMock.json'

export default class MtgMock {
    loadCards(searchMap) {
        if (searchMap["type"] === "basic")
            return basic.data;
        else return nonBasic.data;
    }
}