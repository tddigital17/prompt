<template>
  <div class="d-flex min-vh-100 bg-light">
    <!-- Sidebar Navigation -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="flex-grow-1 main-admin-content p-3 p-md-4 p-xl-5">
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h3 class="fw-bold text-dark mb-1">Manajemen Kategori AI</h3>
          <p class="text-muted small mb-0">Kelola platform AI (Claude, ChatGPT, DeepSeek, Google AI, dll) untuk pengelompokan prompt.</p>
        </div>
        <button @click="openModal()" class="btn btn-primary rounded-pill px-4 shadow-sm">
          <i class="bi bi-plus-lg me-2"></i>Tambah Kategori
        </button>
      </div>

      <!-- Categories Table & Stats -->
      <div class="row g-4">
        <!-- Main Categories List Table -->
        <div class="col-lg-8">
          <div class="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
            <div class="p-3 bg-white border-bottom d-flex align-items-center justify-content-between">
              <div class="input-group border rounded-3 overflow-hidden w-50">
                <span class="input-group-text bg-white border-0"><i class="bi bi-search text-muted"></i></span>
                <input v-model="searchQuery" type="text" class="form-control border-0 py-2" placeholder="Cari nama kategori...">
              </div>
              <span class="text-muted small">Total: <strong>{{ filteredCategories.length }}</strong> Kategori</span>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="bg-light border-bottom">
                  <tr class="text-uppercase text-muted small fw-bold">
                    <th class="px-4 py-3">Nama Kategori</th>
                    <th class="px-3 py-3">Slug / URL Identifier</th>
                    <th class="px-3 py-3 text-center">Jumlah Prompt</th>
                    <th class="px-4 py-3 text-end">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cat in filteredCategories" :key="cat.id">
                    <td class="px-4 py-3">
                      <div class="d-flex align-items-center">
                        <div class="icon-box bg-primary-subtle text-primary rounded-3 p-2 me-3 fw-bold">
                          <i class="bi bi-tag-fill fs-5"></i>
                        </div>
                        <span class="fw-bold text-dark fs-6">{{ cat.name }}</span>
                      </div>
                    </td>
                    <td class="px-3 py-3">
                      <code class="bg-light text-primary px-2 py-1 rounded border small">{{ cat.slug }}</code>
                    </td>
                    <td class="px-3 py-3 text-center">
                      <span class="badge bg-secondary-subtle text-dark border px-3 py-1.5 rounded-pill">
                        {{ getPromptCount(cat.id) }} Prompt
                      </span>
                    </td>
                    <td class="px-4 py-3 text-end">
                      <button @click="openModal(cat)" class="btn btn-sm btn-outline-primary border-0 me-1 p-2" title="Edit">
                        <i class="bi bi-pencil-square fs-6"></i>
                      </button>
                      <button @click="handleDelete(cat.id)" class="btn btn-sm btn-outline-danger border-0 p-2" title="Hapus">
                        <i class="bi bi-trash fs-6"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="!filteredCategories.length">
                    <td colspan="4" class="text-center py-5">
                      <i class="bi bi-tags text-muted display-4 d-block mb-2"></i>
                      <p class="text-muted mb-0">Belum ada kategori yang ditambahkan.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Side Quick Info Card -->
        <div class="col-lg-4">
          <div class="card border-0 rounded-4 shadow-sm bg-white p-4 mb-4">
            <h6 class="fw-bold text-dark mb-3">
              <i class="bi bi-info-circle-fill text-primary me-2"></i>Panduan Kategori
            </h6>
            <p class="text-muted small lh-lg mb-3">
              Kategori digunakan untuk memfilter prompt AI pada halaman publik utama. Setiap kategori akan secara otomatis menjadi tombol filter cepat di beranda.
            </p>
            <ul class="text-muted small ps-3 mb-0 lh-lg">
              <li><strong>Nama:</strong> Ditampilkan pada label tombol filter.</li>
              <li><strong>Slug:</strong> Digunakan untuk rute URL atau pengenalan sistem (contoh: <code>claude-ai</code>).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Add/Edit Category -->
    <div class="modal fade" id="categoryModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          <div class="modal-header bg-dark text-white p-4 border-bottom-0">
            <h5 class="fw-bold mb-0">
              <i class="bi" :class="editId ? 'bi-pencil-square text-warning' : 'bi-plus-circle text-primary'"></i>
              <span class="ms-2">{{ editId ? 'Edit Kategori AI' : 'Tambah Kategori AI Baru' }}</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal-body p-4 bg-white">
              <div class="mb-3">
                <label class="form-label small fw-bold text-dark">Nama Kategori</label>
                <input 
                  v-model="form.name" 
                  @input="autoGenerateSlug" 
                  type="text" 
                  class="form-control rounded-3 py-2" 
                  placeholder="Contoh: Claude 3.5 Sonnet" 
                  required
                >
              </div>
              <div class="mb-3">
                <label class="form-label small fw-bold text-dark">Slug URL</label>
                <input 
                  v-model="form.slug" 
                  type="text" 
                  class="form-control rounded-3 py-2 font-monospace small" 
                  placeholder="claude-3-5-sonnet" 
                  required
                >
                <small class="text-muted" style="font-size: 0.75rem;">Slug terisi otomatis berdasarkan nama kategori, namun tetap dapat Anda ubah manual.</small>
              </div>
            </div>
            <div class="modal-footer bg-light p-3 px-4 border-top">
              <button type="button" class="btn btn-light rounded-pill px-4 fw-semibold" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm" :disabled="submitting">
                <span v-if="submitting" class="spinner-border spinner-border-sm me-2"></span>
                {{ submitting ? 'Menyimpan...' : 'Simpan Kategori' }}
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

const searchQuery = ref('');
const categories = ref([]);
const prompts = ref([]);

const form = reactive({ name: '', slug: '' });
const editId = ref(null);
const submitting = ref(false);
let modalObj = null;

const fetchCategories = async () => {
  const { data } = await supabase.from('categories').select('*').order('name');
  categories.value = data || [];
};

const fetchPrompts = async () => {
  const { data } = await supabase.from('prompts').select('id, category_id');
  prompts.value = data || [];
};

await Promise.all([fetchCategories(), fetchPrompts()]);

onMounted(() => {
  const el = document.getElementById('categoryModal');
  if (el) {
    modalObj = new bootstrap.Modal(el);
  }
});

const filteredCategories = computed(() => {
  return categories.value.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const getPromptCount = (catId) => {
  return prompts.value.filter(p => p.category_id === catId).length;
};

const autoGenerateSlug = () => {
  if (!editId.value) {
    form.slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

const openModal = (cat = null) => {
  if (cat) {
    editId.value = cat.id;
    form.name = cat.name;
    form.slug = cat.slug;
  } else {
    editId.value = null;
    form.name = '';
    form.slug = '';
  }
  modalObj.show();
};

const handleSubmit = async () => {
  submitting.value = true;

  const payload = {
    name: form.name,
    slug: form.slug
  };

  if (editId.value) {
    await supabase.from('categories').update(payload).eq('id', editId.value);
  } else {
    await supabase.from('categories').insert(payload);
  }

  await fetchCategories();
  submitting.value = false;
  modalObj.hide();
};

const handleDelete = async (id) => {
  const count = getPromptCount(id);
  if (count > 0) {
    if (!confirm(`Kategori ini memiliki ${count} prompt terkait. Menghapus kategori ini akan mengosongkan kategori pada prompt tersebut. Lanjutkan?`)) {
      return;
    }
  } else {
    if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      return;
    }
  }

  await supabase.from('categories').delete().eq('id', id);
  await fetchCategories();
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
