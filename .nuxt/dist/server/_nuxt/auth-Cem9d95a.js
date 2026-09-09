import { i as defineNuxtRouteMiddleware, u as useSupabaseUser, n as navigateTo } from "../server.mjs";
import "vue";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/hookable/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/unctx/dist/index.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/defu/dist/defu.mjs";
import "D:/1. Data/8.Projek/GitHub/prompt/node_modules/ufo/dist/index.mjs";
import "@supabase/ssr";
import "vue/server-renderer";
const auth = defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (!user.value && to.path !== "/admin/login") {
    return navigateTo("/admin/login");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-Cem9d95a.js.map
