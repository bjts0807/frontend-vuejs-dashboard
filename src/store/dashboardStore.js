import { getAll } from '@/services/dashboardsService';
import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    dashboards: [],
  }),
  actions: {
    async getDashboardsClient() {
      const { data } = await getAll();
      this.dashboards = data;
    },
  },
});
