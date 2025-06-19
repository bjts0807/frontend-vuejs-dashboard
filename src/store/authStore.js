import { router } from "@/plugins/router";
import {
    getAuthenticatedUser,
    loginUser,
    removeAuthToken,
    removeAuthUser,
    setAuthToken,
    setAuthUser,
} from "@/services/loginService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuthenticated: !!localStorage.getItem("token"),
    }),

    actions: {
        async login(credentials) {
            try {
                const response = await loginUser(credentials);
                const { access_token, ...user } = response;     
                
                setAuthToken(access_token);
                localStorage.setItem("token", access_token);

                
                setAuthUser(user);
                this.user = user;
                this.isAuthenticated = true;

                localStorage.setItem("user", JSON.stringify(user));
                await router.push({ name: "dashboard.configurations" });
            } catch (error) {
                console.error("Login error:", error);
            }
        },

        async getUserCurrent() {
            try {
                const response = await getAuthenticatedUser();
                setAuthUser(response);
                this.user = response;
                localStorage.setItem("user", JSON.stringify(response));
            } catch (error) {
                console.error("Error fetching authenticated user:", error);
            }
        },

        async logout() {
            try {
                removeAuthToken();
                removeAuthUser();

                this.user = null;
                this.isAuthenticated = false;

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                await router.push({ name: "login" });
            } catch (error) {
                console.error(error.message);
            }
        },
    },
});
