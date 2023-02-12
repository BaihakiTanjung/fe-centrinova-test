<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { computed, reactive } from "vue";

const authStore = useAuthStore();

const getUser = computed(() => authStore.getUser);

const form = reactive({
  name: getUser.value.name,
  email: getUser.value.email,
  password: "",
});

const handleEdit = async () => {
  await authStore.updateProfile(form);
};
</script>

<template>
  <section class="profile">
    <div class="grid h-screen justify-center text-center">
      <div class="flex flex-col gap-5">
        <div>
          <div class="avatar my-auto">
            <div class="w-64 rounded-full">
              <img
                src="https://dev-sample-api.e-learning.co.id/api/file/9a74a4c79167fbbdfba681b202000160"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="">Nama</label>
          <input v-model="form.name" type="text" class="input" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="">Email</label>
          <input type="text" v-model="form.email" class="input" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="">Password</label>
          <input type="text" v-model="form.password" class="input" />
        </div>
        <button @click="handleEdit" class="btn btn-primary">
          Edit Profile
        </button>
      </div>
    </div>
  </section>
</template>
