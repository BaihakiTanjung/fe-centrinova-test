<script setup lang="ts">
import AddModal from "@/components/modal/admin/AddModal.vue";
import EditModal from "@/components/modal/admin/EditModal.vue";
import DeleteModal from "@/components/modal/admin/DeleteModal.vue";
import CommentModal from "@/components/modal/admin/CommentModal.vue";
import { usePostStore } from "@/stores/post";
import { onMounted, ref, computed } from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useRouter, useRoute } from "vue-router";

const postStore = usePostStore();
const router = useRouter();
const route = useRoute();

const idPost = ref("");
const dataPost = ref(null) as any;

const page = ref(1);

// Modal
const addModalRef = ref<InstanceType<typeof AddModal> | null>(null);

const handleModalAdd = () => {
  addModalRef.value?.showModal();
};

const editModalRef = ref<InstanceType<typeof EditModal> | null>(null);

const handleModalEdit = (id: string, data: any) => {
  editModalRef?.value?.showModal();
  idPost.value = id;
  dataPost.value = data;
};

const deleteModalRef = ref<InstanceType<typeof DeleteModal> | null>(null);

const handleModalDelete = (id: any) => {
  deleteModalRef.value?.showModal();
  idPost.value = id;
};

const commentModalRef = ref<InstanceType<typeof CommentModal> | null>(null);

const handleModalComment = (id: any) => {
  commentModalRef.value?.showModal();
  idPost.value = id;
};

const getPosts = computed(() => postStore.getPosts) as any;

onMounted(async () => {
  const query = (await route.query) as any;
  page.value = parseInt(query?.page) || 1;
  postStore.fetchPosts(query);
});

const updateHandler = async (page: number) => {
  await router.push({
    query: {
      page,
    },
  });

  const query = await route.query;

  postStore.fetchPosts(query);
};
</script>

<template>
  <!-- Modal -->
  <EditModal :id="idPost" :data="dataPost" ref="editModalRef" />
  <DeleteModal :id="idPost" ref="deleteModalRef" />
  <CommentModal :id="idPost" ref="commentModalRef" />
  <AddModal ref="addModalRef" />
  <!-- End Modal -->

  <section class="home">
    <div class="card bg-base-100 shadow-xl p-5 my-5">
      <div class="flex justify-between">
        <h1 class="text-xl font-bold">List Entries</h1>
        <button
          for="my-modal"
          @click="handleModalAdd"
          class="btn btn-primary btn-sm"
        >
          Add
        </button>
      </div>
      <div class="overflow-x-auto m-3">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="post in getPosts?.data" :key="post.id">
              <th>{{ post.id }}</th>
              <td>{{ post.title }}</td>
              <td class="flex gap-3">
                <button
                  for="edit-modal"
                  @click="handleModalEdit(post.id, post)"
                  class="btn btn-warning btn-sm"
                >
                  Edit
                </button>
                <button
                  @click="handleModalDelete(post.id)"
                  for="my-modal-3"
                  class="btn btn-error btn-sm"
                >
                  Delete
                </button>
                <button @click="handleModalComment(post.id)" class="btn btn-sm">
                  Comment
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-center my-5">
          <v-pagination
            v-model="page"
            :pages="getPosts?.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="updateHandler(page)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
