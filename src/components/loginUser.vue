<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
      <div class="main_div">
        <div class="container">
          <v-form ref="form">
                <!-- <v-card> -->
                  <v-card-title class="text-h5">Login</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="userData.email"
                      label="Email"
                      required
                      variant="outlined"
                      :rules="emailRules"
                      prepend-inner-icon="mdi-email"
                    ></v-text-field>
                    <v-text-field
                      v-model="userData.password"
                      label="Password"
                      required
                      variant="outlined"
                      :rules="passwordRules"
                      prepend-inner-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[(v) => !!v || 'You must agree to continue!']"
                      label="Do you agree?"
                      hide-details
                      required
                    ></v-checkbox>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="btn text-white" width="100%" @click="loginUser">Login</v-btn>
                  </v-card-actions>
                <!-- </v-card> -->
                <v-row class="mt-2">
                  <v-col class="text-center">
                    <div class="text-primary" @click="router.push('/')">Signup</div>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
  <script lang="ts" setup>
import { reactive, ref } from "vue";
import { VForm } from "vuetify/lib/components/index.mjs";
import router from "../router/index";
import { API_call } from "../utils/auth";
import { rules } from "../utils/rules";
const form = ref<InstanceType<typeof VForm>>();
let userData = reactive({
  email: "",
  password: "",
});
const {
  emailRules,
  passwordRules,
} = rules();
const checkbox = ref("");

// let nameRules = [
//   (v: string) => !!v || "Name is required",
//   (v: string) =>
//     (v && v.length <= 10) || "Name must be less than 10 characters",
// ];

async function loginUser() {
  const isValid = await form.value?.validate();
  if (!isValid?.valid) return;
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

}
</script>
<style>
.btn {
  background-color: #ec860a;
}</style>