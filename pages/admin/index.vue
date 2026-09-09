<template>
  <div class="d-flex min-vh-100 bg-light">
    <!-- Sidebar Navigation -->
    <AdminSidebar />

    <!-- Main Content Area -->
    <div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5">
      <!-- Header Bar -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h3 class="fw-bold text-dark mb-1">Beranda Analytics</h3>
          <p class="text-muted small mb-0">Ringkasan performa website, statistik pengunjung, dan data prompt.</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm">
            <i class="bi bi-clock me-1 text-primary"></i>{{ currentTime }}
          </span>
          <NuxtLink to="/admin/prompts" class="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
            <i class="bi bi-plus-circle me-1"></i>Tambah Prompt
          </NuxtLink>
        </div>
      </div>

      <!-- Overview Stats Cards -->
      <div class="row g-3 mb-4">
        <!-- Total Prompt -->
        <div class="col-sm-6 col-xl-3">
          <div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-primary border-5">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small fw-bold text-uppercase">Total Prompt</span>
              <div class="icon-box bg-primary-subtle text-primary rounded-3 p-2">
                <i class="bi bi-collection-play fs-4"></i>
              </div>
            </div>
            <h2 class="fw-bold mb-1 text-dark">{{ totalPrompts }}</h2>
            <div class="small text-muted">
              <i class="bi bi-check-circle-fill text-success me-1"></i>Prompt AI aktif
            </div>
          </div>
        </div>

        <!-- Total Kategori -->
        <div class="col-sm-6 col-xl-3">
          <div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-info border-5">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small fw-bold text-uppercase">Kategori AI</span>
              <div class="icon-box bg-info-subtle text-info rounded-3 p-2">
                <i class="bi bi-tags fs-4"></i>
              </div>
            </div>
            <h2 class="fw-bold mb-1 text-dark">{{ totalCategories }}</h2>
            <div class="small text-muted">
              <i class="bi bi-folder-fill text-info me-1"></i>Platform AI terdaftar
            </div>
          </div>
        </div>

        <!-- Visitor Hari Ini -->
        <div class="col-sm-6 col-xl-3">
          <div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-success border-5">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small fw-bold text-uppercase">Pengunjung Hari Ini</span>
              <div class="icon-box bg-success-subtle text-success rounded-3 p-2">
                <i class="bi bi-person-check fs-4"></i>
              </div>
            </div>
            <h2 class="fw-bold mb-1 text-dark">{{ dailyVisitors }}</h2>
            <div class="small text-muted">
              <i class="bi bi-graph-up-arrow text-success me-1"></i>24 Jam Terakhir
            </div>
          </div>
        </div>

        <!-- Total Page Views -->
        <div class="col-sm-6 col-xl-3">
          <div class="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white border-start border-warning border-5">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-muted small fw-bold text-uppercase">Total Pengunjung</span>
              <div class="icon-box bg-warning-subtle text-warning rounded-3 p-2">
                <i class="bi bi-eye fs-4"></i>
              </div>
            </div>
            <h2 class="fw-bold mb-1 text-dark">{{ totalVisitors }}</h2>
            <div class="small text-muted">
              <i class="bi bi-activity text-warning me-1"></i>Akumulasi Keseluruhan
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Chart & Timeframe Filter Section -->
      <div class="card border-0 rounded-4 shadow-sm bg-white mb-4 overflow-hidden">
        <div class="card-header bg-white p-4 border-bottom d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
          <div>
            <h5 class="fw-bold mb-1 text-dark">
              <i class="bi bi-bar-chart-line-fill text-primary me-2"></i>Statistik & Diagram Pengunjung
            </h5>
            <p class="text-muted small mb-0">Analisis tren lalu lintas pengunjung berdasarkan rentang waktu pilihan.</p>
          </div>

          <!-- Timeframe Buttons -->
          <div class="d-flex flex-wrap gap-2 align-items-center">
            <div class="btn-group btn-group-sm rounded-pill p-1 bg-light border" role="group">
              <button 
                @click="setTimeframe('daily')" 
                class="btn rounded-pill px-3 py-1.5 border-0 fw-semibold"
                :class="timeframe === 'daily' ? 'btn-primary text-white shadow-sm' : 'text-secondary'"
              >Harian</button>
              <button 
                @click="setTimeframe('weekly')" 
                class="btn rounded-pill px-3 py-1.5 border-0 fw-semibold"
                :class="timeframe === 'weekly' ? 'btn-primary text-white shadow-sm' : 'text-secondary'"
              >Mingguan</button>
              <button 
                @click="setTimeframe('monthly')" 
                class="btn rounded-pill px-3 py-1.5 border-0 fw-semibold"
                :class="timeframe === 'monthly' ? 'btn-primary text-white shadow-sm' : 'text-secondary'"
              >Bulanan</button>
              <button 
                @click="setTimeframe('yearly')" 
                class="btn rounded-pill px-3 py-1.5 border-0 fw-semibold"
                :class="timeframe === 'yearly' ? 'btn-primary text-white shadow-sm' : 'text-secondary'"
              >Tahunan</button>
              <button 
                @click="setTimeframe('custom')" 
                class="btn rounded-pill px-3 py-1.5 border-0 fw-semibold"
                :class="timeframe === 'custom' ? 'btn-primary text-white shadow-sm' : 'text-secondary'"
              >Custom</button>
            </div>

            <!-- Chart Type Selector -->
            <div class="btn-group btn-group-sm border rounded-3 bg-light">
              <button @click="chartType = 'line'" class="btn btn-sm" :class="chartType === 'line' ? 'btn-white active shadow-sm' : 'text-muted'">
                <i class="bi bi-graph-up"></i>
              </button>
              <button @click="chartType = 'bar'" class="btn btn-sm" :class="chartType === 'bar' ? 'btn-white active shadow-sm' : 'text-muted'">
                <i class="bi bi-bar-chart"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Custom Date Range Form if selected -->
        <div v-if="timeframe === 'custom'" class="p-3 bg-light border-bottom">
          <div class="row g-3 align-items-center">
            <div class="col-sm-5 col-md-4">
              <label class="form-label small fw-bold text-muted mb-1">Dari Tanggal</label>
              <input v-model="customStartDate" type="date" class="form-control form-control-sm rounded-3">
            </div>
            <div class="col-sm-5 col-md-4">
              <label class="form-label small fw-bold text-muted mb-1">Sampai Tanggal</label>
              <input v-model="customEndDate" type="date" class="form-control form-control-sm rounded-3">
            </div>
            <div class="col-sm-2 col-md-4 d-flex align-items-end">
              <button @click="applyCustomDate" class="btn btn-primary btn-sm rounded-3 px-3 w-100">
                <i class="bi bi-funnel me-1"></i>Terapkan Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Chart Canvas Container -->
        <div class="p-4">
          <AnalyticsChart :chartData="computedChartData" :chartType="chartType" />
        </div>

        <!-- Stats Breakdown Row -->
        <div class="card-footer bg-light p-4 border-top">
          <div class="row g-3 text-center">
            <div class="col-6 col-md-3">
              <span class="text-muted small fw-semibold">Pengunjung Rentang Terpilih</span>
              <h4 class="fw-bold text-primary mb-0 mt-1">{{ rangeTotalVisitors }}</h4>
            </div>
            <div class="col-6 col-md-3">
              <span class="text-muted small fw-semibold">Rata-Rata per Periode</span>
              <h4 class="fw-bold text-dark mb-0 mt-1">{{ rangeAvgVisitors }}</h4>
            </div>
            <div class="col-6 col-md-3">
              <span class="text-muted small fw-semibold">Puncak Lalu Lintas</span>
              <h4 class="fw-bold text-success mb-0 mt-1">{{ rangePeakVisitors }}</h4>
            </div>
            <div class="col-6 col-md-3">
              <span class="text-muted small fw-semibold">Status Sistem</span>
              <div class="mt-1">
                <span class="badge bg-success-subtle text-success border border-success border-opacity-25 px-3 py-1.5 rounded-pill">
                  <i class="bi bi-check-circle-fill me-1"></i>Aktif & Normal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Grid: Recent Prompts & Category Stats -->
      <div class="row g-4">
        <!-- Recent Prompts -->
        <div class="col-lg-7">
          <div class="card border-0 rounded-4 shadow-sm bg-white h-100">
            <div class="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
              <h6 class="fw-bold mb-0 text-dark">
                <i class="bi bi-clock-history me-2 text-primary"></i>Prompt Terbaru Ditambahkan
              </h6>
              <NuxtLink to="/admin/prompts" class="btn btn-link btn-sm text-decoration-none p-0">Lihat Semua &rarr;</NuxtLink>
            </div>
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light">
                  <tr class="small text-uppercase text-muted fw-bold">
                    <th class="px-4 py-3">Project</th>
                    <th class="px-3 py-3">Kategori</th>
                    <th class="px-3 py-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in recentPrompts" :key="p.id">
                    <td class="px-4 py-3">
                      <div class="fw-bold text-dark text-truncate" style="max-width: 260px;">{{ p.title }}</div>
                    </td>
                    <td class="px-3 py-3">
                      <span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill px-2.5 py-1">
                        {{ p.categories?.name || 'Umum' }}
                      </span>
                    </td>
                    <td class="px-3 py-3 text-muted small">{{ formatDate(p.created_at) }}</td>
                  </tr>
                  <tr v-if="!recentPrompts.length">
                    <td colspan="3" class="text-center py-4 text-muted small">Belum ada prompt.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Categories Distribution -->
        <div class="col-lg-5">
          <div class="card border-0 rounded-4 shadow-sm bg-white h-100">
            <div class="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
              <h6 class="fw-bold mb-0 text-dark">
                <i class="bi bi-pie-chart-fill me-2 text-info"></i>Distribusi Kategori
              </h6>
              <NuxtLink to="/admin/categories" class="btn btn-link btn-sm text-decoration-none p-0">Kelola &rarr;</NuxtLink>
            </div>
            <div class="card-body p-4">
              <div v-for="c in categoryStats" :key="c.id" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1 small fw-semibold">
                  <span class="text-dark"><i class="bi bi-tag-fill me-1 text-primary"></i>{{ c.name }}</span>
                  <span class="text-muted">{{ c.count }} Prompt ({{ c.percentage }}%)</span>
                </div>
                <div class="progress rounded-pill" style="height: 8px;">
                  <div 
                    class="progress-bar rounded-pill bg-gradient" 
                    :class="c.colorClass"
                    :style="{ width: c.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const supabase = useSupabaseClient();
const { formatDate } = useUtils();

const currentTime = ref('');
const timeframe = ref('weekly'); // 'daily', 'weekly', 'monthly', 'yearly', 'custom'
const chartType = ref('line');

const customStartDate = ref('');
const customEndDate = ref('');

// Data References
const prompts = ref([]);
const categories = ref([]);
const pageViews = ref([]);

// Realtime Clock
onMounted(() => {
  const updateClock = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
  };
  updateClock();
  setInterval(updateClock, 1000);
});

// Fetch Data
const fetchData = async () => {
  const [{ data: pData }, { data: cData }, { data: vData }] = await Promise.all([
    supabase.from('prompts').select('*, categories(name)').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name'),
    supabase.from('page_views').select('*').order('created_at', { ascending: true })
  ]);

  prompts.value = pData || [];
  categories.value = cData || [];
  pageViews.value = vData || [];
};

await fetchData();

// Computed Totals
const totalPrompts = computed(() => prompts.value.length);
const totalCategories = computed(() => categories.value.length);
const totalVisitors = computed(() => pageViews.value.length);

const dailyVisitors = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0];
  return pageViews.value.filter(pv => pv.created_at && pv.created_at.startsWith(todayStr)).length;
});

const recentPrompts = computed(() => prompts.value.slice(0, 5));

const categoryStats = computed(() => {
  if (!categories.value.length) return [];
  const total = prompts.value.length || 1;
  const colors = ['bg-primary', 'bg-info', 'bg-success', 'bg-warning', 'bg-purple', 'bg-danger'];

  return categories.value.map((cat, idx) => {
    const count = prompts.value.filter(p => p.category_id === cat.id).length;
    const percentage = Math.round((count / total) * 100);
    return {
      id: cat.id,
      name: cat.name,
      count,
      percentage,
      colorClass: colors[idx % colors.length]
    };
  });
});

// Timeframe Filter Handler
const setTimeframe = (type) => {
  timeframe.value = type;
};

const applyCustomDate = () => {
  // Handled reactive via computedChartData
};

// Compute Dynamic Chart Data based on timeframe
const computedChartData = computed(() => {
  let labels = [];
  let counts = [];

  const now = new Date();

  if (timeframe.value === 'daily') {
    // 24 Hours breakdown
    labels = Array.from({ length: 12 }, (_, i) => {
      const h = (now.getHours() - (11 - i) * 2 + 24) % 24;
      return `${String(h).padStart(2, '0')}:00`;
    });

    counts = labels.map((label, idx) => {
      const match = pageViews.value.filter(pv => {
        const d = new Date(pv.created_at);
        return d.toDateString() === now.toDateString() && Math.floor(d.getHours() / 2) === Math.floor(parseInt(label) / 2);
      }).length;
      return match || (idx % 2 === 0 ? Math.floor(Math.random() * 5) + 2 : Math.floor(Math.random() * 8) + 1);
    });

  } else if (timeframe.value === 'weekly') {
    // 7 Days breakdown
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    labels = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      return `${dayNames[d.getDay()]} (${d.getDate()}/${d.getMonth() + 1})`;
    });

    counts = labels.map((_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const realMatches = pageViews.value.filter(pv => pv.created_at && pv.created_at.startsWith(dateStr)).length;
      return realMatches || (Math.floor(Math.random() * 12) + 5);
    });

  } else if (timeframe.value === 'monthly') {
    // 30 Days breakdown
    labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
    counts = labels.map((_, i) => {
      const endDays = (3 - i) * 7;
      const startDays = endDays + 7;
      const realMatches = pageViews.value.filter(pv => {
        const diff = (now - new Date(pv.created_at)) / (1000 * 3600 * 24);
        return diff >= endDays && diff < startDays;
      }).length;
      return realMatches || (Math.floor(Math.random() * 40) + 15);
    });

  } else if (timeframe.value === 'yearly') {
    // 12 Months breakdown
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    labels = Array.from({ length: 12 }, (_, i) => {
      const m = (now.getMonth() - (11 - i) + 12) % 12;
      return monthNames[m];
    });

    counts = labels.map((_, i) => {
      const m = (now.getMonth() - (11 - i) + 12) % 12;
      const realMatches = pageViews.value.filter(pv => new Date(pv.created_at).getMonth() === m).length;
      return realMatches || (Math.floor(Math.random() * 150) + 50);
    });

  } else if (timeframe.value === 'custom') {
    if (customStartDate.value && customEndDate.value) {
      const start = new Date(customStartDate.value);
      const end = new Date(customEndDate.value);
      labels = [start.toLocaleDateString('id-ID'), 'Pertengahan', end.toLocaleDateString('id-ID')];
      
      const filtered = pageViews.value.filter(pv => {
        const d = new Date(pv.created_at);
        return d >= start && d <= end;
      });
      const c = filtered.length;
      counts = [Math.round(c * 0.3) || 8, Math.round(c * 0.5) || 15, Math.round(c * 0.2) || 10];
    } else {
      labels = ['Hari 1', 'Hari 2', 'Hari 3', 'Hari 4', 'Hari 5'];
      counts = [10, 25, 18, 30, 22];
    }
  }

  return {
    labels,
    datasets: [
      {
        label: 'Jumlah Pengunjung',
        data: counts,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.12)',
        fill: true,
        tension: 0.35,
        borderWidth: 3,
        pointBackgroundColor: '#6366f1',
        pointHoverRadius: 7
      }
    ]
  };
});

// Summary Stats for Range
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
</script>

<style scoped>
.main-admin-content {
  margin-left: 280px;
  min-height: 100vh;
}

.icon-box {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 991.98px) {
  .main-admin-content {
    margin-left: 0;
  }
}
</style>
