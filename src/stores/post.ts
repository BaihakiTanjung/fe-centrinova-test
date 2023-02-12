import { ref, computed } from "vue";
import { defineStore } from "pinia";
import PostServices from "../services/post";
import { useRoute } from "vue-router";
import { showFailedPopup, showSuccessPopup } from "../utils/popup";

export const usePostStore = defineStore("post", () => {
  const route = useRoute();
  const posts = ref([]);
  const post = ref({});

  const getPosts = computed(() => posts.value);
  const getPost = computed(() => post.value);

  function setPosts(value = []) {
    posts.value = value;
  }

  function setPost(value = {}) {
    post.value = value;
  }

  async function fetchPosts(query: any) {
    try {
      const response = await PostServices.getList({ query });
      setPosts(response);
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function fetchPost(id: any) {
    try {
      const response = await PostServices.getDetail({ id });
      setPost(response);
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function createPost(request: any) {
    try {
      const formData = new FormData();
      formData.append("title", request.title);
      formData.append("short_text", request.shortText);
      formData.append("content", request.content);
      formData.append("post_date", request.postDate);
      formData.append("image", request.image);

      const response = await PostServices.postNewPost({ request: formData });
      const query = await route.query;
      fetchPosts(query);

      showSuccessPopup("success", "Post created successfully");
      return response;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function updatePost(id: any, request: any) {
    try {
      const formData = new FormData();
      formData.append("title", request.title);
      formData.append("short_text", request.shortText);
      formData.append("content", request.content);
      formData.append("post_date", request.postDate);
      formData.append("image", request.image);

      const response = await PostServices.putUpdatePost({
        id,
        request: formData,
      });
      const query = await route.query;
      fetchPosts(query);

      showSuccessPopup("success", "Post updated successfully");
      return response;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function deletePost(id: any) {
    try {
      const response = await PostServices.deletePost({ id });
      const query = await route.query;
      fetchPosts(query);

      showSuccessPopup("success", "Post deleted successfully");
      return response;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  return {
    getPosts,
    getPost,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
  };
});
