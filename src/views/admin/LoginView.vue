<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "test@gmail.com",
  password: "12345678",
});

const handleLogin = async () => {
  await authStore.login(form).then(() => {
    router.push("/admin");
  });
};
</script>

<template>
  <section class="login">
    <div class="grid place-items-center h-screen">
      <div class="card w-96 bg-base-100 shadow-xl">
        <form @submit.prevent="handleLogin">
          <div class="card-body">
            <h2 class="text-2xl font-bold text-center">Login</h2>
            <div class="my-3">
              <input
                type="text"
                placeholder="Email"
                class="input w-full input-bordered"
                v-model="form.email"
                required
              />
              <input
                required
                type="password"
                placeholder="Password "
                class="input w-full input-bordered mt-3"
                v-model="form.password"
              />
            </div>
            <div class="card-actions">
              <button class="btn btn-primary w-full">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
