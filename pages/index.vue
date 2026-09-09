<template>
  <div class="public-page">
    <Navbar />
    <main>
      <section class="hero-section">
        <div class="hero-orb orb-one"></div><div class="hero-orb orb-two"></div>
        <div class="container position-relative py-5">
          <div class="row align-items-center g-5 py-lg-5">
            <div class="col-lg-7 hero-copy">
              <span class="eyebrow"><i class="bi bi-lightning-charge-fill me-1"></i> Learning hub untuk builder modern</span>
              <h1 class="display-3 fw-bold mt-4 mb-4">Belajar membangun aplikasi dengan <span class="gradient-text">kekuatan AI.</span></h1>
              <p class="lead text-secondary mb-4">Koleksi prompt terkurasi, tutorial video, dan inspirasi praktis untuk membantu Anda membuat produk digital lebih cepat.</p>
              <div class="hero-actions d-flex flex-wrap gap-3">
                <a href="#koleksi" class="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"><i class="bi bi-compass me-2"></i>Mulai Belajar</a>
                <a href="https://tddig.my.id/" target="_blank" rel="noopener noreferrer" class="btn btn-light btn-lg rounded-pill px-4 border"><i class="bi bi-box-arrow-up-right me-2"></i>TD Digital</a>
              </div>
              <div class="hero-meta d-flex flex-wrap gap-4 mt-5">
                <span><strong>{{ prompts?.length || 0 }}+</strong> prompt terkurasi</span>
                <span><strong>{{ categories?.length || 0 }}</strong> platform AI</span>
                <span><i class="bi bi-play-circle-fill text-primary me-1"></i>Belajar gratis</span>
              </div>
            </div>
            <div class="col-lg-5 d-none d-lg-block">
              <div class="hero-visual rounded-4 p-3 shadow-lg">
                <div class="visual-window rounded-4 overflow-hidden">
                  <div class="window-bar"><span></span><span></span><span></span><small>promptmaster / explore</small></div>
                  <div class="p-4">
                    <div class="skeleton w-50 mb-3"></div><div class="skeleton w-100 mb-2"></div><div class="skeleton w-75 mb-4"></div>
                    <div class="code-card p-3 rounded-3"><div class="text-primary small mb-2">AI_BUILD_PROMPT</div><div class="text-dark small">Create a clean, scalable app<br>with a delightful user experience.</div></div>
                    <div class="d-flex gap-2 mt-3"><div class="mini-card"></div><div class="mini-card"></div><div class="mini-card"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="container" id="koleksi">
        <AdBanner position="top" />
        <section class="catalog-section py-5">
          <div class="section-heading d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-4">
            <div><span class="eyebrow">Kurikulum pilihan</span><h2 class="fw-bold mt-2 mb-1">Jelajahi koleksi pembelajaran</h2><p class="text-secondary mb-0">Pilih topik, tonton tutorial, dan gunakan prompt siap pakai.</p></div>
            <div class="catalog-count rounded-pill px-3 py-2"><i class="bi bi-collection-play me-2"></i>{{ filteredPrompts.length }} materi tersedia</div>
          </div>
          <div class="search-panel rounded-4 p-3 mb-4 shadow-sm">
          <div class="input-group search-input rounded-3 overflow-hidden"><span class="input-group-text"><i class="bi bi-search"></i></span><input v-model="search" class="form-control" placeholder="Cari aplikasi, tutorial, atau prompt..."></div>
          </div>
          <div v-if="pending" class="text-center py-5"><div class="spinner-border text-primary"></div></div>
          <div v-else class="catalog-layout">
          <aside class="category-panel rounded-4 p-3">
            <div class="small text-uppercase fw-bold text-muted mb-3 category-title"><i class="bi bi-funnel me-2 text-primary"></i>Filter kategori</div>
            <div class="category-list">
              <button @click="selectCategory(null)" class="category-option" :class="{ active: !selectedCat }"><span><i class="bi bi-grid me-2"></i>Semua materi</span><small>{{ prompts?.length || 0 }}</small></button>
              <button v-for="cat in categories" :key="cat.id" @click="selectCategory(cat.id)" class="category-option" :class="{ active: selectedCat === cat.id }"><span><i class="bi bi-tag me-2"></i>{{ cat.name }}</span><small>{{ categoryCount(cat.id) }}</small></button>
            </div>
          </aside>
          <div class="catalog-results">
            <div class="results-toolbar d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <span class="text-secondary small">Menampilkan <strong class="text-dark">{{ paginatedPrompts.length }}</strong> dari {{ filteredPrompts.length }} materi</span>
              <label class="page-size-control small text-secondary">Tampilkan
                <select v-model.number="pageSize" class="form-select form-select-sm d-inline-block mx-1"><option :value="10">10</option><option :value="20">20</option><option :value="50">50</option><option :value="80">80</option><option :value="100">100</option></select>
                per halaman
              </label>
            </div>
            <div class="row g-4">
              <div v-for="(item, index) in paginatedPrompts" :key="item.id" class="col-12 col-sm-6 col-xl-4 col-xxl-3 reveal-card" :style="{ '--delay': `${index * 40}ms` }">
                <article class="learning-card h-100 rounded-4 overflow-hidden">
                  <div class="thumb-wrap position-relative"><img :src="`https://img.youtube.com/vi/${getYouTubeID(item.youtube_url)}/mqdefault.jpg`" class="w-100 h-100 object-fit-cover" alt="Thumbnail tutorial"><span class="play-badge"><i class="bi bi-play-fill"></i></span><span class="category-badge">{{ item.categories?.name || 'AI' }}</span></div>
                  <div class="card-body p-4 d-flex flex-column"><div class="small text-primary fw-semibold mb-2"><i class="bi bi-play-circle me-1"></i>Tutorial & Prompt</div><h5 class="fw-bold line-clamp-2 mb-3">{{ item.title }}</h5><div class="mt-auto d-grid gap-2"><NuxtLink :to="`/detail/${item.id}`" class="btn btn-primary rounded-3">Lihat materi <i class="bi bi-arrow-right ms-2"></i></NuxtLink><button @click="copyPrompt(item.prompt_text)" class="btn btn-copy rounded-3"><i class="bi bi-copy me-2"></i>Salin prompt</button></div></div>
                </article>
              </div>
              <div v-if="filteredPrompts.length === 0" class="empty-state text-center py-5 rounded-4"><i class="bi bi-search display-4 text-muted"></i><h5 class="mt-3 fw-bold">Materi belum ditemukan</h5><p class="text-secondary mb-0">Coba kata kunci atau kategori lain.</p></div>
            </div>
            <nav v-if="totalPages > 1" class="d-flex justify-content-center mt-5" aria-label="Navigasi halaman">
              <ul class="pagination pagination-sm mb-0 shadow-sm">
                <li class="page-item" :class="{ disabled: currentPage === 1 }"><button class="page-link rounded-start-pill" @click="currentPage--" :disabled="currentPage === 1"><i class="bi bi-chevron-left"></i></button></li>
                <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }"><button class="page-link" @click="currentPage = page">{{ page }}</button></li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }"><button class="page-link rounded-end-pill" @click="currentPage++" :disabled="currentPage === totalPages"><i class="bi bi-chevron-right"></i></button></li>
              </ul>
            </nav>
          </div>
          </div>
        </section>
        <AdBanner position="bottom" />
      </div>
    </main>
    <Footer />
    <div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="copyToast" class="toast text-white bg-success border-0"><div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle me-2"></i>Prompt berhasil disalin!</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div></div></div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const { getYouTubeID, copyToClipboard } = useUtils()
const search = ref('')
const selectedCat = ref(null)
const currentPage = ref(1)
const pageSize = ref(50)
const { data: prompts, pending } = await useAsyncData('prompts', async () => (await supabase.from('prompts').select('*, categories(name)').order('created_at', { ascending: false })).data || [])
const { data: categories } = await useAsyncData('categories', async () => (await supabase.from('categories').select('*').order('name')).data || [])
const filteredPrompts = computed(() => prompts.value?.filter(p => (!search.value || `${p.title} ${p.prompt_text}`.toLowerCase().includes(search.value.toLowerCase())) && (!selectedCat.value || p.category_id === selectedCat.value)) || [])
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPrompts.value.length / pageSize.value)))
const paginatedPrompts = computed(() => filteredPrompts.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))
const visiblePages = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1).slice(Math.max(0, currentPage.value - 3), currentPage.value + 2))
const categoryCount = (categoryId) => prompts.value?.filter(prompt => prompt.category_id === categoryId).length || 0
const selectCategory = (categoryId) => { selectedCat.value = categoryId; currentPage.value = 1 }
watch([search, pageSize], () => { currentPage.value = 1 })
watch(totalPages, (pages) => { if (currentPage.value > pages) currentPage.value = pages })
const copyPrompt = async (text) => { if (await copyToClipboard(text)) new bootstrap.Toast(document.getElementById('copyToast')).show() }
</script>
