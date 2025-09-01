import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GrantThanks",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-8" }, _attrs))}> thanks </div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pages/GrantThanks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GrantThanks = Object.assign(_sfc_main, { __name: "PagesGrantThanks" });

export { GrantThanks as default };
//# sourceMappingURL=GrantThanks-HpDbMiHr.mjs.map
