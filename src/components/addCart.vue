<template>
  <div class="cart-container">
    <div v-if="cart_data.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>
    <div v-else>
      <div class="cart-item" v-for="(cart, index) in cart_data" :key="index">
        <div class="d-flex align-start cart-container">
          <div class="img-container">
            <img class="img" :src="`${cart.images}`" alt="" />
          </div>
          <div class="item-details d-flex justify-space-between align-end">
            <div>
              <p class="mt-4">{{ cart.title }}</p>
              <p class="mt-2">{{ cart.description }}</p>
              <h4 class="mt-2">${{ cart.price.toFixed(2) }}</h4>
              <div class="d-flex mt-16">
                <button @click="decrementQuantity(index)" class="delete-button">
                  -
                </button>
                <p class="mx-2">{{ cart.cartQuantity }}</p>
                <button @click="incrementQuantity(index)" class="delete-button">
                  +
                </button>
              </div>
            </div>
            <div class="d-flex">
              <button @click="deleted(index)" class="delete-button ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total-section d-flex align-center justify-space-between">
      <v-icon @click="router.push('/home')">mdi-arrow-left-thin</v-icon>
      <p>Total: ${{ total.toFixed(2) }}</p>
    </div>
  </div>
</template>
  <script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { cartProduct } from "../utils/interface";
import { localStorageHelper } from "../utils/localStorageHelper";
const cart_data = ref(localStorageHelper.get("add-cart") || []);
const total = ref(0);
for (let cart of cart_data.value) {
  total.value += cart.price * cart.cartQuantity;
}
function deleted(i: number) {
  const deletedItem = cart_data.value[i];
  total.value -= deletedItem.price * deletedItem.cartQuantity;
  cart_data.value.splice(i, 1);
  localStorageHelper.set("add-cart", cart_data.value);
}
function incrementQuantity(index: number) {
  const cart = cart_data.value[index];
  cart.cartQuantity++;
  localStorageHelper.set("add-cart", cart_data.value);
  updateTotal();
}

function decrementQuantity(index: number) {
  const cart = cart_data.value[index];
  if (cart.cartQuantity > 1) {
    cart.cartQuantity--;
    localStorageHelper.set("add-cart", cart_data.value);
    updateTotal();
  }
}
function updateTotal() {
  total.value = cart_data.value.reduce(
    (acc: number, cart: cartProduct) => acc + cart.price * cart.cartQuantity,
    0
  );
}
</script>
  <style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.empty-cart-message {
  text-align: center;
  font-size: 18px;
  color: #888;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.cart-container {
  width: 100%;
}
/* .cart-item:hover {
    transform: translateX(-5px);
      transform: scale(1.1);

  } 
  .img {
  height: 150px;
  object-fit: contain;
  width: 150px;
  border-radius: 5px;
  margin-right: 20px;
}
  */

.item-details {
  flex-grow: 1;
  width: 100%;
}

.d-flex {
  display: flex;
  align-items: center;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.delete-button:hover {
  background-color: #c82333;
}

.total-section {
  margin-top: 30px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.img {
  height: auto;
  display: block;
  object-fit: contain;
  margin-right: 20px;
  width: 150px;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
}
</style>