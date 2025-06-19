import { useAppStore, useAuthStore } from '@/store/index';
import axios from 'axios';
import Swal from 'sweetalert2';
const basePath = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: basePath,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        const authStore = useAuthStore();
        authStore.logout();
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();
        const appStore = useAppStore();
        if (error.response && error.response.status === 401) {
            appStore.hideLoadingOverlay();
            Swal.fire({
                position: "top-end",
                icon: "Info",
                title: "Tu sesión ha Expirado",
                showConfirmButton: false,
                timer: 1500
            });
            authStore.logout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
