<script setup lang="ts">
import { usePostStore } from "@/stores/post";
import { useCommentStore } from "@/stores/comment";
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import TheLoading from "@/components/TheLoading.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const postStore = usePostStore();
const commentStore = useCommentStore();
const route = useRoute();

const getPost = computed(() => postStore.getPost) as any;
const getComments = computed(() => commentStore.getComments) as any;
const isLoading = ref(true);
const page = ref(1);

onMounted(async () => {
  isLoading.value = true;
  await postStore.fetchPost(route.params.slug);
  await commentStore.fetchComments(route.params.slug, {});
  isLoading.value = false;
});

const formComment = {
  name: "",
  comment: "",
};

const handleComment = async () => {
  await commentStore.createComment(route.params.slug, formComment);
  formComment.name = "";
  formComment.comment = "";
};

// convert date to indonesia format
const convertDate = (date: string) => {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return `${day} ${month} ${year} ${hours}:${minutes} `;
};

const updateHandler = async (page: number) => {
  commentStore.fetchComments(route.params.slug, { page });
};
</script>

<template>
  <section class="detail">
    <div class="container my-5 md:px-32 px-5">
      <div v-if="!isLoading" class="card bg-base-100 p-10">
        <!-- back -->
        <img
          src="@/assets/icon/back.svg"
          width="30"
          alt=""
          class="absolute cursor-pointer"
          srcset=""
          @click="$router.go(-1)"
        />
        <div class="flex justify-center">
          <h1 class="text-center text-xl font-bold">
            {{ getPost.title }}
          </h1>
        </div>
        <div class="flex justify-center align-middle mt-5">
          <img
            :src="
              getPost.image_url ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
            "
            class="w-full h-[500px] object-cover"
            alt="Shoes"
          />
        </div>
        <p class="mt-3 text-justify">
          {{ getPost.content }}
        </p>
      </div>
      <TheLoading v-else />
      <h1 class="mt-3 font-bold text-xl">Comment</h1>
      <form @submit.prevent="handleComment">
        <div class="flex flex-col gap-3 mt-1">
          <input
            v-model="formComment.name"
            type="text"
            placeholder="Name"
            class="input w-full"
            required
          />
          <textarea
            v-model="formComment.comment"
            class="textarea"
            placeholder="Comment"
            required
          ></textarea>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <hr class="my-3" />
      <div v-if="!isLoading">
        <div class="card bg-base-100">
          <div
            v-for="list in getComments?.data"
            :key="list.id"
            class="flex justify-between m-5"
          >
            <div class="avatar my-auto">
              <div class="w-12 rounded-full">
                <img
                  src="https://dev-sample-api.e-learning.co.id/api/file/9a74a4c79167fbbdfba681b202000160"
                />
              </div>
              <h3 class="align-middle justify-center my-auto ml-3">
                {{ list.name }}
              </h3>
            </div>

            <div class="my-auto w-1/2 text-right">
              <div>
                {{ list.comment }}
              </div>
              <span class="text-xs text-gray-400">
                {{ convertDate(list.created_at) }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex justify-center my-5">
          <v-pagination
            v-model="page"
            :pages="getComments?.last_page"
            :range-size="1"
            active-color="#DCEDFF"
            @update:modelValue="updateHandler(page)"
          />
        </div>
      </div>
      <TheLoading v-else />
    </div>
  </section>
</template>

<style scoped></style>
