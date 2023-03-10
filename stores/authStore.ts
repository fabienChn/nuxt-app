import { defineStore } from "pinia";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  token?: string;
  user?: User;
}

export const useAuthStore = defineStore("AuthStore", {
  state: (): AuthState => ({}),
  getters: {
    getToken: (state: AuthState) => () => state.token,
    getUser: (state: AuthState) => () => state.user,
    isLoggedIn: (state: AuthState) => () => state.token && state.user,
  },
  actions: {
    loadAuth(): void {
      if (this.token && this.user) {
        return;
      }

      const authCookie = useCookie("auth");

      // @ts-ignore
      const { token, user } = authCookie?.value ?? {};

      if (token && !user) {
        throw new Error("Auth has a token but no user");
      }

      this.token = token;
      this.user = user;
    },
    async initAuth(token: string): Promise<void> {
      const authCookie = useCookie("auth", { sameSite: true, watch: true });

      const { data } = await useRequest("users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user: User = data.value;

      authCookie.value = JSON.stringify({
        token,
        user,
      });

      this.token = token;
      this.user = user;
    },
    resetAuth() {
      const authCookie = useCookie("auth");

      authCookie.value = null;
      this.token = undefined;
      this.user = undefined;
    },
  },
});
