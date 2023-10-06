<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="main_div">
        <div class="container">
          <v-form ref="form">
            <h3 class="mb-4">Login</h3>
            <v-text-field
              v-model="userData.email"
              label="email"
              required
              variant="outlined"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
            <v-text-field
              v-model="userData.password"
              label="password"
              required
              variant="outlined"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              hide-details
              required
            ></v-checkbox>

            <div class="d-flex flex-column pt-2">
              <v-btn color="primary" block @click="loginUser"> Login </v-btn>
              <div @click="router.push('/')">Signup</div>
            </div>
          </v-form>
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>
  <script lang="ts" setup>
import { reactive, ref } from "vue";
import { API_call } from "../utils/auth";

import { VForm } from "vuetify/lib/components/index.mjs";
import router from "../router/index";
const form = ref<InstanceType<typeof VForm>>();
let userData = reactive({
  email: "",
  password: "",
});

const checkbox = ref("");

// let nameRules = [
//   (v: string) => !!v || "Name is required",
//   (v: string) =>
//     (v && v.length <= 10) || "Name must be less than 10 characters",
// ];

async function loginUser() {
  if (form.value?.isValid) {
    try {
      const { request } = API_call();
    const response = await request.post("/user/login", userData);

      const token = await response.data;
      if (token.error) {
        alert(token.error);
        return;
      }
      localStorage.setItem("token", JSON.stringify(token));

      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  } else {
    alert("form is not valid");
  }
}
</script>