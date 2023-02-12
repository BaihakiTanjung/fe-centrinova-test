<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePostStore } from "@/stores/post";
import { useCommentStore } from "@/stores/comment";
import { useRouter, useRoute } from "vue-router";
import TheLoading from "@/components/TheLoading.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const postStore = usePostStore();
const commentStore = useCommentStore();
const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const page = ref(1);

const getPosts = computed(() => postStore.getPosts) as any;

const firstGetPosts = computed(() => getPosts?.value?.data?.[1] || {});

onMounted(async () => {
  isLoading.value = true;
  await postStore.fetchPosts({});
  isLoading.value = false;
});

const sliceCharacter = (text: string, length: number) => {
  return text?.slice(0, length) + "...";
};

const handleDetail = (id: number) => {
  router.push(`/detail/${id}`);
};

const countComments = async (id: number) => {
  const res = await commentStore.countComments(id);
  return res;
};

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
  <!-- Content -->
  <section class="content p-5">
    <div class="container-md mx-auto">
      <div class="h-full flex flex-col gap-3">
        <h1 class="text-2xl font-bold">Featured News</h1>
        <hr class="border-2" />
        <div v-if="!isLoading" class="featured-content">
          <div class="grid grid-cols-1">
            <div
              class="card bg-base-100 shadow-xl image-full w-full h-[25rem] cursor-pointer"
              @click="handleDetail(firstGetPosts.id)"
            >
              <figure>
                <img
                  :src="
                    firstGetPosts.image_url ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                  "
                  alt="Shoes"
                  class="w-full object-cover h-[15rem]"
                />
              </figure>
              <div class="card-body opacity-80">
                <h2 class="card-title">
                  {{ sliceCharacter(firstGetPosts.title, 50) }}
                </h2>
                <p>{{ sliceCharacter(firstGetPosts.short_text, 100) }}</p>
              </div>
            </div>
          </div>
        </div>
        <TheLoading v-else></TheLoading>
        <h1 class="text-2xl font-bold mt-5">News</h1>
        <hr class="border-2" />
        <div
          v-if="!isLoading"
          class="flex overflow-x-scroll pb-10 hide-scroll-bar"
        >
          <div class="flex flex-nowrap lg:ml-10 md:ml-10">
            <div
              v-for="post in getPosts?.data"
              :key="post.id"
              class="inline-block px-2"
            >
              <div
                class="card bg-base-100 w-[15rem] h-[24rem] overflow-hidden duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer"
                @click="handleDetail(post.id)"
              >
                <figure>
                  <img
                    :src="
                      post.image_url ||
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                    "
                    alt="Shoes"
                    class="w-full object-cover h-[15rem]"
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">
                    {{ sliceCharacter(post.title, 15) }}
                  </h2>
                  <p>{{ sliceCharacter(post.short_text, 30) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TheLoading v-else></TheLoading>
        <h1 class="text-2xl font-bold mt-5">Post</h1>
        <hr class="border-2" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="post in getPosts?.data"
            :key="post.id"
            class="inline-block px-2"
          >
            <div
              class="card bg-base-100 overflow-hidden duration-300 ease-in-out shadow-md hover:shadow-xl cursor-pointer"
              @click="handleDetail(post.id)"
            >
              <figure>
                <img
                  :src="
                    post.image_url ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                  "
                  alt="Shoes"
                  class="w-full object-cover h-[15rem]"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                  {{ sliceCharacter(post.title, 15) }}
                </h2>
                <p>{{ sliceCharacter(post.short_text, 30) }}</p>
              </div>
            </div>
          </div>
        </div>
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
  <!-- End Content -->
</template>

<style scoped></style>
