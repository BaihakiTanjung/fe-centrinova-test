<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();

const router = useRouter();

const isLoggedIn = computed(() => authStore.isLoggedIn);

const handleLogout = async () => {
  await authStore.logout();

  router.push("/");
};
</script>

<template>
  <section class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a @click="$router.push('/')">Post</a></li>
          <li><a @click="$router.push('/admin')">Home</a></li>
          <li><a @click="$router.push('/admin/profile')">Profile</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-end">
      <button
        v-if="!isLoggedIn"
        @click="$router.push('/login')"
        class="btn btn-ghost btn-circle"
      >
        <div class="indicator">
          <img class="h-8 w-8" src="@/assets/icon/user.svg" alt="" srcset="" />
        </div>
      </button>
      <button v-else @click="handleLogout" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <img
            class="h-8 w-8"
            src="@/assets/icon/logout.svg"
            alt=""
            srcset=""
          />
        </div>
      </button>
    </div>
  </section>
</template>
