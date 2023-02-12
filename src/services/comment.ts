import Api from "@/utils/api.js";

class CommentServices {
  async getPostComments({ postId, query } = { postId: "", query: {} }) {
    const res = await Api.doGet(
      `post/${postId}/comments?${new URLSearchParams(query || "").toString()}`
    );
    console.debug("GET POST COMMENTS FETCH", res);
    return res;
  }

  async postNewComment({ postId, request } = { postId: "", request: {} }) {
    const res = await Api.doPost(`post/${postId}/comments`, request);
    console.debug("POST NEW COMMENT FETCH", res);
    return res;
  }

  async deleteComment({ id } = { id: "" }) {
    const res = await Api.doDelete(`post/comment/${id}`);
    console.debug("DELETE COMMENT FETCH", res);
    return res;
  }
}

export default new CommentServices();
