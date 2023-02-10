export default function useAuth() {
  const authCookie = useCookie('auth', { sameSite: true });

  const auth = useState('auth', () => authCookie.value);

  const initAuth = (data) => {
    authCookie.value = JSON.stringify(data);

    auth.value = data;
  };

  const resetAuth = () => {
    authCookie.value = null;

    auth.value = null;
  }

  return {
    auth,
    isLoggedIn: Boolean(auth?.value?.id),
    initAuth,
    resetAuth,
  };
}