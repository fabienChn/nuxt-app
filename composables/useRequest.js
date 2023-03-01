export default async function useRequest(path, options = {}) {
  const { apiUrl } = useRuntimeConfig().public;
  const { getAuth, resetAuth } = useAuth();

  const token = getAuth()?.value?.token;

  const response = await useFetch(`${apiUrl}/${path}`, {
    credentials: 'include',
    ...options,
    headers: token ? {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    } : options.headers,
  });

  if (response?.error?.value?.statusCode === 401) {
    resetAuth();
    navigateTo('/login');
  }

  return response;
}