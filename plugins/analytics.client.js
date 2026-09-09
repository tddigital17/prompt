export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const logPageView = async (path) => {
    // Hindari mencatat halaman admin
    if (!path || path.startsWith('/admin')) return;

    try {
      await supabase.from('page_views').insert({
        page_path: path,
        user_agent: process.client ? navigator.userAgent : 'unknown',
        created_at: new Date().toISOString()
      });
    } catch (e) {
      // Selesaikan secara silent jika terjadi kendala koneksi
    }
  };

  if (process.client) {
    // Catat saat halaman pertama kali dimuat
    logPageView(router.currentRoute.value.fullPath);

    // Catat saat berpindah halaman
    router.afterEach((to) => {
      logPageView(to.fullPath);
    });
  }
});
