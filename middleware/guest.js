export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  authStore.loadAuth();

  if (authStore.isLoggedIn()) {
    return navigateTo("/");
  }
});
