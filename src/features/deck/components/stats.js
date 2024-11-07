import m from "mithril";
import ManaCostStatsWidget from "../../../widgets/manaCostStatsWidget";
import ColorStatsWidget from "../../../widgets/colorStatsWidget";

import * as deckSelectors from "../state/deckSelectors";
import store from "../../../store";
import WiseComponent from "../../../wiseComponent";

export default class Stats extends WiseComponent {
    view(vnode) {
        return (<div id="stats">
            <h2>Stats</h2>
            <div class="widgets">
                <ManaCostStats data={deckSelectors.selectCostData(store.getState())}>
                </ManaCostStats>
                <ColorStats data={deckSelectors.selectColorData(store.getState())}>
                </ColorStats>
            </div>

        </div>)
    }
}

class ManaCostStats {
    oncreate(vnode) {
        ManaCostStatsWidget.buildStats(vnode.dom, vnode.attrs.data);
    }
    onupdate(vnode) {
        vnode.dom.innerHTML = "";
        ManaCostStatsWidget.buildStats(vnode.dom, vnode.attrs.data);
    }
    view(vnode) {
        return (<div class='widgets'>
            
        </div>)
    }
}

class ColorStats {
    oncreate(vnode) {
        ColorStatsWidget.buildStats(vnode.dom, vnode.attrs.data);
    }
    onupdate(vnode) {
        vnode.dom.innerHTML = "";
        ColorStatsWidget.buildStats(vnode.dom, vnode.attrs.data);
    }
    view(vnode) {
        return (<div class='widgets'>

        </div>)
    }
}