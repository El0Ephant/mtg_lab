import m from "mithril";
class LeftPannel {
  view(vnode) {
    return m('div', {
      id: 'search'
    }, [m('button', vnode.attrs.showBasics ? 'Add non-basic' : 'Add basic'), m('div', {
      id: 'list'
    }, vnode.attrs.showBasics ? [] : [])]);
  }
}
class SearchForm {
  view(vnode) {
    return m('div', [
      //m(FormatList)
    ]);
  }
}
export default class FormatList {
  view(vnode) {
    return m('select', {
      onchange: function () {
        console.log(this.value);
      }
    }, [m('option', ''), m('option', 'standard'), m('option', 'pioneer'), m('option', 'modern'), m('option', 'legacy'), m('option', 'vintage'), m('option', 'pauper')]);
  }
}
//# sourceMappingURL=leftPannel.js.map