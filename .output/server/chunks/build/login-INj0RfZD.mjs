import { _ as __nuxt_component_0 } from './nuxt-link-BlqZ6m_D.mjs';
import { ref, watchEffect, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-DykwVqLQ.mjs';
import { u as useSupabaseUser, n as navigateTo } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const user = useSupabaseUser();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const error = ref(null);
    watchEffect(() => {
      if (user.value) navigateTo("/admin");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-vh-100 d-flex align-items-center justify-content-center bg-light px-3" }, _attrs))}><div class="card border-0 rounded-4 shadow-lg p-4 w-100" style="${ssrRenderStyle({ "max-width": "400px" })}"><div class="text-center mb-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-decoration-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="brand-icon brand-icon-login"${_scopeId}><i class="bi bi-stars"${_scopeId}></i></span><h3 class="fw-bold text-dark mt-3"${_scopeId}>Admin Login</h3>`);
          } else {
            return [
              createVNode("span", { class: "brand-icon brand-icon-login" }, [
                createVNode("i", { class: "bi bi-stars" })
              ]),
              createVNode("h3", { class: "fw-bold text-dark mt-3" }, "Admin Login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-muted small">Khusus pengelola platform</p></div><form><div class="mb-3"><label class="form-label small fw-bold text-uppercase text-muted">Email Address</label><div class="input-group border rounded-3 overflow-hidden"><span class="input-group-text bg-white border-0"><i class="bi bi-envelope text-muted"></i></span><input${ssrRenderAttr("value", unref(email))} type="email" class="form-control border-0 py-2" placeholder="admin@domain.com" required></div></div><div class="mb-4"><label class="form-label small fw-bold text-uppercase text-muted">Password</label><div class="input-group border rounded-3 overflow-hidden"><span class="input-group-text bg-white border-0"><i class="bi bi-lock text-muted"></i></span><input${ssrRenderAttr("value", unref(password))} type="password" class="form-control border-0 py-2" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required></div></div>`);
      if (unref(error)) {
        _push(`<div class="alert alert-danger border-0 rounded-3 small py-2"><i class="bi bi-exclamation-triangle-fill me-2"></i>${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-primary w-100 py-2 rounded-3 shadow-sm mb-3"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>`);
      if (unref(loading)) {
        _push(`<span class="spinner-border spinner-border-sm me-2"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Masuk ke Dashboard </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn-link w-100 text-muted small text-decoration-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-arrow-left me-1"${_scopeId}></i>Kembali ke Beranda `);
          } else {
            return [
              createVNode("i", { class: "bi bi-arrow-left me-1" }),
              createTextVNode("Kembali ke Beranda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-INj0RfZD.mjs.map
