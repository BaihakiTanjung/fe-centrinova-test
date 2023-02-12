<script setup lang="ts">
import NavbarLayouts from "@/components/layouts/NavbarLayouts.vue";
</script>

<template>
  <NavbarLayouts />

  <div class="container px-5 m-3">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
