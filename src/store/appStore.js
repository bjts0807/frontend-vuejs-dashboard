import { defineStore } from "pinia";

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            layout : 'default',
            loadingOverlay : false,
        }
    },
    actions : {
        showLoadingOverlay () {
            this.loadingOverlay = true;
        },
        hideLoadingOverlay (){
            this.loadingOverlay = false;
        },
    }
});
