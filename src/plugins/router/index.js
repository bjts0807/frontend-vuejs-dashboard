import { useAuthStore } from '@/store';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default function (app) {
  app.use(router)
}

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresLogin) && !authStore.isAuthenticated) {
      next('/login');
  } else {
      next();
  }
});
export { router };

