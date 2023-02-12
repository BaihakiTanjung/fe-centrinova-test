import { ref, computed } from "vue";
import { defineStore } from "pinia";
import AuthServices from "../services/auth";
import Cookies from "js-cookie";
import { showFailedPopup, showSuccessPopup } from "@/utils/popup.js";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(
    Cookies.get("auth.user") ? JSON.parse(Cookies.get("auth.user") || "") : {}
  );
  const isLogged = ref(Cookies.get("auth.token") ? true : false);

  const isLoggedIn = computed(() => isLogged.value);
  const getUser = computed(() => user.value);

  async function login(request: any) {
    try {
      const response = await AuthServices.postLogin({ request });
      isLogged.value = true;
      Cookies.set("auth.token", response?.jwt, { expires: 1 });
      Cookies.set("auth.refreshToken", response?.refreshToken, { expires: 1 });

      if (response?.jwt) {
        setTimeout(() => {
          profile();
        }, 1000);
      }

      showSuccessPopup("success", "Login successfully");

      return response;
    } catch (error) {
      showFailedPopup("error", "Invalid credentials");
    }
  }

  async function profile() {
    try {
      const response = await AuthServices.getProfile();
      user.value = response;
      Cookies.set("auth.user", JSON.stringify(response), { expires: 1 });
    } catch (error) {
      showFailedPopup("error", "Invalid credentials");
    }
  }

  async function updateProfile(request: any) {
    try {
      const response = await AuthServices.putUpdateProfile({ request });
      user.value = response;
      Cookies.set("auth.user", JSON.stringify(response), { expires: 1 });

      showSuccessPopup("success", "Profile updated successfully");
    } catch (error: any) {
      showFailedPopup("error", error?.message || "Something went wrong");
    }
  }

  function logout() {
    isLogged.value = false;
    Cookies.remove("auth.token");
    Cookies.remove("auth.refreshToken");
    Cookies.remove("auth.user");
  }

  return { getUser, isLoggedIn, login, logout, updateProfile, profile };
});
