<template>
  <div class="d-flex min-vh-100 bg-light">
    <AdminSidebar />

    <div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h3 class="fw-bold text-dark mb-1">Pengaturan Iklan Adsterra</h3>
          <p class="text-muted small mb-0">Kelola script iklan untuk posisi leaderboard, sidebar, dan footer.</p>
        </div>
      </div>

      <div class="row g-4">
        <div v-for="pos in positions" :key="pos.id" class="col-md-6 col-xl-4">
          <div class="card border-0 rounded-4 shadow-sm h-100 overflow-hidden">
            <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="icon-box bg-primary-subtle text-primary rounded-3 p-2 me-2">
                  <i class="bi bi-badge-ad"></i>
                </div>
                <h6 class="fw-bold mb-0 text-dark">{{ pos.label }}</h6>
              </div>
            </div>
            <div class="card-body p-4">
              <div class="mb-3">
                <label class="form-label small text-muted fw-bold text-uppercase">Script Iklan (HTML/JS)</label>
                <textarea 
                  v-model="settings[pos.id]" 
                  class="form-control rounded-3 font-monospace small" 
                  rows="12" 
                  placeholder="Paste script tag Adsterra di sini..."
                ></textarea>
              </div>
              <button @click="saveSetting(pos.id)" class="btn btn-primary w-100 rounded-pill py-2 shadow-sm" :disabled="saving === pos.id">
                <i v-if="saving === pos.id" class="spinner-border spinner-border-sm me-2"></i>
                Simpan Perubahan
              </button>
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
const saving = ref(null);

const positions = [
  { id: 'adsterra_top', label: 'Atas (Leaderboard)' },
  { id: 'adsterra_sidebar', label: 'Bilah Sisi (Sidebar)' },
  { id: 'adsterra_bottom', label: 'Bawah (Footer Area)' }
];

const settings = reactive({
  adsterra_top: '',
  adsterra_sidebar: '',
  adsterra_bottom: ''
});

onMounted(async () => {
  const { data } = await supabase.from('settings').select('*');
  data?.forEach(s => {
    if (Object.prototype.hasOwnProperty.call(settings, s.id)) settings[s.id] = s.content || '';
  });
});

const saveSetting = async (id) => {
  saving.value = id;
  const { error } = await supabase.from('settings').upsert({ 
    id: id,
    content: settings[id] || '',
    updated_at: new Date().toISOString()
  });

  if (!error) {
    alert(`Pengaturan ${id} berhasil disimpan!`);
  }
  saving.value = null;
};
</script>

<style scoped>
.main-admin-content {
  margin-left: 280px;
  min-height: 100vh;
}

.icon-box {
  width: 40px;
  height: 40px;
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
