<template>
  <div>
    <!-- Mobile Header Bar -->
    <div class="d-lg-none bg-dark text-white p-3 d-flex justify-content-between align-items-center sticky-top shadow-sm">
      <div class="d-flex align-items-center">
        <span class="brand-icon me-2"><i class="bi bi-stars"></i></span>
        <span class="fw-bold fs-5">Prompt<span class="brand-accent">Master</span></span>
      </div>
      <button @click="toggleSidebar" class="btn btn-outline-light border-0">
        <i class="bi" :class="isSidebarOpen ? 'bi-x-lg' : 'bi-list'"></i>
      </button>
    </div>

    <!-- Backdrop for Mobile -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false" 
      class="sidebar-backdrop d-lg-none"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="admin-sidebar bg-dark text-white d-flex flex-column shadow-lg"
      :class="{ 'show-mobile': isSidebarOpen }"
    >
      <!-- Brand Logo -->
      <div class="p-4 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
        <NuxtLink to="/admin" class="text-decoration-none text-white d-flex align-items-center">
          <div class="brand-icon me-3 d-flex align-items-center justify-content-center">
          <i class="bi bi-stars fs-4"></i>
          </div>
          <div>
            <h6 class="fw-bold mb-0 text-white">PromptMaster</h6>
            <small class="text-muted" style="font-size: 0.75rem;">Admin Panel v2.0</small>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="p-3 flex-grow-1 overflow-y-auto">
        <div class="text-uppercase small fw-bold text-muted px-3 mb-2" style="font-size: 0.7rem; letter-spacing: 1px;">Menu Utama</div>
        <ul class="nav nav-pills flex-column gap-1 mb-4">
          <li class="nav-item">
            <NuxtLink 
              to="/admin" 
              class="nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center"
              :class="{ 'active bg-primary text-white font-semibold': $route.path === '/admin' }"
              @click="isSidebarOpen = false"
            >
              <i class="bi bi-speedometer2 me-3 fs-5"></i>
              <span>Beranda & Analistik</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/admin/prompts" 
              class="nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center"
              :class="{ 'active bg-primary text-white font-semibold': $route.path.startsWith('/admin/prompts') }"
              @click="isSidebarOpen = false"
            >
              <i class="bi bi-collection-play me-3 fs-5"></i>
              <span>Manajemen Prompt</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/admin/categories" 
              class="nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center"
              :class="{ 'active bg-primary text-white font-semibold': $route.path.startsWith('/admin/categories') }"
              @click="isSidebarOpen = false"
            >
              <i class="bi bi-tags me-3 fs-5"></i>
              <span>Manajemen Kategori</span>
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink 
              to="/admin/settings" 
              class="nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center"
              :class="{ 'active bg-primary text-white font-semibold': $route.path.startsWith('/admin/settings') }"
              @click="isSidebarOpen = false"
            >
              <i class="bi bi-badge-ad me-3 fs-5"></i>
              <span>Pengaturan Iklan</span>
            </NuxtLink>
          </li>
        </ul>

        <div class="text-uppercase small fw-bold text-muted px-3 mb-2" style="font-size: 0.7rem; letter-spacing: 1px;">Sistem & Tampilan</div>
        <ul class="nav nav-pills flex-column gap-1">
          <li class="nav-item">
            <NuxtLink to="/" target="_blank" class="nav-link text-white-50 rounded-3 px-3 py-2.5 d-flex align-items-center">
              <i class="bi bi-box-arrow-up-right me-3 fs-5"></i>
              <span>Lihat Website</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- User Profile & Logout -->
      <div class="p-3 border-top border-secondary border-opacity-25 bg-black bg-opacity-25">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center overflow-hidden me-2">
            <div class="avatar bg-primary-subtle text-primary rounded-circle p-2 me-2 d-flex align-items-center justify-content-center fw-bold" style="width: 38px; height: 38px;">
              <i class="bi bi-person-fill fs-5"></i>
            </div>
            <div class="text-truncate">
              <div class="fw-bold text-white small text-truncate">{{ user?.email || 'Administrator' }}</div>
              <span class="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 py-0 px-2" style="font-size: 0.65rem;">Super Admin</span>
            </div>
          </div>
          <button @click="handleLogout" class="btn btn-outline-danger btn-sm border-0 rounded-circle p-2 ms-1" title="Logout">
            <i class="bi bi-power fs-5"></i>
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const handleLogout = async () => {
  await client.auth.signOut();
  navigateTo('/admin/login');
};
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  transition: transform 0.3s ease-in-out;
  background-color: #0f172a !important; /* Dark Navy Slate */
}

.brand-icon {
  width: 42px;
  height: 42px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.nav-link {
  transition: all 0.2s ease;
  font-size: 0.925rem;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  transform: translateX(4px);
}

.nav-link.active {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
}

@media (max-width: 991.98px) {
  .admin-sidebar {
    transform: translateX(-100%);
  }
  .admin-sidebar.show-mobile {
    transform: translateX(0);
  }
  .sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1030;
  }
}
</style>
