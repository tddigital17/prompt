<template>
  <div v-if="prompt" class="bg-light min-vh-100 d-flex flex-column">
    <Navbar />
    
    <div class="container py-5">
      <div class="row g-4">
        <!-- Main Content -->
        <div class="col-lg-8">
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><NuxtLink to="/">Home</NuxtLink></li>
              <li class="breadcrumb-item active">{{ prompt.categories?.name }}</li>
            </ol>
          </nav>

          <h1 class="fw-bold mb-4">{{ prompt.title }}</h1>
          
          <!-- Video Player -->
          <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow mb-5">
            <iframe 
              :src="`https://www.youtube.com/embed/${getYouTubeID(prompt.youtube_url)}`" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowfullscreen
            ></iframe>
          </div>

          <!-- Prompt Section -->
          <div class="card border-0 rounded-4 shadow-sm overflow-hidden mb-5">
            <div class="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fw-bold"><i class="bi bi-terminal me-2 text-primary"></i>AI Prompt</h5>
              <button @click="copyPrompt" class="btn btn-primary btn-sm rounded-pill px-3">
                <i class="bi bi-clipboard me-2"></i>Salin Prompt
              </button>
            </div>
            <div class="card-body bg-dark">
              <pre class="text-success p-3 mb-0" style="white-space: pre-wrap; font-family: 'Courier New', Courier, monospace;">{{ prompt.prompt_text }}</pre>
            </div>
          </div>

          <!-- Description -->
          <div class="card border-0 rounded-4 shadow-sm p-4 mb-4">
            <h5 class="fw-bold mb-3">Tentang Project Ini</h5>
            <div class="text-muted lh-lg">{{ prompt.description || 'Tidak ada deskripsi tambahan.' }}</div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <div class="sticky-top" style="top: 100px;">
            <div class="card border-0 rounded-4 shadow-sm p-4 mb-4 text-center">
              <img :src="`https://img.youtube.com/vi/${getYouTubeID(prompt.youtube_url)}/mqdefault.jpg`" class="rounded-3 mb-3 w-100 shadow-sm" alt="Small Thumb">
              <h6 class="fw-bold mb-1">Dibuat pada</h6>
              <p class="text-muted small mb-3">{{ formatDate(prompt.created_at) }}</p>
              <div class="badge bg-primary-subtle text-primary rounded-pill py-2 px-3 mb-4">
                {{ prompt.categories?.name }}
              </div>
              <AdBanner position="sidebar" />
            </div>
            
            <AdBanner position="bottom" />
          </div>
        </div>
      </div>
    </div>
    
    <Footer />
    
    <!-- Success Toast -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="copyToastDetail" class="toast align-items-center text-white bg-success border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body"><i class="bi bi-check-circle me-2"></i>Prompt berhasil disalin!</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else-if="pending" class="vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
</template>

<script setup>
const route = useRoute();
const supabase = useSupabaseClient();
const { getYouTubeID, copyToClipboard, formatDate } = useUtils();

const { data: prompt, pending } = await useAsyncData(`prompt-${route.params.id}`, async () => {
  const { data } = await supabase
    .from('prompts')
    .select('*, categories(name)')
    .eq('id', route.params.id)
    .single();
  return data;
});

const copyPrompt = async () => {
  const success = await copyToClipboard(prompt.value.prompt_text);
  if (success) {
    const toastEl = document.getElementById('copyToastDetail');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
};
</script>
