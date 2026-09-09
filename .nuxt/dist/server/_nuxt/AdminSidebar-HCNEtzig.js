import { _ as __nuxt_component_0$1 } from "./nuxt-link-BlqZ6m_D.js";
import { ref, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, u as useSupabaseUser } from "../server.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-DykwVqLQ.js";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/hookable/dist/index.mjs";
const _sfc_main = {
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    const isSidebarOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-c21f74fc><div class="d-lg-none bg-dark text-white p-3 d-flex justify-content-between align-items-center sticky-top shadow-sm" data-v-c21f74fc><div class="d-flex align-items-center" data-v-c21f74fc><span class="brand-icon me-2" data-v-c21f74fc><i class="bi bi-stars" data-v-c21f74fc></i></span><span class="fw-bold fs-5" data-v-c21f74fc>Prompt<span class="brand-accent" data-v-c21f74fc>Master</span></span></div><button class="btn btn-outline-light border-0" data-v-c21f74fc><i class="${ssrRenderClass([unref(isSidebarOpen) ? "bi-x-lg" : "bi-list", "bi"])}" data-v-c21f74fc></i></button></div>`);
      if (unref(isSidebarOpen)) {
        _push(`<div class="sidebar-backdrop d-lg-none" data-v-c21f74fc></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{ "show-mobile": unref(isSidebarOpen) }, "admin-sidebar bg-dark text-white d-flex flex-column shadow-lg"])}" data-v-c21f74fc><div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between" data-v-c21f74fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: "text-decoration-none text-white d-flex align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="brand-icon me-3 d-flex align-items-center justify-content-center" data-v-c21f74fc${_scopeId}><i class="bi bi-stars fs-4" data-v-c21f74fc${_scopeId}></i></div><div data-v-c21f74fc${_scopeId}><h6 class="fw-bold mb-0 text-white" data-v-c21f74fc${_scopeId}>PromptMaster</h6><small class="text-muted" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-c21f74fc${_scopeId}>Admin Panel v2.0</small></div>`);
          } else {
            return [
              createVNode("div", { class: "brand-icon me-3 d-flex align-items-center justify-content-center" }, [
                createVNode("i", { class: "bi bi-stars fs-4" })
              ]),
              createVNode("div", null, [
                createVNode("h6", { class: "fw-bold mb-0 text-white" }, "PromptMaster"),
                createVNode("small", {
                  class: "text-muted",
                  style: { "font-size": "0.75rem" }
                }, "Admin Panel v2.0")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-3 flex-grow-1 overflow-y-auto" data-v-c21f74fc><div class="text-uppercase small fw-bold text-muted px-3 mb-2" style="${ssrRenderStyle({ "font-size": "0.7rem", "letter-spacing": "1px" })}" data-v-c21f74fc>Menu Utama</div><ul class="nav nav-pills flex-column gap-1 mb-4" data-v-c21f74fc><li class="nav-item" data-v-c21f74fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin",
        class: ["nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center", { "active bg-primary text-white font-semibold": _ctx.$route.path === "/admin" }],
        onClick: ($event) => isSidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-speedometer2 me-3 fs-5" data-v-c21f74fc${_scopeId}></i><span data-v-c21f74fc${_scopeId}>Beranda &amp; Analistik</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-speedometer2 me-3 fs-5" }),
              createVNode("span", null, "Beranda & Analistik")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-c21f74fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/prompts",
        class: ["nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center", { "active bg-primary text-white font-semibold": _ctx.$route.path.startsWith("/admin/prompts") }],
        onClick: ($event) => isSidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-collection-play me-3 fs-5" data-v-c21f74fc${_scopeId}></i><span data-v-c21f74fc${_scopeId}>Manajemen Prompt</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-collection-play me-3 fs-5" }),
              createVNode("span", null, "Manajemen Prompt")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-c21f74fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/categories",
        class: ["nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center", { "active bg-primary text-white font-semibold": _ctx.$route.path.startsWith("/admin/categories") }],
        onClick: ($event) => isSidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-tags me-3 fs-5" data-v-c21f74fc${_scopeId}></i><span data-v-c21f74fc${_scopeId}>Manajemen Kategori</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-tags me-3 fs-5" }),
              createVNode("span", null, "Manajemen Kategori")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-c21f74fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/settings",
        class: ["nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center", { "active bg-primary text-white font-semibold": _ctx.$route.path.startsWith("/admin/settings") }],
        onClick: ($event) => isSidebarOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-badge-ad me-3 fs-5" data-v-c21f74fc${_scopeId}></i><span data-v-c21f74fc${_scopeId}>Pengaturan Iklan</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-badge-ad me-3 fs-5" }),
              createVNode("span", null, "Pengaturan Iklan")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="text-uppercase small fw-bold text-muted px-3 mb-2" style="${ssrRenderStyle({ "font-size": "0.7rem", "letter-spacing": "1px" })}" data-v-c21f74fc>Sistem &amp; Tampilan</div><ul class="nav nav-pills flex-column gap-1" data-v-c21f74fc><li class="nav-item" data-v-c21f74fc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        target: "_blank",
        class: "nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-box-arrow-up-right me-3 fs-5" data-v-c21f74fc${_scopeId}></i><span data-v-c21f74fc${_scopeId}>Lihat Website</span>`);
          } else {
            return [
              createVNode("i", { class: "bi bi-box-arrow-up-right me-3 fs-5" }),
              createVNode("span", null, "Lihat Website")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="p-3 border-top border-secondary border-opacity-25 bg-black bg-opacity-25" data-v-c21f74fc><div class="d-flex align-items-center justify-content-between" data-v-c21f74fc><div class="d-flex align-items-center overflow-hidden me-2" data-v-c21f74fc><div class="avatar bg-primary-subtle text-primary rounded-circle p-2 me-2 d-flex align-items-center justify-content-center fw-bold" style="${ssrRenderStyle({ "width": "38px", "height": "38px" })}" data-v-c21f74fc><i class="bi bi-person-fill fs-5" data-v-c21f74fc></i></div><div class="text-truncate" data-v-c21f74fc><div class="fw-bold text-white small text-truncate" data-v-c21f74fc>${ssrInterpolate(unref(user)?.email || "Administrator")}</div><span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 py-0 px-2" style="${ssrRenderStyle({ "font-size": "0.65rem" })}" data-v-c21f74fc>Super Admin</span></div></div><button class="btn btn-outline-danger btn-sm border-0 rounded-circle p-2 ms-1" title="Logout" data-v-c21f74fc><i class="bi bi-power fs-5" data-v-c21f74fc></i></button></div></div></aside></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c21f74fc"]]);
export {
  __nuxt_component_0 as _
};
//# sourceMappingURL=AdminSidebar-HCNEtzig.js.map
