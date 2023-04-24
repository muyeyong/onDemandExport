import { B as Button, _ as _export_sfc } from "./_plugin-vue_export-helper-d2f6a449.js";
import { defineComponent, openBlock, createElementBlock, createVNode, withCtx, createTextVNode } from "vue";
const _hoisted_1 = { class: "myButton" };
const __default__ = defineComponent({
  name: "MyButton"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    console.log("MyButton");
    return (_ctx, _cache) => {
      const _component_a_button = Button;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_a_button, { type: "primary" }, {
          default: withCtx(() => [
            createTextVNode("我的按钮")
          ]),
          _: 1
        })
      ]);
    };
  }
});
const myButton_vue_vue_type_style_index_0_scoped_182aa9ff_lang = "";
const MyButtonVue = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-182aa9ff"]]);
MyButtonVue.install = function(app) {
  app.component(MyButtonVue.name, MyButtonVue);
};
export {
  MyButtonVue as default
};
