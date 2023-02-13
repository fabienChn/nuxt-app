export default function useAuth() {
  const initAuth = (data) => {
    const authCookie = useCookie('auth', { sameSite: true });

    authCookie.value = JSON.stringify(data);
  };

  const resetAuth = () => {
    const authCookie = useCookie('auth');
    
    authCookie.value = null;
  };
  
  const getAuth = () => {
    return useCookie('auth');
  };

  const getIsLoggedIn = () => {
    return Boolean(useCookie('auth')?.value?.id);
  };

  return {
    isLoggedIn: getIsLoggedIn(),
    getIsLoggedIn,
    getAuth,
    initAuth,
    resetAuth,
  };
}