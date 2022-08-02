<script setup>
// import components
import Sidebar from "./sidebar.vue";
</script>

<template>
  <!-- This is the default layout for each page -->
  <div class="app-wrapper d-flex">
    <Sidebar />
    <div class="container-fluid main min-vh-100">
      <router-view></router-view>
    </div>
  </div>
</template>
