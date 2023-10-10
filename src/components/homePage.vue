<template>
  <div class="homePage">
    <nav class="d-flex nav-bar align-center justify-space-between pa-4 px-12">
      <h3>MY CART</h3>
      <div class="search">
        <v-text-field
          type="text"
          v-model="search"
          placeholder="Search Here..."
          variant="outlined"
          hide-details
          prepend-inner-icon="mdi-magnify"
        />
      </div>
      <div class="d-flex align-center">
        <v-badge :content="cart_data.length" color="error">
          <v-icon size="30" @click="router.push('/cart')"
            >mdi-cart-variant</v-icon
          ></v-badge
        >
        <v-icon @click="logOut" class="ml-4">mdi-logout</v-icon>
      </div>
    </nav>
    <v-container class="fill-height">
      <v-responsive class="align-center text-center fill-height">
        <h2>Welcome to Shopping Cart</h2>
      </v-responsive>
    </v-container>
    <v-container>
    
      <v-row align="center" justify="center">
        <v-progress-circular
        v-if="isLoading"
        indeterminate
        size="24"
        color="primary"
      ></v-progress-circular>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="product in filterProductDataByTitle()"
          :key="product?._id"
        >
          <v-card class="mx-auto cards" max-width="344" variant="elevated">
            <v-card-item>
              <div class="d-flex flex-column align-center pb-16">
                <div class="text-h6 mb-1">
                  {{ product.title }}
                </div>
                <div class="text-caption mb-4">{{ product.description }}</div>
                <img class="img" :src="`${product.images}`" alt="" />
                <div class="d-flex align-center justify-space-between">
                  <div>&#8377;{{ product.price }}</div>
                  <div class="d-flex flex-column align-center justify-center">
                    <v-rating
                      v-model="product.rating"
                      class="ma-2"
                      density="compact"
                      half-increments
                    ></v-rating>
                  </div>
                </div>
              </div>
            </v-card-item>
            <v-card-actions class="btn">
              <v-btn @click="showProductDetails(product)" width="100%"
                >view details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="viewCard" width="700">
        <v-card class="pa-4 product-dialog">
          <div class="d-flex justify-space-between">
            <img
              class="product-image"
              :src="`${selectedProductDetails.images}`"
              alt=""
            />
            <div
              class="product-details d-flex flex-column justify-space-between"
            >
              <div class="product-title text-h6 mb-1">
                {{ selectedProductDetails.title }}
              </div>
              <div class="product-description text-caption mb-4">
                {{ selectedProductDetails.description }}
              </div>
              <div class="product-price text-caption mb-4">
                &#8377;{{ selectedProductDetails.price }}
              </div>
              <v-chip-group class="product-sizes mb-4">
                <v-chip v-for="size in selectedProductDetails.size" :key="size">
                  {{ size }}
                </v-chip>
              </v-chip-group>
              <div class="d-flex align-center justify-space-around">
                <div class="quantity-control d-flex align-center">
                  <button @click="decrementQuantity" class="quantity-button">
                    -
                  </button>
                  <p class="mx-2">{{ selectedProductDetails.cartQuantity }}</p>
                  <button @click="incrementQuantity" class="quantity-button">
                    +
                  </button>
                </div>
                <div class="rating">
                  <div class="d-flex align-center justify-center">
                    <p>{{ selectedProductDetails.rating }}</p>
                    <v-rating
                      v-model="selectedProductDetails.rating"
                      class="ma-2"
                      density="compact"
                      half-increments
                    ></v-rating>
                  </div>
                </div>
              </div>
              <v-btn
                class="add-to-cart-btn mt-4"
                width="100%"
                @click="addToCart"
              >
                Add to Cart
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { API_call } from "../utils/auth";
import { cartProduct } from "../utils/interface";
import { localStorageHelper } from "../utils/localStorageHelper";
const token = JSON.parse(localStorage.getItem("token") as string);
const productData = ref([] as cartProduct[]);
const viewCard = ref(false);
const selectedProductDetails = ref({} as cartProduct);
const cart_data = ref(localStorageHelper.get("add-cart") || []);
const search = ref("");
const isLoading = ref(false);

async function getData() {
  isLoading.value = true;

  try {
    const { request } = API_call();
    const response = await request.get("/product", {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    productData.value = await response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}

function showProductDetails(product: cartProduct) {
  if (cart_data.value.some((v: cartProduct) => v._id == product._id)) {
    let obj = cart_data.value.find(
      (obj: cartProduct) => obj._id == product._id
    );
    selectedProductDetails.value = { ...obj };
  } else {
    product["cartQuantity"] = 1;
    selectedProductDetails.value = product;
  }
  viewCard.value = true;
}
function addToCart() {
  const index = cart_data.value.findIndex(
    (obj: cartProduct) => obj._id == selectedProductDetails.value._id
  );
  if (index === -1) {
    selectedProductDetails.value.cartQuantity = 1;
    cart_data.value.push(selectedProductDetails.value);
  }
  router.push("/cart");
  localStorageHelper.set("add-cart", cart_data.value);
}
function decrementQuantity() {
  const index = cart_data.value.findIndex(
    (obj: cartProduct) => obj._id == selectedProductDetails.value._id
  );
  if (index !== -1) {
    const cart = cart_data.value[index];
    if (cart.cartQuantity > 1) {
      cart.cartQuantity = --selectedProductDetails.value.cartQuantity;
    }
  } else if (selectedProductDetails.value.cartQuantity >= 1) {
    selectedProductDetails.value.cartQuantity = 1;
    cart_data.value.push(selectedProductDetails.value);
  }
}
function incrementQuantity() {
  const index = cart_data.value.findIndex(
    (obj: cartProduct) => obj._id == selectedProductDetails.value._id
  );
  if (index !== -1) {
    cart_data.value[index].cartQuantity = ++selectedProductDetails.value
      .cartQuantity;
  } else {
    selectedProductDetails.value.cartQuantity = 1;
    cart_data.value.push(selectedProductDetails.value);
  }
}
function filterProductDataByTitle() {
  return productData.value.filter((data) => {
    return data.title.toLowerCase().includes(search.value.toLowerCase());
  });
}
function logOut() {
  router.push("/login");
  localStorage.removeItem("token");
}
getData();
</script>
<style scoped>
.img {
  height: 200px;
  object-fit: contain;
  width: 200px;
}

.btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
}

.cards {
  position: relative;
  overflow: hidden;
}

.cards:hover > .btn {
  opacity: 1;
  background: #ec860a;
  transform: translateY(-10px);
}

.cards:hover > .btn:hover {
  background: #ec860ad7;
}
.number-field {
  width: 80px;
}
.homePage {
  background-color: black;
  color: #fff;
}
.nav-bar {
  background-color: #ec860a;
}

.search {
  width: 500px;
}
.product-dialog {
  max-width: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.product-dialog:hover {
  transform: scale(1.02);
}
.rating {
  color: #ffc107; /* Star color */
  font-size: 18px;
}
.product-image {
  height: 400px;
  object-fit: cover;
  width: 300px;
  border-radius: 8px;
  margin-right: 20px;
}

.product-details {
  width: 100%;
}

.product-title {
  color: #333;
  font-weight: bold;
}

.product-description {
  color: #555;
}

.product-price {
  color: #ec860a;
  font-size: 18px;
}

.product-sizes {
  margin-top: -8px;
}

.quantity-control {
  margin-top: 10px;
}

.quantity-button {
  background-color: #ec860a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  margin: 0 4px;
  transition: background-color 0.3s ease;
}

.quantity-button:hover {
  background-color: #d16b00;
}

.add-to-cart-btn {
  background-color: #ec860a;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #d16b00;
}
</style>