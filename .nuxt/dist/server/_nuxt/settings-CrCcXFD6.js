import { _ as __nuxt_component_0 } from "./AdminSidebar-HCNEtzig.js";
import { ref, reactive, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/hookable/dist/index.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-DykwVqLQ.js";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-BlqZ6m_D.js";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ufo/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/defu/dist/defu.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/unctx/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "@supabase/ssr";
const _sfc_main = {
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const saving = ref(null);
    const positions = [
      { id: "adsterra_top", label: "Atas (Leaderboard)" },
      { id: "adsterra_sidebar", label: "Bilah Sisi (Sidebar)" },
      { id: "adsterra_bottom", label: "Bawah (Footer Area)" }
    ];
    const settings2 = reactive({
      adsterra_top: "",
      adsterra_sidebar: "",
      adsterra_bottom: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex min-vh-100 bg-light" }, _attrs))} data-v-9c9ba5ef>`);
      _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
      _push(`<div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5" data-v-9c9ba5ef><div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom" data-v-9c9ba5ef><div data-v-9c9ba5ef><h3 class="fw-bold text-dark mb-1" data-v-9c9ba5ef>Pengaturan Iklan Adsterra</h3><p class="text-muted small mb-0" data-v-9c9ba5ef>Kelola script iklan untuk posisi leaderboard, sidebar, dan footer.</p></div></div><div class="row g-4" data-v-9c9ba5ef><!--[-->`);
      ssrRenderList(positions, (pos) => {
        _push(`<div class="col-md-6 col-xl-4" data-v-9c9ba5ef><div class="card border-0 rounded-4 shadow-sm h-100 overflow-hidden" data-v-9c9ba5ef><div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between" data-v-9c9ba5ef><div class="d-flex align-items-center" data-v-9c9ba5ef><div class="icon-box bg-primary-subtle text-primary rounded-3 p-2 me-2" data-v-9c9ba5ef><i class="bi bi-badge-ad" data-v-9c9ba5ef></i></div><h6 class="fw-bold mb-0 text-dark" data-v-9c9ba5ef>${ssrInterpolate(pos.label)}</h6></div></div><div class="card-body p-4" data-v-9c9ba5ef><div class="mb-3" data-v-9c9ba5ef><label class="form-label small text-muted fw-bold text-uppercase" data-v-9c9ba5ef>Script Iklan (HTML/JS)</label><textarea class="form-control rounded-3 font-monospace small" rows="12" placeholder="Paste script tag Adsterra di sini..." data-v-9c9ba5ef>${ssrInterpolate(unref(settings2)[pos.id])}</textarea></div><button class="btn btn-primary w-100 rounded-pill py-2 shadow-sm"${ssrIncludeBooleanAttr(unref(saving) === pos.id) ? " disabled" : ""} data-v-9c9ba5ef>`);
        if (unref(saving) === pos.id) {
          _push(`<i class="spinner-border spinner-border-sm me-2" data-v-9c9ba5ef></i>`);
        } else {
          _push(`<!---->`);
        }
        _push(` Simpan Perubahan </button></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9c9ba5ef"]]);
export {
  settings as default
};
//# sourceMappingURL=settings-CrCcXFD6.js.map
