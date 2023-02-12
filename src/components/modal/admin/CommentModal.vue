<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useCommentStore } from "@/stores/comment";
import { useAuthStore } from "@/stores/auth";

const commentStore = useCommentStore();
const authStore = useAuthStore();
const modal = ref(false);

const props = defineProps<{
  id: string;
}>();

watch(
  () => props.id,
  (newVal: any) => {
    commentStore.fetchComments(newVal, {});
  }
);

const getComments = computed(() => commentStore.getComments) as any;
const getUser = computed(() => authStore.getUser) as any;

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
  commentStore.deleteComment(id, props.id);
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
      <h3 class="text-lg font-bold">Comment</h3>
      <div class="py-4">
        <div class="overflow-x-auto">
          <table class="table w-full">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="comment in getComments?.data" :key="comment.id">
                <th>{{ comment.id }}</th>
                <td>{{ comment.comment }}</td>
                <td>
                  <button
                    @click="handleDelete(comment.id)"
                    class="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
