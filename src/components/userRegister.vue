<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="main_div">
        <div class="container">
          <v-form ref="form">
            <h3 class="mb-4">Register</h3>
            <v-text-field
              v-model="userData.name"
              label="Name"
              variant="outlined"
              required
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
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
            <v-text-field
              v-model="userData.phone"
              label="phone"
              required
              type="number"
              variant="outlined"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>

            <v-text-field
              v-model="userData.address"
              label="address"
              required
              variant="outlined"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
            <v-text-field
              v-model="userData.country"
              label="country"
              required
              variant="outlined"
              prepend-inner-icon="mdi-map-marker"
            ></v-text-field>
            <v-radio-group v-model="userData.role" class="mx-auto">
              <template v-slot:label>
                <div>Select your role</div>
              </template>
              <div v-for="option in ['seller', 'buyer']" :key="option">
                <v-radio :value="`${option}`">
                  <template v-slot:label>
                    <div>{{ option }}</div>
                  </template>
                </v-radio>
              </div>
            </v-radio-group>
            <v-text-field
              v-if="userData.role === 'seller'"
              v-model="userData.businessCategory"
              label="businessCategory"
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
              <v-btn color="primary" block @click="postData"> Signup </v-btn>
              <div @click="router.push('/login')">Login</div>
            </div>
          </v-form>
        </div>
      </div>
    </v-responsive>
  </v-container>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { VForm } from "vuetify/lib/components/index.mjs";
import router from "../router/index";
import { API_call } from "../utils/auth";

const form = ref<InstanceType<typeof VForm>>();
let userData = reactive({
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  country: "",
  businessCategory: "",
  role: "",
});
const checkbox = ref("");
// const data = ref(null);

// let nameRules = [
//   (v: string) => !!v || "Name is required",
//   (v: string) =>
//     (v && v.length <= 10) || "Name must be less than 10 characters",
// ];

async function postData() {
  if (form.value?.isValid) {
    try {
      const { request } = API_call();
      const response = await request.post("/user", userData);

      let data = await response.data;
      if (data.error) {
        alert(data.error);
        return;
      }
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("form is not valid");
  }
}
</script>
