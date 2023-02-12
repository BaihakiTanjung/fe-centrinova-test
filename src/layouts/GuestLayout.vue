<script setup lang="ts">
import FooterLayouts from "@/components/layouts/FooterLayouts.vue";
import NavbarLayouts from "@/components/layouts/NavbarLayouts.vue";
</script>

<template>
  <!-- Navbar -->

  <NavbarLayouts />

  <!-- End Navbar -->

  <RouterView />

  <!-- Footer -->

  <FooterLayouts />

  <!-- End Footer -->
</template>
