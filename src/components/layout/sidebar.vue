<script setup>
// Import hooks
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import const
import { LOGOUT } from "@/store/actions.types";
// FontAwesome Icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowRightFromBracket);
// FontAwesome Icon End

// Logo
import logo from "@/assets/images/logo.png";

// Hooks
const store = useStore();
const router = useRouter();
// handle logiout
const logoutHandler = () => {
  store.dispatch(LOGOUT).then((response) => {
    if (response) {
      router.push("/");
    }
  });
};
</script>

<template>
  <!-- Side bar template -->

  <div
    id="sidebar"
    class="sidebar vh-100 d-flex flex-column justify-content-between"
  >
    <div class="text-center my-4">
      <img class="logo" :src="logo" alt="The Fertility Partners" />
    </div>
    <ul>
      <li>
        <a href="" @click.prevent="logoutHandler">
          <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
          <span class="logout-title ms-3">Logout</span>
        </a>
      </li>
    </ul>
  </div>
</template>
