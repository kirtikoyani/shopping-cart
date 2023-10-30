<template>
  <v-container class="fill-height homePage">
    <v-responsive class="align-center text-center fill-height">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <div class="main_div">
            <div class="container">
              <v-form ref="form">
                <!-- <v-card> -->
                <v-card-title class="text-h5">Register</v-card-title>
                <v-card-text>
                  <v-text-field
                    v-model="userData.name"
                    label="Name"
                    variant="outlined"
                    required
                    :rules="nameRules"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
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
                  <v-text-field
                    v-model="userData.phone"
                    label="Phone"
                    required
                    type="number"
                    variant="outlined"
                    :rules="mobileNumberRules"
                    prepend-inner-icon="mdi-phone"
                  ></v-text-field>
                  <v-text-field
                    v-model="userData.address"
                    label="Address"
                    required
                    variant="outlined"
                    :rules="addressRules"
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                  <v-text-field
                    v-model="userData.country"
                    label="Country"
                    required
                    variant="outlined"
                    :rules="countryRules"
                    prepend-inner-icon="mdi-earth"
                  ></v-text-field>
                  <v-radio-group
                    v-model="userData.role"
                    :rules="[(v) => !!v || 'You must select an option']"
                    class="mx-auto"
                  >
                    <v-row>
                      <v-col cols="6">
                        <v-radio label="Seller" value="seller"></v-radio>
                      </v-col>
                      <v-col cols="6">
                        <v-radio label="Buyer" value="buyer"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-text-field
                    v-if="userData.role === 'seller'"
                    v-model="userData.businessCategory"
                    label="Business Category"
                    required
                    variant="outlined"
                    prepend-inner-icon="mdi-store"
                  ></v-text-field>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[(v) => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                  ></v-checkbox>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="btn text-white" width="100%" @click="postData"
                    >Signup</v-btn
                  >
                </v-card-actions>
                <v-progress-circular
                v-if="isLoading"
                indeterminate
                size="24"
                color="primary"
              ></v-progress-circular>
                <!-- </v-card> -->
                <v-row class="mt-2">
                  <v-col class="text-center">
                    <div class="text-primary" @click="router.push('/login')">
                      Already have an account? Login
                    </div>
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

const {
  addressRules,
  countryRules,
  emailRules,
  mobileNumberRules,
  nameRules,
  passwordRules,
} = rules();
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
const isLoading = ref(false);

async function postData() {
  const isValid = await form.value?.validate();
  if (!isValid?.valid) return;
  isLoading.value = true;
  try {
    const { request } = API_call();
    const response = await request.post("/user", userData);

    let data = await response.data;
    if (data.error) {
      alert(data.error);
      return;
    }
    router.push("/login");
  } catch (error) {
    console.error(error);
  }
}
</script>
<style>
.btn {
  background-color: #ec860a;
}
</style>