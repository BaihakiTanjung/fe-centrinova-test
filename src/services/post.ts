import Api from "@/utils/api.js";

class PostServices {
  async getList({ query } = { query: {} }) {
    const res = await Api.doGet(
      `posts?${new URLSearchParams(query || "").toString()}`
    );
    console.debug("GET LIST FETCH", res);
    return res;
  }

  async getDetail({ id } = { id: "" }) {
    const res = await Api.doGet(`post/${id}`);
    console.debug("GET DETAIL FETCH", res);
    return res;
  }

  async postNewPost({ request } = { request: {} }) {
    const res = await Api.doPostMultipart(`post`, request);
    console.debug("POST NEW POST FETCH", res);
    return res;
  }

  async putUpdatePost({ id, request } = { id: "", request: {} }) {
    const res = await Api.doPost(`post/${id}`, request);
    console.debug("PUT UPDATE POST FETCH", res);
    return res;
  }

  async deletePost({ id } = { id: "" }) {
    const res = await Api.doDelete(`post/${id}`);
    console.debug("DELETE POST FETCH", res);
    return res;
  }
}

export default new PostServices();
