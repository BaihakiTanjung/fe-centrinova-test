import { ref, computed } from "vue";
import { defineStore } from "pinia";
import CommentServices from "../services/comment";
import { showFailedPopup, showSuccessPopup } from "../utils/popup";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([]);
  const isLoading = ref(true);

  const getComments = computed(() => comments.value);

  function setComments(value = []) {
    comments.value = value;
  }

  async function fetchComments(postId: any, query: any) {
    try {
      isLoading.value = true;
      const response = await CommentServices.getPostComments({ postId, query });
      isLoading.value = false;
      setComments(response);

      return response;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function createComment(id: any, request: any) {
    try {
      const response = await CommentServices.postNewComment({
        postId: id,
        request,
      });
      fetchComments(id, {});

      showSuccessPopup("success", "Comment created successfully");
      return response;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function deleteComment(id: any, postId: any) {
    try {
      const response = await CommentServices.deleteComment({
        id,
      });
      fetchComments(postId, {});

      showSuccessPopup("success", "Comment deleted successfully");
      return response;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  async function countComments(postId: any) {
    try {
      const response = await fetchComments(postId, {});
      return response?.data?.length;
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  return {
    getComments,
    fetchComments,
    createComment,
    deleteComment,
    countComments,
    isLoading,
  };
});
