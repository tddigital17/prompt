import { u as useAsyncData, _ as __nuxt_component_0, a as __nuxt_component_2, b as __nuxt_component_3 } from "./asyncData-Bc0-_dPw.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-BlqZ6m_D.js";
import { withAsyncContext, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { a as useRoute } from "../server.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-DykwVqLQ.js";
import { u as useUtils } from "./useUtils-Cqy3Psk8.js";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/perfect-debounce/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/hookable/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ufo/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/defu/dist/defu.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/unctx/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "@supabase/ssr";
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const supabase = useSupabaseClient();
    const { getYouTubeID, formatDate } = useUtils();
    const { data: prompt, pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`prompt-${route.params.id}`, async () => {
      const { data } = await supabase.from("prompts").select("*, categories(name)").eq("id", route.params.id).single();
      return data;
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Navbar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AdBanner = __nuxt_component_2;
      const _component_Footer = __nuxt_component_3;
      if (unref(prompt)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-light min-vh-100 d-flex flex-column" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
        _push(`<div class="container py-5"><div class="row g-4"><div class="col-lg-8"><nav aria-label="breadcrumb" class="mb-4"><ol class="breadcrumb"><li class="breadcrumb-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li class="breadcrumb-item active">${ssrInterpolate(unref(prompt).categories?.name)}</li></ol></nav><h1 class="fw-bold mb-4">${ssrInterpolate(unref(prompt).title)}</h1><div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow mb-5"><iframe${ssrRenderAttr("src", `https://www.youtube.com/embed/${unref(getYouTubeID)(unref(prompt).youtube_url)}`)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="card border-0 rounded-4 shadow-sm overflow-hidden mb-5"><div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center"><h5 class="mb-0 fw-bold"><i class="bi bi-terminal me-2 text-primary"></i>AI Prompt</h5><button class="btn btn-primary btn-sm rounded-pill px-3"><i class="bi bi-clipboard me-2"></i>Salin Prompt </button></div><div class="card-body bg-dark"><pre class="text-success p-3 mb-0" style="${ssrRenderStyle({ "white-space": "pre-wrap", "font-family": "'Courier New', Courier, monospace" })}">${ssrInterpolate(unref(prompt).prompt_text)}</pre></div></div><div class="card border-0 rounded-4 shadow-sm p-4 mb-4"><h5 class="fw-bold mb-3">Tentang Project Ini</h5><div class="text-muted lh-lg">${ssrInterpolate(unref(prompt).description || "Tidak ada deskripsi tambahan.")}</div></div></div><div class="col-lg-4"><div class="sticky-top" style="${ssrRenderStyle({ "top": "100px" })}"><div class="card border-0 rounded-4 shadow-sm p-4 mb-4 text-center"><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${unref(getYouTubeID)(unref(prompt).youtube_url)}/mqdefault.jpg`)} class="rounded-3 mb-3 w-100 shadow-sm" alt="Small Thumb"><h6 class="fw-bold mb-1">Dibuat pada</h6><p class="text-muted small mb-3">${ssrInterpolate(unref(formatDate)(unref(prompt).created_at))}</p><div class="badge bg-primary-subtle text-primary rounded-pill py-2 px-3 mb-4">${ssrInterpolate(unref(prompt).categories?.name)}</div>`);
        _push(ssrRenderComponent(_component_AdBanner, { position: "sidebar" }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_AdBanner, { position: "bottom" }, null, _parent));
        _push(`</div></div></div></div>`);
        _push(ssrRenderComponent(_component_Footer, null, null, _parent));
        _push(`<div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="copyToastDetail" class="toast align-items-center text-white bg-success border-0" role="alert"><div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle me-2"></i>Prompt berhasil disalin!</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div></div></div>`);
      } else if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "vh-100 d-flex justify-content-center align-items-center" }, _attrs))}><div class="spinner-border text-primary" role="status"></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-DBZlYUnG.js.map
