<script setup lang="ts">
import { ref } from "vue";
import { usePostStore } from "@/stores/post";

const postStore = usePostStore();

const modal = ref(false);

defineProps<{
  id: string;
}>();

const hideModal = () => {
  modal.value = false;
};

const showModal = () => {
  modal.value = true;
};

defineExpose({
  showModal,
  hideModal,
});

const handleDelete = (id: string) => {
  postStore.deletePost(id);
  hideModal();
};
</script>

<template>
  <input type="checkbox" v-model="modal" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <button
        @click="hideModal()"
        for="my-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
      >
        ✕
      </button>
      <h3 class="text-lg font-bold">Delete</h3>
      <div class="py-4">
        <div class="flex flex-col text-center gap-5 my-5">
          <p>Are you sure you want to delete this entry?</p>
          <button @click="handleDelete(id)" class="btn btn-sm btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>