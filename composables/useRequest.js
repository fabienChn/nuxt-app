export default async function useRequest(path, options = {}) {
  const { apiUrl } = useRuntimeConfig().public;

  const authStore = useAuthStore();

  const response = await useFetch(`${apiUrl}/${path}`, {
    credentials: "include",
    ...options,
    headers: authStore.token
      ? {
          Authorization: `Bearer ${authStore.token}`,
          ...options.headers,
        }
      : options.headers,
  });

  if (response?.error?.value?.statusCode === 401) {
    authStore.resetAuth();
    navigateTo("/login");
  }

  return response;
}
