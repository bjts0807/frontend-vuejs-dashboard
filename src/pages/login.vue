<script setup>
import { useAppStore, useAuthStore } from '@/store';
import logo from '@images/logo.svg?raw';
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url';
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url';

import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { ref } from "vue";
const hasError = ref(false);

const message = ref();

const userCredentials = ref({
  email: "bjts95@gmail.com",
  password: "123456",
});

const authStore = useAuthStore();
const appStore = useAppStore();
const rules = {
  email: {
    required: helpers.withMessage('El email es obligatorio', required)
  },
  password: { required: helpers.withMessage('La contraseña es obligatoria', required) }
}

const v$ = useVuelidate(rules, userCredentials);

const handleLogin = async () => {
  try {
    if (!await v$.value.$validate()) {
      return;
    }
    appStore.showLoadingOverlay();
    await authStore.login(userCredentials.value);
    appStore.hideLoadingOverlay();

  } catch (error) {
    appStore.hideLoadingOverlay();
    switch (error.response.status) {
      case 422:
        hasError.value = true;
        message.value = "Usuario o contraseña incorrectos";
        break;
      case 401:
        hasError.value = true;
        message.value = "Usuario o contraseña incorrectos";
        break;
      default:
        hasError.value = true;
        message.value = "Ha ocurrido un error, por favor intente nuevamente";
        break;
    }
  }
};


const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg :src="authV1TopShape" class="text-primary auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VImg :src="authV1BottomShape" class="text-primary auth-v1-bottom-shape d-none d-sm-block" />

      <!-- 👉 Auth Card -->
      <VCard class="auth-card" max-width="460" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
        <VCardItem class="justify-center">
          <RouterLink to="/" class="app-logo">
            <!-- eslint-disable vue/no-v-html -->
            <div class="d-flex" v-html="logo" />
            <h1 class="app-logo-title">
              Dashboards
            </h1>
          </RouterLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Bienvenido ! 👋🏻
          </h4>
          <p class="mb-0">
            Por favor ingrese sus credenciales
          </p>
        </VCardText>

        <VCardText>
          <VForm>
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField v-model="userCredentials.email" autofocus label="Email" type="email"
                  placeholder="johndoe@email.com" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField v-model="userCredentials.password" label="Password" placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'" autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                <v-alert v-if="hasError" :text="message" title="Alert title" type="info" variant="tonal"></v-alert>

                <div class="mt-2" v-for="(error, index) in v$.email.$errors" :key="index">
                  <v-alert :text="error.$message" title="Error" icon="$error" type="error" variant="tonal"></v-alert>

                </div>
                <div class="mt-2" v-for="(error, index) in v$.password.$errors" :key="index">
                  <v-alert :text="error.$message" title="Error" color="error" icon="$error" variant="tonal"></v-alert>
                </div>

                <!-- login button -->
                <VBtn block type="button" @click="handleLogin" class="mt-3">
                  Acceder
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
