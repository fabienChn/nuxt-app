export default function useAuth() {
  const initAuth = async (token) => {
    const authCookie = useCookie('auth', { sameSite: true, watch: true });

    const user = await useRequest('users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    const data = {
      token,
      user,
    };

    authCookie.value = data;
  };

  const resetAuth = () => {
    const authCookie = useCookie('auth');
    
    authCookie.value = null;
  };

  const getAuth = () => {
    const authCookie = useCookie('auth');

    if (authCookie.value?.token && !authCookie.value?.user) {
      throw new Error('Auth has a token but no user');
    }

    return authCookie;
  }
  
  const getAuthUser = () => getAuth()?.value?.user;

  const getIsLoggedIn = () => {
    const authCookie = useCookie('auth');

    const { token, user } = authCookie?.value ?? {};

    if (token && !user) {
      throw new Error('Auth has a token but no user');
    }

    return token;
  };

  return {
    isLoggedIn: getIsLoggedIn(),
    getIsLoggedIn,
    getAuthUser,
    getAuth,
    initAuth,
    resetAuth,
  };
}