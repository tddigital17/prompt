import { _ as __nuxt_component_0 } from "./AdminSidebar-HCNEtzig.js";
import { ref, reactive, withAsyncContext, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass } from "vue/server-renderer";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/hookable/dist/index.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-DykwVqLQ.js";
import { u as useUtils } from "./useUtils-Cqy3Psk8.js";
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
  __name: "prompts",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const { getYouTubeID, formatDate } = useUtils();
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const prompts2 = ref([]);
    const categories = ref([]);
    const form = reactive({
      title: "",
      youtube_url: "",
      category_id: "",
      created_at: "",
      prompt_text: "",
      description: ""
    });
    const editId = ref(null);
    const submitting = ref(false);
    const fetchPrompts = async () => {
      const { data } = await supabase.from("prompts").select("*, categories(name)").order("created_at", { ascending: false });
      prompts2.value = data || [];
    };
    const fetchCategories = async () => {
      const { data } = await supabase.from("categories").select("*").order("name");
      categories.value = data || [];
    };
    [__temp, __restore] = withAsyncContext(() => Promise.all([fetchPrompts(), fetchCategories()])), await __temp, __restore();
    const filteredPrompts = computed(() => {
      return prompts2.value.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.prompt_text.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchCat = !selectedCategory.value || p.category_id === selectedCategory.value;
        return matchSearch && matchCat;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex min-vh-100 bg-light" }, _attrs))} data-v-d3fc2eda>`);
      _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
      _push(`<div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5" data-v-d3fc2eda><div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom" data-v-d3fc2eda><div data-v-d3fc2eda><h3 class="fw-bold text-dark mb-1" data-v-d3fc2eda>Manajemen Prompt &amp; Video</h3><p class="text-muted small mb-0" data-v-d3fc2eda>Kelola daftar prompt AI, link tutorial video, dan tanggal publikasi.</p></div><button class="btn btn-primary rounded-pill px-4 shadow-sm" data-v-d3fc2eda><i class="bi bi-plus-lg me-2" data-v-d3fc2eda></i>Tambah Prompt Baru </button></div><div class="card border-0 rounded-4 shadow-sm bg-white mb-4 p-3" data-v-d3fc2eda><div class="row g-3 align-items-center" data-v-d3fc2eda><div class="col-md-6 col-lg-5" data-v-d3fc2eda><div class="input-group border rounded-3 overflow-hidden" data-v-d3fc2eda><span class="input-group-text bg-white border-0" data-v-d3fc2eda><i class="bi bi-search text-muted" data-v-d3fc2eda></i></span><input${ssrRenderAttr("value", unref(searchQuery))} type="text" class="form-control border-0 py-2" placeholder="Cari berdasarkan judul prompt..." data-v-d3fc2eda></div></div><div class="col-md-4 col-lg-3" data-v-d3fc2eda><select class="form-select border rounded-3 py-2" data-v-d3fc2eda><option value="" data-v-d3fc2eda${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>Semua Kategori Platform</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)} data-v-d3fc2eda${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), c.id) : ssrLooseEqual(unref(selectedCategory), c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="col-md-2 col-lg-4 text-md-end text-muted small" data-v-d3fc2eda> Menampilkan <strong class="text-dark" data-v-d3fc2eda>${ssrInterpolate(unref(filteredPrompts).length)}</strong> prompt </div></div></div><div class="card border-0 rounded-4 shadow-sm bg-white overflow-hidden" data-v-d3fc2eda><div class="table-responsive" data-v-d3fc2eda><table class="table table-hover align-middle mb-0" data-v-d3fc2eda><thead class="bg-light border-bottom" data-v-d3fc2eda><tr class="text-uppercase text-muted small fw-bold" data-v-d3fc2eda><th class="px-4 py-3" style="${ssrRenderStyle({ "width": "35%" })}" data-v-d3fc2eda>Project &amp; Video</th><th class="px-3 py-3" data-v-d3fc2eda>Platform AI</th><th class="px-3 py-3" data-v-d3fc2eda>Tanggal Dibuat / Rilis</th><th class="px-4 py-3 text-end" style="${ssrRenderStyle({ "width": "15%" })}" data-v-d3fc2eda>Aksi</th></tr></thead><tbody data-v-d3fc2eda><!--[-->`);
      ssrRenderList(unref(filteredPrompts), (p) => {
        _push(`<tr data-v-d3fc2eda><td class="px-4 py-3" data-v-d3fc2eda><div class="d-flex align-items-center" data-v-d3fc2eda><div class="position-relative me-3 flex-shrink-0" style="${ssrRenderStyle({ "width": "90px", "height": "55px" })}" data-v-d3fc2eda><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${unref(getYouTubeID)(p.youtube_url)}/mqdefault.jpg`)} class="w-100 h-100 object-fit-cover rounded-3 border" alt="Thumb" data-v-d3fc2eda><span class="position-absolute top-50 start-50 translate-middle text-white drop-shadow" data-v-d3fc2eda><i class="bi bi-play-circle-fill fs-5" data-v-d3fc2eda></i></span></div><div data-v-d3fc2eda><h6 class="fw-bold mb-1 text-dark line-clamp-1" data-v-d3fc2eda>${ssrInterpolate(p.title)}</h6><small class="text-muted text-truncate d-block" style="${ssrRenderStyle({ "max-width": "300px" })}" data-v-d3fc2eda>${ssrInterpolate(p.prompt_text)}</small></div></div></td><td class="px-3 py-3" data-v-d3fc2eda><span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill px-3 py-1.5 fw-semibold" data-v-d3fc2eda>${ssrInterpolate(p.categories?.name || "Umum")}</span></td><td class="px-3 py-3" data-v-d3fc2eda><div class="d-flex align-items-center text-dark small fw-semibold" data-v-d3fc2eda><i class="bi bi-calendar3 me-2 text-primary" data-v-d3fc2eda></i> ${ssrInterpolate(unref(formatDate)(p.created_at))}</div></td><td class="px-4 py-3 text-end" data-v-d3fc2eda><button class="btn btn-sm btn-outline-primary border-0 me-1 p-2" title="Edit" data-v-d3fc2eda><i class="bi bi-pencil-square fs-6" data-v-d3fc2eda></i></button><button class="btn btn-sm btn-outline-danger border-0 p-2" title="Hapus" data-v-d3fc2eda><i class="bi bi-trash fs-6" data-v-d3fc2eda></i></button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(filteredPrompts).length) {
        _push(`<tr data-v-d3fc2eda><td colspan="4" class="text-center py-5" data-v-d3fc2eda><i class="bi bi-inbox text-muted display-4 d-block mb-3" data-v-d3fc2eda></i><p class="text-muted mb-0" data-v-d3fc2eda>Tidak ada prompt yang cocok dengan kriteria pencarian.</p></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div><div class="modal fade" id="promptModal" tabindex="-1" aria-hidden="true" data-v-d3fc2eda><div class="modal-dialog modal-lg modal-dialog-centered" data-v-d3fc2eda><div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden" data-v-d3fc2eda><div class="modal-header bg-dark text-white p-4 border-bottom-0" data-v-d3fc2eda><h5 class="fw-bold mb-0" data-v-d3fc2eda><i class="${ssrRenderClass([unref(editId) ? "bi-pencil-square text-warning" : "bi-plus-circle text-primary", "bi"])}" data-v-d3fc2eda></i><span class="ms-2" data-v-d3fc2eda>${ssrInterpolate(unref(editId) ? "Edit Prompt AI" : "Tambah Prompt AI Baru")}</span></h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-v-d3fc2eda></button></div><form data-v-d3fc2eda><div class="modal-body p-4 bg-white" data-v-d3fc2eda><div class="row g-3" data-v-d3fc2eda><div class="col-md-12" data-v-d3fc2eda><label class="form-label small fw-bold text-dark" data-v-d3fc2eda>Judul Project / Tutorial</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="form-control rounded-3 py-2" placeholder="Contoh: Membuat Aplikasi Kasir Toko dengan ChatGPT" required data-v-d3fc2eda></div><div class="col-md-6" data-v-d3fc2eda><label class="form-label small fw-bold text-dark" data-v-d3fc2eda>Link Video YouTube</label><div class="input-group" data-v-d3fc2eda><span class="input-group-text bg-light text-danger border-end-0" data-v-d3fc2eda><i class="bi bi-youtube" data-v-d3fc2eda></i></span><input${ssrRenderAttr("value", unref(form).youtube_url)} type="url" class="form-control rounded-end-3 py-2" placeholder="https://www.youtube.com/watch?v=..." required data-v-d3fc2eda></div></div><div class="col-md-6" data-v-d3fc2eda><label class="form-label small fw-bold text-dark" data-v-d3fc2eda>Kategori Platform AI</label><select class="form-select rounded-3 py-2" required data-v-d3fc2eda><option value="" disabled data-v-d3fc2eda${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Pilih Platform AI</option><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(`<option${ssrRenderAttr("value", c.id)} data-v-d3fc2eda${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, c.id) : ssrLooseEqual(unref(form).category_id, c.id)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="col-md-12" data-v-d3fc2eda><label class="form-label small fw-bold text-dark" data-v-d3fc2eda><i class="bi bi-calendar-event me-1 text-primary" data-v-d3fc2eda></i>Tanggal Dibuat / Publikasi </label><input${ssrRenderAttr("value", unref(form).created_at)} type="datetime-local" class="form-control rounded-3 py-2" required data-v-d3fc2eda><small class="text-muted" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-d3fc2eda>Anda dapat mengatur tanggal publikasi secara bebas (bisa tanggal lampau atau hari ini).</small></div><div class="col-md-12" data-v-d3fc2eda><label class="form-label small fw-bold text-dark" data-v-d3fc2eda>Isi Prompt AI Lengkap</label><textarea class="form-control rounded-3 font-monospace p-3" rows="7" placeholder="Instruksi prompt lengkap yang akan disalin pengguna..." required data-v-d3fc2eda>${ssrInterpolate(unref(form).prompt_text)}</textarea></div><div class="col-md-12" data-v-d3fc2eda><label class="form-label small fw-bold text-dark" data-v-d3fc2eda>Deskripsi Tambahan / Panduan (Opsional)</label><textarea class="form-control rounded-3 p-3" rows="3" placeholder="Langkah-langkah tambahan atau tips pemakaian..." data-v-d3fc2eda>${ssrInterpolate(unref(form).description)}</textarea></div></div></div><div class="modal-footer bg-light p-3 px-4 border-top" data-v-d3fc2eda><button type="button" class="btn btn-light rounded-pill px-4 fw-semibold" data-bs-dismiss="modal" data-v-d3fc2eda>Batal</button><button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""} data-v-d3fc2eda>`);
      if (unref(submitting)) {
        _push(`<span class="spinner-border spinner-border-sm me-2" data-v-d3fc2eda></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(submitting) ? "Menyimpan..." : "Simpan Prompt")}</button></div></form></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/prompts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const prompts = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d3fc2eda"]]);
export {
  prompts as default
};
//# sourceMappingURL=prompts-CaLhszBa.js.map
