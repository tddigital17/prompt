import { u as useAsyncData, _ as __nuxt_component_0, a as __nuxt_component_2, b as __nuxt_component_3 } from './asyncData-Bc0-_dPw.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-BlqZ6m_D.mjs';
import { ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-DykwVqLQ.mjs';
import { u as useUtils } from './useUtils-Cqy3Psk8.mjs';
import './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const { getYouTubeID } = useUtils();
    const search = ref("");
    const selectedCat = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(50);
    const { data: prompts, pending } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("prompts", async () => (await supabase.from("prompts").select("*, categories(name)").order("created_at", { ascending: false })).data || [])), __temp = await __temp, __restore(), __temp);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("categories", async () => (await supabase.from("categories").select("*").order("name")).data || [])), __temp = await __temp, __restore(), __temp);
    const filteredPrompts = computed(() => {
      var _a;
      return ((_a = prompts.value) == null ? void 0 : _a.filter((p) => (!search.value || `${p.title} ${p.prompt_text}`.toLowerCase().includes(search.value.toLowerCase())) && (!selectedCat.value || p.category_id === selectedCat.value))) || [];
    });
    const totalPages = computed(() => Math.max(1, Math.ceil(filteredPrompts.value.length / pageSize.value)));
    const paginatedPrompts = computed(() => filteredPrompts.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value));
    const visiblePages = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1).slice(Math.max(0, currentPage.value - 3), currentPage.value + 2));
    const categoryCount = (categoryId) => {
      var _a;
      return ((_a = prompts.value) == null ? void 0 : _a.filter((prompt) => prompt.category_id === categoryId).length) || 0;
    };
    watch([search, pageSize], () => {
      currentPage.value = 1;
    });
    watch(totalPages, (pages) => {
      if (currentPage.value > pages) currentPage.value = pages;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Navbar = __nuxt_component_0;
      const _component_AdBanner = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Footer = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "public-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
      _push(`<main><section class="hero-section"><div class="hero-orb orb-one"></div><div class="hero-orb orb-two"></div><div class="container position-relative py-5"><div class="row align-items-center g-5 py-lg-5"><div class="col-lg-7 hero-copy"><span class="eyebrow"><i class="bi bi-lightning-charge-fill me-1"></i> Learning hub untuk builder modern</span><h1 class="display-3 fw-bold mt-4 mb-4">Belajar membangun aplikasi dengan <span class="gradient-text">kekuatan AI.</span></h1><p class="lead text-secondary mb-4">Koleksi prompt terkurasi, tutorial video, dan inspirasi praktis untuk membantu Anda membuat produk digital lebih cepat.</p><div class="hero-actions d-flex flex-wrap gap-3"><a href="#koleksi" class="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"><i class="bi bi-compass me-2"></i>Mulai Belajar</a><a href="https://tddig.my.id/" target="_blank" rel="noopener noreferrer" class="btn btn-light btn-lg rounded-pill px-4 border"><i class="bi bi-box-arrow-up-right me-2"></i>TD Digital</a></div><div class="hero-meta d-flex flex-wrap gap-4 mt-5"><span><strong>${ssrInterpolate(((_a = unref(prompts)) == null ? void 0 : _a.length) || 0)}+</strong> prompt terkurasi</span><span><strong>${ssrInterpolate(((_b = unref(categories)) == null ? void 0 : _b.length) || 0)}</strong> platform AI</span><span><i class="bi bi-play-circle-fill text-primary me-1"></i>Belajar gratis</span></div></div><div class="col-lg-5 d-none d-lg-block"><div class="hero-visual rounded-4 p-3 shadow-lg"><div class="visual-window rounded-4 overflow-hidden"><div class="window-bar"><span></span><span></span><span></span><small>promptmaster / explore</small></div><div class="p-4"><div class="skeleton w-50 mb-3"></div><div class="skeleton w-100 mb-2"></div><div class="skeleton w-75 mb-4"></div><div class="code-card p-3 rounded-3"><div class="text-primary small mb-2">AI_BUILD_PROMPT</div><div class="text-dark small">Create a clean, scalable app<br>with a delightful user experience.</div></div><div class="d-flex gap-2 mt-3"><div class="mini-card"></div><div class="mini-card"></div><div class="mini-card"></div></div></div></div></div></div></div></div></section><div class="container" id="koleksi">`);
      _push(ssrRenderComponent(_component_AdBanner, { position: "top" }, null, _parent));
      _push(`<section class="catalog-section py-5"><div class="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4"><div><span class="eyebrow">Kurikulum pilihan</span><h2 class="fw-bold mt-2 mb-1">Jelajahi koleksi pembelajaran</h2><p class="text-secondary mb-0">Pilih topik, tonton tutorial, dan gunakan prompt siap pakai.</p></div><div class="catalog-count rounded-pill px-3 py-2"><i class="bi bi-collection-play me-2"></i>${ssrInterpolate(unref(filteredPrompts).length)} materi tersedia</div></div><div class="search-panel rounded-4 p-3 mb-4 shadow-sm"><div class="input-group search-input rounded-3 overflow-hidden"><span class="input-group-text"><i class="bi bi-search"></i></span><input${ssrRenderAttr("value", unref(search))} class="form-control" placeholder="Cari aplikasi, tutorial, atau prompt..."></div></div>`);
      if (unref(pending)) {
        _push(`<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>`);
      } else {
        _push(`<div class="catalog-layout"><aside class="category-panel rounded-4 p-3"><div class="small text-uppercase fw-bold text-muted mb-3 category-title"><i class="bi bi-funnel me-2 text-primary"></i>Filter kategori</div><div class="category-list"><button class="${ssrRenderClass([{ active: !unref(selectedCat) }, "category-option"])}"><span><i class="bi bi-grid me-2"></i>Semua materi</span><small>${ssrInterpolate(((_c = unref(prompts)) == null ? void 0 : _c.length) || 0)}</small></button><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          _push(`<button class="${ssrRenderClass([{ active: unref(selectedCat) === cat.id }, "category-option"])}"><span><i class="bi bi-tag me-2"></i>${ssrInterpolate(cat.name)}</span><small>${ssrInterpolate(categoryCount(cat.id))}</small></button>`);
        });
        _push(`<!--]--></div></aside><div class="catalog-results"><div class="results-toolbar d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3"><span class="text-secondary small">Menampilkan <strong class="text-dark">${ssrInterpolate(unref(paginatedPrompts).length)}</strong> dari ${ssrInterpolate(unref(filteredPrompts).length)} materi</span><label class="page-size-control small text-secondary">Tampilkan <select class="form-select form-select-sm d-inline-block mx-1"><option${ssrRenderAttr("value", 10)}${ssrIncludeBooleanAttr(Array.isArray(unref(pageSize)) ? ssrLooseContain(unref(pageSize), 10) : ssrLooseEqual(unref(pageSize), 10)) ? " selected" : ""}>10</option><option${ssrRenderAttr("value", 20)}${ssrIncludeBooleanAttr(Array.isArray(unref(pageSize)) ? ssrLooseContain(unref(pageSize), 20) : ssrLooseEqual(unref(pageSize), 20)) ? " selected" : ""}>20</option><option${ssrRenderAttr("value", 50)}${ssrIncludeBooleanAttr(Array.isArray(unref(pageSize)) ? ssrLooseContain(unref(pageSize), 50) : ssrLooseEqual(unref(pageSize), 50)) ? " selected" : ""}>50</option><option${ssrRenderAttr("value", 80)}${ssrIncludeBooleanAttr(Array.isArray(unref(pageSize)) ? ssrLooseContain(unref(pageSize), 80) : ssrLooseEqual(unref(pageSize), 80)) ? " selected" : ""}>80</option><option${ssrRenderAttr("value", 100)}${ssrIncludeBooleanAttr(Array.isArray(unref(pageSize)) ? ssrLooseContain(unref(pageSize), 100) : ssrLooseEqual(unref(pageSize), 100)) ? " selected" : ""}>100</option></select> per halaman </label></div><div class="row g-4"><!--[-->`);
        ssrRenderList(unref(paginatedPrompts), (item, index) => {
          var _a2;
          _push(`<div class="col-12 col-sm-6 col-xl-4 col-xxl-3 reveal-card" style="${ssrRenderStyle({ "--delay": `${index * 40}ms` })}"><article class="learning-card h-100 rounded-4 overflow-hidden"><div class="thumb-wrap position-relative"><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${unref(getYouTubeID)(item.youtube_url)}/mqdefault.jpg`)} class="w-100 h-100 object-fit-cover" alt="Thumbnail tutorial"><span class="play-badge"><i class="bi bi-play-fill"></i></span><span class="category-badge">${ssrInterpolate(((_a2 = item.categories) == null ? void 0 : _a2.name) || "AI")}</span></div><div class="card-body p-4 d-flex flex-column"><div class="small text-primary fw-semibold mb-2"><i class="bi bi-play-circle me-1"></i>Tutorial &amp; Prompt</div><h5 class="fw-bold line-clamp-2 mb-3">${ssrInterpolate(item.title)}</h5><div class="mt-auto d-grid gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/detail/${item.id}`,
            class: "btn btn-primary rounded-3"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Lihat materi <i class="bi bi-arrow-right ms-2"${_scopeId}></i>`);
              } else {
                return [
                  createTextVNode("Lihat materi "),
                  createVNode("i", { class: "bi bi-arrow-right ms-2" })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="btn btn-copy rounded-3"><i class="bi bi-copy me-2"></i>Salin prompt</button></div></div></article></div>`);
        });
        _push(`<!--]-->`);
        if (unref(filteredPrompts).length === 0) {
          _push(`<div class="empty-state text-center py-5 rounded-4"><i class="bi bi-search display-4 text-muted"></i><h5 class="mt-3 fw-bold">Materi belum ditemukan</h5><p class="text-secondary mb-0">Coba kata kunci atau kategori lain.</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(totalPages) > 1) {
          _push(`<nav class="d-flex justify-content-center mt-5" aria-label="Navigasi halaman"><ul class="pagination pagination-sm mb-0 shadow-sm"><li class="${ssrRenderClass([{ disabled: unref(currentPage) === 1 }, "page-item"])}"><button class="page-link rounded-start-pill"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""}><i class="bi bi-chevron-left"></i></button></li><!--[-->`);
          ssrRenderList(unref(visiblePages), (page) => {
            _push(`<li class="${ssrRenderClass([{ active: unref(currentPage) === page }, "page-item"])}"><button class="page-link">${ssrInterpolate(page)}</button></li>`);
          });
          _push(`<!--]--><li class="${ssrRenderClass([{ disabled: unref(currentPage) === unref(totalPages) }, "page-item"])}"><button class="page-link rounded-end-pill"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""}><i class="bi bi-chevron-right"></i></button></li></ul></nav>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</section>`);
      _push(ssrRenderComponent(_component_AdBanner, { position: "bottom" }, null, _parent));
      _push(`</div></main>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`<div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="copyToast" class="toast text-white bg-success border-0"><div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle me-2"></i>Prompt berhasil disalin!</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CFNpp94D.mjs.map
