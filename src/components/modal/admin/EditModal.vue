<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { usePostStore } from "@/stores/post";

const postStore = usePostStore();

const modal = ref(false);

const hideModal = () => {
  modal.value = false;
};

const showModal = () => {
  modal.value = true;
};

const props = defineProps<{
  id: string;
  data: {
    title: string;
    shortText: string;
    content: string;
    image: string;
  };
}>();

const form = reactive({
  title: "",
  shortText: "",
  content: "test",
  postDate: "",
  image: "",
});

const currentImage = ref("");

watch(
  () => props.data,
  (newVal: any) => {
    form.title = newVal.title;
    form.shortText = newVal.short_text;
    form.content = newVal.content;
    form.postDate = newVal.post_date;
    form.image = newVal.image;
    currentImage.value = newVal.image_url;
  }
);

defineExpose({
  showModal,
  hideModal,
});

const handleFileChange = (e: any) => {
  const file = e.target.files[0];
  form.image = file;
};

const handleSubmit = () => {
  postStore.updatePost(props.id, form);
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
      <h3 class="text-lg font-bold">Edit</h3>
      <div class="py-4">
        <form @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col">
              <label for="title">Title</label>
              <input
                type="text"
                v-model="form.title"
                id="title"
                class="input input-bordered"
                placeholder="Title"
              />
            </div>
            <div class="flex flex-col">
              <label for="title">Short Text</label>
              <input
                type="text"
                v-model="form.shortText"
                id="title"
                class="input input-bordered"
                placeholder="Short Text"
              />
            </div>
            <div class="flex flex-col">
              <label for="title">Content</label>
              <QuillEditor
                contentType="text"
                v-model:content="form.content"
              ></QuillEditor>
            </div>
            <div class="flex flex-col">
              <label for="title">Post Date</label>
              <input
                type="date"
                v-model="form.postDate"
                id="title"
                class="input input-bordered"
                placeholder="Post Date"
              />
            </div>
            <div class="flex flex-col">
              <label for="title">Current Image</label>
              <img :src="currentImage" class="w-32 h-32" />
            </div>
            <div class="flex flex-col">
              <input
                type="file"
                @change="handleFileChange"
                class="file-input file-input-ghost w-full max-w-xs"
              />
            </div>
            <button class="btn btn-sm btn-primary">Edit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>