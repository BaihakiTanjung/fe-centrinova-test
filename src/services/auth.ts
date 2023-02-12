import Api from "@/utils/api.js";

class AuthServices {
  async postLogin({ request } = { request: {} }) {
    const res = await Api.doPost(`auth`, request);
    console.debug("POST LOGIN FETCH", res);
    return res;
  }

  async postRefreshToken({ request } = { request: {} }) {
    const res = await Api.doGet(`auth/request-jwt`);
    console.debug("POST REFRESH TOKEN FETCH", res);
    return res;
  }

  async getProfile() {
    const res = await Api.doGet(`user/profile`);
    console.debug("GET PROFILE FETCH", res);
    return res;
  }

  async putUpdateProfile({ request } = { request: {} }) {
    const res = await Api.doPatch(`user/profile`, request);
    console.debug("UPDATE PROFILE FETCH", res);
    return res;
  }
}

export default new AuthServices();
