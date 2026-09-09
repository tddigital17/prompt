import { _ as __nuxt_component_0 } from "./AdminSidebar-HCNEtzig.js";
import { ref, reactive, withAsyncContext, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "categories",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const searchQuery = ref("");
    const categories2 = ref([]);
    const prompts = ref([]);
    const form = reactive({ name: "", slug: "" });
    const editId = ref(null);
    const submitting = ref(false);
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      categories2.value = data || [];
    };
    const fetchPrompts = async () => {
      const { data } = await supabase.from("prompts").select("id, category_id");
      prompts.value = data || [];
    };
    [__temp, __restore] = withAsyncContext(() => Promise.all([fetchCategories(), fetchPrompts()])), await __temp, __restore();
    const filteredCategories = computed(() => {
      return categories2.value.filter((c) => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    const getPromptCount = (catId) => {
      return prompts.value.filter((p) => p.category_id === catId).length;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex min-vh-100 bg-light" }, _attrs))} data-v-150074d8>`);
      _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
      _push(`<div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5" data-v-150074d8><div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom" data-v-150074d8><div data-v-150074d8><h3 class="fw-bold text-dark mb-1" data-v-150074d8>Manajemen Kategori AI</h3><p class="text-muted small mb-0" data-v-150074d8>Kelola platform AI (Claude, ChatGPT, DeepSeek, Google AI, dll) untuk pengelompokan prompt.</p></div><button class="btn btn-primary rounded-pill px-4 shadow-sm" data-v-150074d8><i class="bi bi-plus-lg me-2" data-v-150074d8></i>Tambah Kategori </button></div><div class="row g-4" data-v-150074d8><div class="col-lg-8" data-v-150074d8><div class="card border-0 rounded-4 shadow-sm bg-white overflow-hidden" data-v-150074d8><div class="p-3 bg-white border-bottom d-flex align-items-center justify-content-between" data-v-150074d8><div class="input-group border rounded-3 overflow-hidden w-50" data-v-150074d8><span class="input-group-text bg-white border-0" data-v-150074d8><i class="bi bi-search text-muted" data-v-150074d8></i></span><input${ssrRenderAttr("value", unref(searchQuery))} type="text" class="form-control border-0 py-2" placeholder="Cari nama kategori..." data-v-150074d8></div><span class="text-muted small" data-v-150074d8>Total: <strong data-v-150074d8>${ssrInterpolate(unref(filteredCategories).length)}</strong> Kategori</span></div><div class="table-responsive" data-v-150074d8><table class="table table-hover align-middle mb-0" data-v-150074d8><thead class="bg-light border-bottom" data-v-150074d8><tr class="text-uppercase text-muted small fw-bold" data-v-150074d8><th class="px-4 py-3" data-v-150074d8>Nama Kategori</th><th class="px-3 py-3" data-v-150074d8>Slug / URL Identifier</th><th class="px-3 py-3 text-center" data-v-150074d8>Jumlah Prompt</th><th class="px-4 py-3 text-end" data-v-150074d8>Aksi</th></tr></thead><tbody data-v-150074d8><!--[-->`);
      ssrRenderList(unref(filteredCategories), (cat) => {
        _push(`<tr data-v-150074d8><td class="px-4 py-3" data-v-150074d8><div class="d-flex align-items-center" data-v-150074d8><div class="icon-box bg-primary-subtle text-primary rounded-3 p-2 me-3 fw-bold" data-v-150074d8><i class="bi bi-tag-fill fs-5" data-v-150074d8></i></div><span class="fw-bold text-dark fs-6" data-v-150074d8>${ssrInterpolate(cat.name)}</span></div></td><td class="px-3 py-3" data-v-150074d8><code class="bg-light text-primary px-2 py-1 rounded border small" data-v-150074d8>${ssrInterpolate(cat.slug)}</code></td><td class="px-3 py-3 text-center" data-v-150074d8><span class="badge bg-secondary-subtle text-dark border px-3 py-1.5 rounded-pill" data-v-150074d8>${ssrInterpolate(getPromptCount(cat.id))} Prompt </span></td><td class="px-4 py-3 text-end" data-v-150074d8><button class="btn btn-sm btn-outline-primary border-0 me-1 p-2" title="Edit" data-v-150074d8><i class="bi bi-pencil-square fs-6" data-v-150074d8></i></button><button class="btn btn-sm btn-outline-danger border-0 p-2" title="Hapus" data-v-150074d8><i class="bi bi-trash fs-6" data-v-150074d8></i></button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(filteredCategories).length) {
        _push(`<tr data-v-150074d8><td colspan="4" class="text-center py-5" data-v-150074d8><i class="bi bi-tags text-muted display-4 d-block mb-2" data-v-150074d8></i><p class="text-muted mb-0" data-v-150074d8>Belum ada kategori yang ditambahkan.</p></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div><div class="col-lg-4" data-v-150074d8><div class="card border-0 rounded-4 shadow-sm bg-white p-4 mb-4" data-v-150074d8><h6 class="fw-bold text-dark mb-3" data-v-150074d8><i class="bi bi-info-circle-fill text-primary me-2" data-v-150074d8></i>Panduan Kategori </h6><p class="text-muted small lh-lg mb-3" data-v-150074d8> Kategori digunakan untuk memfilter prompt AI pada halaman publik utama. Setiap kategori akan secara otomatis menjadi tombol filter cepat di beranda. </p><ul class="text-muted small ps-3 mb-0 lh-lg" data-v-150074d8><li data-v-150074d8><strong data-v-150074d8>Nama:</strong> Ditampilkan pada label tombol filter.</li><li data-v-150074d8><strong data-v-150074d8>Slug:</strong> Digunakan untuk rute URL atau pengenalan sistem (contoh: <code data-v-150074d8>claude-ai</code>).</li></ul></div></div></div></div><div class="modal fade" id="categoryModal" tabindex="-1" aria-hidden="true" data-v-150074d8><div class="modal-dialog modal-dialog-centered" data-v-150074d8><div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden" data-v-150074d8><div class="modal-header bg-dark text-white p-4 border-bottom-0" data-v-150074d8><h5 class="fw-bold mb-0" data-v-150074d8><i class="${ssrRenderClass([unref(editId) ? "bi-pencil-square text-warning" : "bi-plus-circle text-primary", "bi"])}" data-v-150074d8></i><span class="ms-2" data-v-150074d8>${ssrInterpolate(unref(editId) ? "Edit Kategori AI" : "Tambah Kategori AI Baru")}</span></h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-v-150074d8></button></div><form data-v-150074d8><div class="modal-body p-4 bg-white" data-v-150074d8><div class="mb-3" data-v-150074d8><label class="form-label small fw-bold text-dark" data-v-150074d8>Nama Kategori</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="form-control rounded-3 py-2" placeholder="Contoh: Claude 3.5 Sonnet" required data-v-150074d8></div><div class="mb-3" data-v-150074d8><label class="form-label small fw-bold text-dark" data-v-150074d8>Slug URL</label><input${ssrRenderAttr("value", unref(form).slug)} type="text" class="form-control rounded-3 py-2 font-monospace small" placeholder="claude-3-5-sonnet" required data-v-150074d8><small class="text-muted" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-150074d8>Slug terisi otomatis berdasarkan nama kategori, namun tetap dapat Anda ubah manual.</small></div></div><div class="modal-footer bg-light p-3 px-4 border-top" data-v-150074d8><button type="button" class="btn btn-light rounded-pill px-4 fw-semibold" data-bs-dismiss="modal" data-v-150074d8>Batal</button><button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} data-v-150074d8>`);
      if (unref(submitting)) {
        _push(`<span class="spinner-border spinner-border-sm me-2" data-v-150074d8></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(submitting) ? "Menyimpan..." : "Simpan Kategori")}</button></div></form></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const categories = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-150074d8"]]);
export {
  categories as default
};
//# sourceMappingURL=categories-DINaGKPU.js.map
