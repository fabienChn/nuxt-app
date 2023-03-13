export default async function useRequest(path, options = {}) {
  const { apiUrl } = useRuntimeConfig().public;

  const authStore = useAuthStore();

  // @TODO: to remove
  console.log({
    fetch: `${apiUrl}/${path}`,
  });

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

  // @TODO: to remove
  console.log({
    responseData: response?.data?.value,
  });

  return response;
}
