import m from "mithril";

export default class Card {
    view(vnode) {
        const attrs = vnode.attrs;

        const card = attrs.card;
        const amount = attrs.amount;

        const onadd = attrs.onadd;
        const ondelete = attrs.ondelete;

        const image = card.image_uris !== undefined ? card.image_uris.normal : ''; //TODO: handle undefined
        return (
            <>
                {card.image_uris !== undefined ?
                    <img src={image} style='height: 250px;'></img>
                    :
                    <div class = "placeholder"></div>}

                <div>
                    <button onclick={() => ondelete(card)}>-</button>
                    {amount}
                    <button onclick={() => onadd(card)}>+</button>
                </div>
            </>
        )
    }
}