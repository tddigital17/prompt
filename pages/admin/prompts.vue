<template>
  <div class="d-flex min-vh-100 bg-light">
    <!-- Sidebar Navigation -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5">
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h3 class="fw-bold text-dark mb-1">Manajemen Prompt & Video</h3>
          <p class="text-muted small mb-0">Kelola daftar prompt AI, link tutorial video, dan tanggal publikasi.</p>
        </div>
        <button @click="openModal()" class="btn btn-primary rounded-pill px-4 shadow-sm">
          <i class="bi bi-plus-lg me-2"></i>Tambah Prompt Baru
        </button>
      </div>

      <!-- Search & Filter Bar -->
      <div class="card border-0 rounded-4 shadow-sm bg-white mb-4 p-3">
        <div class="row g-3 align-items-center">
          <div class="col-md-6 col-lg-5">
            <div class="input-group border rounded-3 overflow-hidden">
              <span class="input-group-text bg-white border-0"><i class="bi bi-search text-muted"></i></span>
              <input v-model="searchQuery" type="text" class="form-control border-0 py-2" placeholder="Cari berdasarkan judul prompt...">
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <select v-model="selectedCategory" class="form-select border rounded-3 py-2">
              <option value="">Semua Kategori Platform</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="col-md-2 col-lg-4 text-md-end text-muted small">
            Menampilkan <strong class="text-dark">{{ filteredPrompts.length }}</strong> prompt
          </div>
        </div>
      </div>

      <!-- Prompts Data Table -->
      <div class="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="bg-light border-bottom">
              <tr class="text-uppercase text-muted small fw-bold">
                <th class="px-4 py-3" style="width: 35%;">Project & Video</th>
                <th class="px-3 py-3">Platform AI</th>
                <th class="px-3 py-3">Tanggal Dibuat / Rilis</th>
                <th class="px-4 py-3 text-end" style="width: 15%;">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in filteredPrompts" :key="p.id">
                <td class="px-4 py-3">
                  <div class="d-flex align-items-center">
                    <div class="position-relative me-3 flex-shrink-0" style="width: 90px; height: 55px;">
                      <img :src="`https://img.youtube.com/vi/${getYouTubeID(p.youtube_url)}/mqdefault.jpg`" class="w-100 h-100 object-fit-cover rounded-3 border" alt="Thumb">
                      <span class="position-absolute top-50 start-50 translate-middle text-white drop-shadow">
                        <i class="bi bi-play-circle-fill fs-5"></i>
                      </span>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1 text-dark line-clamp-1">{{ p.title }}</h6>
                      <small class="text-muted text-truncate d-block" style="max-width: 300px;">{{ p.prompt_text }}</small>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-3">
                  <span class="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill px-3 py-1.5 fw-semibold">
                    {{ p.categories?.name || 'Umum' }}
                  </span>
                </td>
                <td class="px-3 py-3">
                  <div class="d-flex align-items-center text-dark small fw-semibold">
                    <i class="bi bi-calendar3 me-2 text-primary"></i>
                    {{ formatDate(p.created_at) }}
                  </div>
                </td>
                <td class="px-4 py-3 text-end">
                  <button @click="openModal(p)" class="btn btn-sm btn-outline-primary border-0 me-1 p-2" title="Edit">
                    <i class="bi bi-pencil-square fs-6"></i>
                  </button>
                  <button @click="handleDelete(p.id)" class="btn btn-sm btn-outline-danger border-0 p-2" title="Hapus">
                    <i class="bi bi-trash fs-6"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="!filteredPrompts.length">
                <td colspan="4" class="text-center py-5">
                  <i class="bi bi-inbox text-muted display-4 d-block mb-3"></i>
                  <p class="text-muted mb-0">Tidak ada prompt yang cocok dengan kriteria pencarian.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Form (Input & Edit Prompt with Input Tanggal) -->
    <div class="modal fade" id="promptModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          <div class="modal-header bg-dark text-white p-4 border-bottom-0">
            <h5 class="fw-bold mb-0">
              <i class="bi" :class="editId ? 'bi-pencil-square text-warning' : 'bi-plus-circle text-primary'"></i>
              <span class="ms-2">{{ editId ? 'Edit Prompt AI' : 'Tambah Prompt AI Baru' }}</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal-body p-4 bg-white">
              <div class="row g-3">
                <!-- Judul -->
                <div class="col-md-12">
                  <label class="form-label small fw-bold text-dark">Judul Project / Tutorial</label>
                  <input v-model="form.title" type="text" class="form-control rounded-3 py-2" placeholder="Contoh: Membuat Aplikasi Kasir Toko dengan ChatGPT" required>
                </div>

                <!-- Link YouTube -->
                <div class="col-md-6">
                  <label class="form-label small fw-bold text-dark">Link Video YouTube</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light text-danger border-end-0"><i class="bi bi-youtube"></i></span>
                    <input v-model="form.youtube_url" type="url" class="form-control rounded-end-3 py-2" placeholder="https://www.youtube.com/watch?v=..." required>
                  </div>
                </div>

                <!-- Kategori AI -->
                <div class="col-md-6">
                  <label class="form-label small fw-bold text-dark">Kategori Platform AI</label>
                  <select v-model="form.category_id" class="form-select rounded-3 py-2" required>
                    <option value="" disabled>Pilih Platform AI</option>
                    <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                  </select>
                </div>

                <!-- INPUT TANGGAL (Publikasi / Dibuat) -->
                <div class="col-md-12">
                  <label class="form-label small fw-bold text-dark">
                    <i class="bi bi-calendar-event me-1 text-primary"></i>Tanggal Dibuat / Publikasi
                  </label>
                  <input 
                    v-model="form.created_at" 
                    type="datetime-local" 
                    class="form-control rounded-3 py-2" 
                    required
                  >
                  <small class="text-muted" style="font-size: 0.75rem;">Anda dapat mengatur tanggal publikasi secara bebas (bisa tanggal lampau atau hari ini).</small>
                </div>

                <!-- Isi Prompt -->
                <div class="col-md-12">
                  <label class="form-label small fw-bold text-dark">Isi Prompt AI Lengkap</label>
                  <textarea 
                    v-model="form.prompt_text" 
                    class="form-control rounded-3 font-monospace p-3" 
                    rows="7" 
                    placeholder="Instruksi prompt lengkap yang akan disalin pengguna..." 
                    required
                  ></textarea>
                </div>

                <!-- Deskripsi Tambahan -->
                <div class="col-md-12">
                  <label class="form-label small fw-bold text-dark">Deskripsi Tambahan / Panduan (Opsional)</label>
                  <textarea 
                    v-model="form.description" 
                    class="form-control rounded-3 p-3" 
                    rows="3" 
                    placeholder="Langkah-langkah tambahan atau tips pemakaian..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer bg-light p-3 px-4 border-top">
              <button type="button" class="btn btn-light rounded-pill px-4 fw-semibold" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm" :disabled="submitting">
                <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                {{ submitting ? 'Menyimpan...' : 'Simpan Prompt' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth' });

const supabase = useSupabaseClient();
const { getYouTubeID, formatDate } = useUtils();

const searchQuery = ref('');
const selectedCategory = ref('');

const prompts = ref([]);
const categories = ref([]);

const form = reactive({
  title: '',
  youtube_url: '',
  category_id: '',
  created_at: '',
  prompt_text: '',
  description: ''
});

const editId = ref(null);
const submitting = ref(false);
let modalObj = null;

const fetchPrompts = async () => {
  const { data } = await supabase
    .from('prompts')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });
  prompts.value = data || [];
};

const fetchCategories = async () => {
  const { data } = await supabase.from('categories').select('*').order('name');
  categories.value = data || [];
};

await Promise.all([fetchPrompts(), fetchCategories()]);

onMounted(() => {
  const el = document.getElementById('promptModal');
  if (el) {
    modalObj = new bootstrap.Modal(el);
  }
});

const filteredPrompts = computed(() => {
  return prompts.value.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        p.prompt_text.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchCat = !selectedCategory.value || p.category_id === selectedCategory.value;
    return matchSearch && matchCat;
  });
});

const formatForDateTimeInput = (dateStr) => {
  if (!dateStr) return new Date().toISOString().slice(0, 16);
  const d = new Date(dateStr);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
};

const openModal = (p = null) => {
  if (p) {
    editId.value = p.id;
    Object.assign(form, {
      title: p.title,
      youtube_url: p.youtube_url,
      category_id: p.category_id,
      created_at: formatForDateTimeInput(p.created_at),
      prompt_text: p.prompt_text,
      description: p.description || ''
    });
  } else {
    editId.value = null;
    Object.assign(form, {
      title: '',
      youtube_url: '',
      category_id: categories.value[0]?.id || '',
      created_at: formatForDateTimeInput(new Date()),
      prompt_text: '',
      description: ''
    });
  }
  modalObj.show();
};

const handleSubmit = async () => {
  submitting.value = true;

  const payload = {
    title: form.title,
    youtube_url: form.youtube_url,
    category_id: form.category_id,
    created_at: new Date(form.created_at).toISOString(),
    prompt_text: form.prompt_text,
    description: form.description
  };

  if (editId.value) {
    await supabase.from('prompts').update(payload).eq('id', editId.value);
  } else {
    await supabase.from('prompts').insert(payload);
  }

  await fetchPrompts();
  submitting.value = false;
  modalObj.hide();
};

const handleDelete = async (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus prompt ini?')) {
    await supabase.from('prompts').delete().eq('id', id);
    await fetchPrompts();
  }
};
</script>

<style scoped>
.main-admin-content {
  margin-left: 280px;
  min-height: 100vh;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.drop-shadow {
  filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.6));
}

.object-fit-cover {
  object-fit: cover;
}

@media (max-width: 991.98px) {
  .main-admin-content {
    margin-left: 0;
  }
}
</style>
