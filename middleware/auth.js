export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  // Jika user tidak ada dan mencoba mengakses halaman selain login, lempar ke login
  if (!user.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login');
  }
});
