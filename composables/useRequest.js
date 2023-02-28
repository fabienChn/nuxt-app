export default async function useRequest(path, options = {}) {
  const { apiUrl } = useRuntimeConfig().public;
  const { getAuthToken } = useAuth();

  const token = getAuthToken();

  const response = await useFetch(`${apiUrl}/${path}`, {
    credentials: 'include',
    ...options,
    headers: token ? {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    } : options.headers,
  });

  if (response?.error?.value?.statusCode === 401) {
    navigateTo('/login');
  }

  return response;
}