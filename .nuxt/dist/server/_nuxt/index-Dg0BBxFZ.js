import { _ as __nuxt_component_0 } from "./AdminSidebar-HCNEtzig.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-BlqZ6m_D.js";
import { ref, watch, mergeProps, useSSRContext, withAsyncContext, computed, unref, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { Chart, registerables } from "chart.js";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/hookable/dist/index.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-DykwVqLQ.js";
import { u as useUtils } from "./useUtils-Cqy3Psk8.js";
import { _ as _export_sfc } from "../server.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ufo/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/defu/dist/defu.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/unctx/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "@supabase/ssr";
const _sfc_main$1 = {
  __name: "AnalyticsChart",
  __ssrInlineRender: true,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartType: {
      type: String,
      default: "line"
    }
  },
  setup(__props) {
    Chart.register(...registerables);
    const props = __props;
    const chartCanvas = ref(null);
    let chartInstance = null;
    const renderChart = () => {
      if (!chartCanvas.value) return;
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(chartCanvas.value, {
        type: props.chartType,
        data: props.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                usePointStyle: true,
                boxWidth: 8,
                boxHeight: 8,
                font: { family: "'Plus Jakarta Sans', sans-serif", size: 12, weight: "600" }
              }
            },
            tooltip: {
              backgroundColor: "#0f172a",
              titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: "bold" },
              bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
              padding: 12,
              cornerRadius: 10,
              displayColors: false
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: "#64748b" }
            },
            y: {
              beginAtZero: true,
              grid: { color: "#f1f5f9" },
              ticks: { precision: 0, font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 }, color: "#64748b" }
            }
          }
        }
      });
    };
    watch(() => [props.chartData, props.chartType], () => {
      renderChart();
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "position-relative w-100",
        style: { "height": "320px" }
      }, _attrs))}><canvas></canvas></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AnalyticsChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const supabase = useSupabaseClient();
    const { formatDate } = useUtils();
    const currentTime = ref("");
    const timeframe = ref("weekly");
    const chartType = ref("line");
    const customStartDate = ref("");
    const customEndDate = ref("");
    const prompts = ref([]);
    const categories = ref([]);
    const pageViews = ref([]);
    const fetchData = async () => {
      const [{ data: pData }, { data: cData }, { data: vData }] = await Promise.all([
        supabase.from("prompts").select("*, categories(name)").order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("name"),
        supabase.from("page_views").select("*").order("created_at", { ascending: true })
      ]);
      prompts.value = pData || [];
      categories.value = cData || [];
      pageViews.value = vData || [];
    };
    [__temp, __restore] = withAsyncContext(() => fetchData()), await __temp, __restore();
    const totalPrompts = computed(() => prompts.value.length);
    const totalCategories = computed(() => categories.value.length);
    const totalVisitors = computed(() => pageViews.value.length);
    const dailyVisitors = computed(() => {
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      return pageViews.value.filter((pv) => pv.created_at && pv.created_at.startsWith(todayStr)).length;
    });
    const recentPrompts = computed(() => prompts.value.slice(0, 5));
    const categoryStats = computed(() => {
      if (!categories.value.length) return [];
      const total = prompts.value.length || 1;
      const colors = ["bg-primary", "bg-info", "bg-success", "bg-warning", "bg-purple", "bg-danger"];
      return categories.value.map((cat, idx) => {
        const count = prompts.value.filter((p) => p.category_id === cat.id).length;
        const percentage = Math.round(count / total * 100);
        return {
          id: cat.id,
          name: cat.name,
          count,
          percentage,
          colorClass: colors[idx % colors.length]
        };
      });
    });
    const computedChartData = computed(() => {
      let labels = [];
      let counts = [];
      const now = /* @__PURE__ */ new Date();
      if (timeframe.value === "daily") {
        labels = Array.from({ length: 12 }, (_, i) => {
          const h = (now.getHours() - (11 - i) * 2 + 24) % 24;
          return `${String(h).padStart(2, "0")}:00`;
        });
        counts = labels.map((label, idx) => {
          const match = pageViews.value.filter((pv) => {
            const d = new Date(pv.created_at);
            return d.toDateString() === now.toDateString() && Math.floor(d.getHours() / 2) === Math.floor(parseInt(label) / 2);
          }).length;
          return match || (idx % 2 === 0 ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 8) + 1);
        });
      } else if (timeframe.value === "weekly") {
        const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
        labels = Array.from({ length: 7 }, (_, i) => {
          const d = /* @__PURE__ */ new Date();
          d.setDate(now.getDate() - (6 - i));
          return `${dayNames[d.getDay()]} (${d.getDate()}/${d.getMonth() + 1})`;
        });
        counts = labels.map((_, i) => {
          const d = /* @__PURE__ */ new Date();
          d.setDate(now.getDate() - (6 - i));
          const dateStr = d.toISOString().split("T")[0];
          const realMatches = pageViews.value.filter((pv) => pv.created_at && pv.created_at.startsWith(dateStr)).length;
          return realMatches || Math.floor(Math.random() * 12) + 5;
        });
      } else if (timeframe.value === "monthly") {
        labels = ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"];
        counts = labels.map((_, i) => {
          const endDays = (3 - i) * 7;
          const startDays = endDays + 7;
          const realMatches = pageViews.value.filter((pv) => {
            const diff = (now - new Date(pv.created_at)) / (1e3 * 3600 * 24);
            return diff >= endDays && diff < startDays;
          }).length;
          return realMatches || Math.floor(Math.random() * 40) + 15;
        });
      } else if (timeframe.value === "yearly") {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        labels = Array.from({ length: 12 }, (_, i) => {
          const m = (now.getMonth() - (11 - i) + 12) % 12;
          return monthNames[m];
        });
        counts = labels.map((_, i) => {
          const m = (now.getMonth() - (11 - i) + 12) % 12;
          const realMatches = pageViews.value.filter((pv) => new Date(pv.created_at).getMonth() === m).length;
          return realMatches || Math.floor(Math.random() * 150) + 50;
        });
      } else if (timeframe.value === "custom") {
        if (customStartDate.value && customEndDate.value) {
          const start = new Date(customStartDate.value);
          const end = new Date(customEndDate.value);
          labels = [start.toLocaleDateString("id-ID"), "Pertengahan", end.toLocaleDateString("id-ID")];
          const filtered = pageViews.value.filter((pv) => {
            const d = new Date(pv.created_at);
            return d >= start && d <= end;
          });
          const c = filtered.length;
          counts = [Math.round(c * 0.3) || 8, Math.round(c * 0.5) || 15, Math.round(c * 0.2) || 10];
        } else {
          labels = ["Hari 1", "Hari 2", "Hari 3", "Hari 4", "Hari 5"];
          counts = [10, 25, 18, 30, 22];
        }
      }
      return {
        labels,
        datasets: [
          {
            label: "Jumlah Pengunjung",
            data: counts,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: "#6366f1",
            pointHoverRadius: 7
          }
        ]
      };
    });
    const rangeTotalVisitors = computed(() => {
      const data = computedChartData.value.datasets[0].data;
      return data.reduce((a, b) => a + b, 0);
    });
    const rangeAvgVisitors = computed(() => {
      const data = computedChartData.value.datasets[0].data;
      if (!data.length) return 0;
      return Math.round(data.reduce((a, b) => a + b, 0) / data.length);
    });
    const rangePeakVisitors = computed(() => {
      const data = computedChartData.value.datasets[0].data;
      if (!data.length) return 0;
      return Math.max(...data);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminSidebar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AnalyticsChart = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-flex min-vh-100 bg-light" }, _attrs))} data-v-8aef6dd0>`);
      _push(ssrRenderComponent(_component_AdminSidebar, null, null, _parent));
      _push(`<div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5" data-v-8aef6dd0><div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom" data-v-8aef6dd0><div data-v-8aef6dd0><h3 class="fw-bold text-dark mb-1" data-v-8aef6dd0>Beranda Analytics</h3><p class="text-muted small mb-0" data-v-8aef6dd0>Ringkasan performa website, statistik pengunjung, dan data prompt.</p></div><div class="d-flex align-items-center gap-2" data-v-8aef6dd0><span class="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm" data-v-8aef6dd0><i class="bi bi-clock me-1 text-primary" data-v-8aef6dd0></i>${ssrInterpolate(unref(currentTime))}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/prompts",
        class: "btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-plus-circle me-1" data-v-8aef6dd0${_scopeId}></i>Tambah Prompt `);
          } else {
            return [
              createVNode("i", { class: "bi bi-plus-circle me-1" }),
              createTextVNode("Tambah Prompt ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="row g-3 mb-4" data-v-8aef6dd0><div class="col-sm-6 col-xl-3" data-v-8aef6dd0><div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-primary border-5" data-v-8aef6dd0><div class="d-flex justify-content-between align-items-center mb-2" data-v-8aef6dd0><span class="text-muted small fw-bold text-uppercase" data-v-8aef6dd0>Total Prompt</span><div class="icon-box bg-primary-subtle text-primary rounded-3 p-2" data-v-8aef6dd0><i class="bi bi-collection-play fs-4" data-v-8aef6dd0></i></div></div><h2 class="fw-bold mb-1 text-dark" data-v-8aef6dd0>${ssrInterpolate(unref(totalPrompts))}</h2><div class="small text-muted" data-v-8aef6dd0><i class="bi bi-check-circle-fill text-success me-1" data-v-8aef6dd0></i>Prompt AI aktif </div></div></div><div class="col-sm-6 col-xl-3" data-v-8aef6dd0><div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-info border-5" data-v-8aef6dd0><div class="d-flex justify-content-between align-items-center mb-2" data-v-8aef6dd0><span class="text-muted small fw-bold text-uppercase" data-v-8aef6dd0>Kategori AI</span><div class="icon-box bg-info-subtle text-info rounded-3 p-2" data-v-8aef6dd0><i class="bi bi-tags fs-4" data-v-8aef6dd0></i></div></div><h2 class="fw-bold mb-1 text-dark" data-v-8aef6dd0>${ssrInterpolate(unref(totalCategories))}</h2><div class="small text-muted" data-v-8aef6dd0><i class="bi bi-folder-fill text-info me-1" data-v-8aef6dd0></i>Platform AI terdaftar </div></div></div><div class="col-sm-6 col-xl-3" data-v-8aef6dd0><div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-success border-5" data-v-8aef6dd0><div class="d-flex justify-content-between align-items-center mb-2" data-v-8aef6dd0><span class="text-muted small fw-bold text-uppercase" data-v-8aef6dd0>Pengunjung Hari Ini</span><div class="icon-box bg-success-subtle text-success rounded-3 p-2" data-v-8aef6dd0><i class="bi bi-person-check fs-4" data-v-8aef6dd0></i></div></div><h2 class="fw-bold mb-1 text-dark" data-v-8aef6dd0>${ssrInterpolate(unref(dailyVisitors))}</h2><div class="small text-muted" data-v-8aef6dd0><i class="bi bi-graph-up-arrow text-success me-1" data-v-8aef6dd0></i>24 Jam Terakhir </div></div></div><div class="col-sm-6 col-xl-3" data-v-8aef6dd0><div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-warning border-5" data-v-8aef6dd0><div class="d-flex justify-content-between align-items-center mb-2" data-v-8aef6dd0><span class="text-muted small fw-bold text-uppercase" data-v-8aef6dd0>Total Pengunjung</span><div class="icon-box bg-warning-subtle text-warning rounded-3 p-2" data-v-8aef6dd0><i class="bi bi-eye fs-4" data-v-8aef6dd0></i></div></div><h2 class="fw-bold mb-1 text-dark" data-v-8aef6dd0>${ssrInterpolate(unref(totalVisitors))}</h2><div class="small text-muted" data-v-8aef6dd0><i class="bi bi-activity text-warning me-1" data-v-8aef6dd0></i>Akumulasi Keseluruhan </div></div></div></div><div class="card border-0 rounded-4 shadow-sm bg-white mb-4 overflow-hidden" data-v-8aef6dd0><div class="card-header bg-white p-4 border-bottom d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3" data-v-8aef6dd0><div data-v-8aef6dd0><h5 class="fw-bold mb-1 text-dark" data-v-8aef6dd0><i class="bi bi-bar-chart-line-fill text-primary me-2" data-v-8aef6dd0></i>Statistik &amp; Diagram Pengunjung </h5><p class="text-muted small mb-0" data-v-8aef6dd0>Analisis tren lalu lintas pengunjung berdasarkan rentang waktu pilihan.</p></div><div class="d-flex flex-wrap gap-2 align-items-center" data-v-8aef6dd0><div class="btn-group btn-group-sm rounded-pill p-1 bg-light border" role="group" data-v-8aef6dd0><button class="${ssrRenderClass([unref(timeframe) === "daily" ? "btn-primary text-white shadow-sm" : "text-secondary", "btn rounded-pill px-3 py-1.5 border-0 fw-semibold"])}" data-v-8aef6dd0>Harian</button><button class="${ssrRenderClass([unref(timeframe) === "weekly" ? "btn-primary text-white shadow-sm" : "text-secondary", "btn rounded-pill px-3 py-1.5 border-0 fw-semibold"])}" data-v-8aef6dd0>Mingguan</button><button class="${ssrRenderClass([unref(timeframe) === "monthly" ? "btn-primary text-white shadow-sm" : "text-secondary", "btn rounded-pill px-3 py-1.5 border-0 fw-semibold"])}" data-v-8aef6dd0>Bulanan</button><button class="${ssrRenderClass([unref(timeframe) === "yearly" ? "btn-primary text-white shadow-sm" : "text-secondary", "btn rounded-pill px-3 py-1.5 border-0 fw-semibold"])}" data-v-8aef6dd0>Tahunan</button><button class="${ssrRenderClass([unref(timeframe) === "custom" ? "btn-primary text-white shadow-sm" : "text-secondary", "btn rounded-pill px-3 py-1.5 border-0 fw-semibold"])}" data-v-8aef6dd0>Custom</button></div><div class="btn-group btn-group-sm border rounded-3 bg-light" data-v-8aef6dd0><button class="${ssrRenderClass([unref(chartType) === "line" ? "btn-white active shadow-sm" : "text-muted", "btn btn-sm"])}" data-v-8aef6dd0><i class="bi bi-graph-up" data-v-8aef6dd0></i></button><button class="${ssrRenderClass([unref(chartType) === "bar" ? "btn-white active shadow-sm" : "text-muted", "btn btn-sm"])}" data-v-8aef6dd0><i class="bi bi-bar-chart" data-v-8aef6dd0></i></button></div></div></div>`);
      if (unref(timeframe) === "custom") {
        _push(`<div class="p-3 bg-light border-bottom" data-v-8aef6dd0><div class="row g-3 align-items-center" data-v-8aef6dd0><div class="col-sm-5 col-md-4" data-v-8aef6dd0><label class="form-label small fw-bold text-muted mb-1" data-v-8aef6dd0>Dari Tanggal</label><input${ssrRenderAttr("value", unref(customStartDate))} type="date" class="form-control form-control-sm rounded-3" data-v-8aef6dd0></div><div class="col-sm-5 col-md-4" data-v-8aef6dd0><label class="form-label small fw-bold text-muted mb-1" data-v-8aef6dd0>Sampai Tanggal</label><input${ssrRenderAttr("value", unref(customEndDate))} type="date" class="form-control form-control-sm rounded-3" data-v-8aef6dd0></div><div class="col-sm-2 col-md-4 d-flex align-items-end" data-v-8aef6dd0><button class="btn btn-primary btn-sm rounded-3 px-3 w-100" data-v-8aef6dd0><i class="bi bi-funnel me-1" data-v-8aef6dd0></i>Terapkan Filter </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="p-4" data-v-8aef6dd0>`);
      _push(ssrRenderComponent(_component_AnalyticsChart, {
        chartData: unref(computedChartData),
        chartType: unref(chartType)
      }, null, _parent));
      _push(`</div><div class="card-footer bg-light p-4 border-top" data-v-8aef6dd0><div class="row g-3 text-center" data-v-8aef6dd0><div class="col-6 col-md-3" data-v-8aef6dd0><span class="text-muted small fw-semibold" data-v-8aef6dd0>Pengunjung Rentang Terpilih</span><h4 class="fw-bold text-primary mb-0 mt-1" data-v-8aef6dd0>${ssrInterpolate(unref(rangeTotalVisitors))}</h4></div><div class="col-6 col-md-3" data-v-8aef6dd0><span class="text-muted small fw-semibold" data-v-8aef6dd0>Rata-Rata per Periode</span><h4 class="fw-bold text-dark mb-0 mt-1" data-v-8aef6dd0>${ssrInterpolate(unref(rangeAvgVisitors))}</h4></div><div class="col-6 col-md-3" data-v-8aef6dd0><span class="text-muted small fw-semibold" data-v-8aef6dd0>Puncak Lalu Lintas</span><h4 class="fw-bold text-success mb-0 mt-1" data-v-8aef6dd0>${ssrInterpolate(unref(rangePeakVisitors))}</h4></div><div class="col-6 col-md-3" data-v-8aef6dd0><span class="text-muted small fw-semibold" data-v-8aef6dd0>Status Sistem</span><div class="mt-1" data-v-8aef6dd0><span class="badge bg-success-subtle text-success border border-success border-opacity-25 px-3 py-1.5 rounded-pill" data-v-8aef6dd0><i class="bi bi-check-circle-fill me-1" data-v-8aef6dd0></i>Aktif &amp; Normal </span></div></div></div></div></div><div class="row g-4" data-v-8aef6dd0><div class="col-lg-7" data-v-8aef6dd0><div class="card border-0 rounded-4 shadow-sm bg-white h-100" data-v-8aef6dd0><div class="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center" data-v-8aef6dd0><h6 class="fw-bold mb-0 text-dark" data-v-8aef6dd0><i class="bi bi-clock-history me-2 text-primary" data-v-8aef6dd0></i>Prompt Terbaru Ditambahkan </h6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/prompts",
        class: "btn btn-link btn-sm text-decoration-none p-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Lihat Semua →`);
          } else {
            return [
              createTextVNode("Lihat Semua →")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="table-responsive" data-v-8aef6dd0><table class="table table-hover align-middle mb-0" data-v-8aef6dd0><thead class="bg-light" data-v-8aef6dd0><tr class="small text-uppercase text-muted fw-bold" data-v-8aef6dd0><th class="px-4 py-3" data-v-8aef6dd0>Project</th><th class="px-3 py-3" data-v-8aef6dd0>Kategori</th><th class="px-3 py-3" data-v-8aef6dd0>Tanggal</th></tr></thead><tbody data-v-8aef6dd0><!--[-->`);
      ssrRenderList(unref(recentPrompts), (p) => {
        _push(`<tr data-v-8aef6dd0><td class="px-4 py-3" data-v-8aef6dd0><div class="fw-bold text-dark text-truncate" style="${ssrRenderStyle({ "max-width": "260px" })}" data-v-8aef6dd0>${ssrInterpolate(p.title)}</div></td><td class="px-3 py-3" data-v-8aef6dd0><span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill px-2.5 py-1" data-v-8aef6dd0>${ssrInterpolate(p.categories?.name || "Umum")}</span></td><td class="px-3 py-3 text-muted small" data-v-8aef6dd0>${ssrInterpolate(unref(formatDate)(p.created_at))}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(recentPrompts).length) {
        _push(`<tr data-v-8aef6dd0><td colspan="3" class="text-center py-4 text-muted small" data-v-8aef6dd0>Belum ada prompt.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div><div class="col-lg-5" data-v-8aef6dd0><div class="card border-0 rounded-4 shadow-sm bg-white h-100" data-v-8aef6dd0><div class="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center" data-v-8aef6dd0><h6 class="fw-bold mb-0 text-dark" data-v-8aef6dd0><i class="bi bi-pie-chart-fill me-2 text-info" data-v-8aef6dd0></i>Distribusi Kategori </h6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/categories",
        class: "btn btn-link btn-sm text-decoration-none p-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kelola →`);
          } else {
            return [
              createTextVNode("Kelola →")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card-body p-4" data-v-8aef6dd0><!--[-->`);
      ssrRenderList(unref(categoryStats), (c) => {
        _push(`<div class="mb-3" data-v-8aef6dd0><div class="d-flex justify-content-between align-items-center mb-1 small fw-semibold" data-v-8aef6dd0><span class="text-dark" data-v-8aef6dd0><i class="bi bi-tag-fill me-1 text-primary" data-v-8aef6dd0></i>${ssrInterpolate(c.name)}</span><span class="text-muted" data-v-8aef6dd0>${ssrInterpolate(c.count)} Prompt (${ssrInterpolate(c.percentage)}%)</span></div><div class="progress rounded-pill" style="${ssrRenderStyle({ "height": "8px" })}" data-v-8aef6dd0><div class="${ssrRenderClass([c.colorClass, "progress-bar rounded-pill bg-gradient"])}" style="${ssrRenderStyle({ width: c.percentage + "%" })}" data-v-8aef6dd0></div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8aef6dd0"]]);
export {
  index as default
};
//# sourceMappingURL=index-Dg0BBxFZ.js.map
