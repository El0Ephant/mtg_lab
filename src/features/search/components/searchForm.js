import m from "mithril";

export default class SearchForm {
    search;
    format;

    oncreate(vnode) {
        this.search = vnode.attrs.search; //TODO
        this.format = vnode.attrs.format;
    }
    view(vnode) {
        const attrs = vnode.attrs;

        const requeststate = attrs.requeststate;
        const onsearchchange = attrs.onsearchchange;
        const onformatchange = attrs.onformatchange;

        return (
            <form id="searchForm"
                onsubmit={function (event) {
                    event.preventDefault();
                }}>
                <label for="name">Card name:</label>
                <br />
                <input type="text" id="name" name="name"
                    initialSearch = {this.search}
                    oninput={function () { onsearchchange(this.value) }}>
                </input>
                <br />
                <label for="formatList">Game format:</label>
                <br />
                <select id="formatList"
                    onchange={function () { onformatchange(this.value) }}>
                    <option></option>
                    <option>standard</option>
                    <option>pioneer</option>
                    <option>modern</option>
                    <option>legacy</option>
                    <option>vintage</option>
                    <option>pauper</option>
                </select>
            </form>
        )
    }
}