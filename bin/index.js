import m from "mithril";
import Widget from './widgets/leftPannel';
m.mount(document.body, {
  view: function () {
    return m(Widget, {
      text: "aaaaa"
    });
  }
});
//# sourceMappingURL=index.js.map