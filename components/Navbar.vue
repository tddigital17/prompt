<template>
  <nav class="navbar navbar-expand-lg public-navbar sticky-top py-3">
    <div class="container">
      <NuxtLink class="navbar-brand brand-mark d-flex align-items-center" to="/">
        <span class="brand-icon me-2"><i class="bi bi-stars"></i></span>
        <span>Prompt<span class="brand-accent">Master</span></span>
      </NuxtLink>
      <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <i class="bi bi-list fs-2"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item"><NuxtLink class="nav-link px-3 active" to="/">Beranda</NuxtLink></li>
          <li class="nav-item"><a class="nav-link px-3" href="#koleksi">Koleksi Prompt</a></li>
          <li class="nav-item dropdown ms-lg-2">
            <a class="nav-link dropdown-toggle partner-link px-3" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-grid-1x2-fill me-1"></i> Website Utama
            </a>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2">
              <li><a class="dropdown-item rounded-3 py-2" href="https://tddig.my.id/" target="_blank" rel="noopener noreferrer"><i class="bi bi-arrow-up-right-square me-2 text-primary"></i>TD Digital</a></li>
              <li><a class="dropdown-item rounded-3 py-2" href="https://www.hubapps.web.id/" target="_blank" rel="noopener noreferrer"><i class="bi bi-arrow-up-right-square me-2 text-primary"></i>HubApps</a></li>
            </ul>
          </li>
        </ul>
        <div class="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">
          <a class="btn btn-outline-primary rounded-pill px-3 btn-sm" href="https://tddig.my.id/" target="_blank" rel="noopener noreferrer">TD Digital</a>
          <a class="btn btn-primary rounded-pill px-3 btn-sm" href="https://www.hubapps.web.id/" target="_blank" rel="noopener noreferrer">HubApps <i class="bi bi-arrow-up-right ms-1"></i></a>
        </div>
      </div>
    </div>
  </nav>
</template>
