<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
    <div class="card border-0 rounded-4 shadow-lg p-4 w-100" style="max-width: 400px;">
      <div class="text-center mb-4">
        <NuxtLink to="/" class="text-decoration-none">
          <span class="brand-icon brand-icon-login"><i class="bi bi-stars"></i></span>
          <h3 class="fw-bold text-dark mt-3">Admin Login</h3>
        </NuxtLink>
        <p class="text-muted small">Khusus pengelola platform</p>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label small fw-bold text-uppercase text-muted">Email Address</label>
          <div class="input-group border rounded-3 overflow-hidden">
            <span class="input-group-text bg-white border-0"><i class="bi bi-envelope text-muted"></i></span>
            <input v-model="email" type="email" class="form-control border-0 py-2" placeholder="admin@domain.com" required>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="form-label small fw-bold text-uppercase text-muted">Password</label>
          <div class="input-group border rounded-3 overflow-hidden">
            <span class="input-group-text bg-white border-0"><i class="bi bi-lock text-muted"></i></span>
            <input v-model="password" type="password" class="form-control border-0 py-2" placeholder="••••••••" required>
          </div>
        </div>
        
        <div v-if="error" class="alert alert-danger border-0 rounded-3 small py-2">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ error }}
        </div>
        
        <button type="submit" class="btn btn-primary w-100 py-2 rounded-3 shadow-sm mb-3" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Masuk ke Dashboard
        </button>
        
        <NuxtLink to="/" class="btn btn-link w-100 text-muted small text-decoration-none">
          <i class="bi bi-arrow-left me-1"></i>Kembali ke Beranda
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

watchEffect(() => {
  if (user.value) navigateTo('/admin');
});

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  
  const { error: err } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });
  
  if (err) {
    error.value = err.message || "Email atau password salah.";
    loading.value = false;
  }
};
</script>
