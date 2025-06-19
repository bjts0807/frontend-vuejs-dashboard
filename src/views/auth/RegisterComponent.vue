<script setup>
import { create } from '@/services/clientService';
import { useAppStore } from '@/store';
import logo from '@images/logo.svg?raw';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const client = ref({
  name: '',
  email: '',
  password: ''
})

const appStore = useAppStore();
const router = useRouter();

const isPasswordVisible = ref(false)

const rules = {
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required)
  },
  email: {
    required: helpers.withMessage('El email es obligatorio', required)
  },
  password: { required: helpers.withMessage('La contraseña es obligatoria', required) }
}

const v$ = useVuelidate(rules, client);

const save=async ()=>{
  try {
    if (!await v$.value.$validate()) {
      return;
    }
    appStore.showLoadingOverlay();
    await create(client.value);
    appStore.hideLoadingOverlay();

    Swal.fire('','Datos guardados','success');

    router.push({name:'login'});
  } catch (error) {
    console.log(error)
    appStore.hideLoadingOverlay();
    Swal.fire('Ups','Ha ocurrido un error al procesar la solicitud','error');
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
    
      <!-- 👉 Auth card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <RouterLink
            to="/"
            class="app-logo"
          >
            <!-- eslint-disable vue/no-v-html -->
            <div
              class="d-flex"
              v-html="logo"
            />
            <h1 class="app-logo-title">
              Dashboards
            </h1>
          </RouterLink>
        </VCardItem>

        <div class="mt-2" v-for="(error, index) in v$.name.$errors" :key="index">
          <v-alert :text="error.$message" title="Error" icon="$error" type="error" variant="tonal"></v-alert>
        </div>
        <div class="mt-2" v-for="(error, index) in v$.email.$errors" :key="index">
          <v-alert :text="error.$message" title="Error" icon="$error" type="error" variant="tonal"></v-alert>
        </div>
        <div class="mt-2" v-for="(error, index) in v$.password.$errors" :key="index">
          <v-alert :text="error.$message" title="Error" color="error" icon="$error" variant="tonal"></v-alert>
        </div>

        <VCardText>
          <VForm>
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VTextField
                  v-model="client.name"
                  autofocus
                  label="Nombre"
                  placeholder="Johndoe"
                />
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="client.email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="client.password"
                  label="Password"
                  autocomplete="password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <VBtn class="mt-3"
                  block
                  type="button"
                  @click="save"
                >
                  Registrarse
                </VBtn>
              </VCol>

              <!-- login instead -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Ya tienes una cuenta?</span>
                <RouterLink
                  class="text-primary ms-1"
                  to="/login"
                >
                  Iniciar Sesión
                </RouterLink>
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
