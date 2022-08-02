<script setup>
// import modules
import * as yup from "yup";
// import hooks
import { computed, reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
// import components
import { Field, Form, ErrorMessage } from "vee-validate";
// import constants
import { LOGIN, SHOW_TOAST } from "@/store/actions.types";
// import logo image
import logo from "@/assets/images/logo.png";

// FontAwesome icon init
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
library.add(faUser);
// FontAwesome icon init end

// init hooks
const store = useStore();
const router = useRouter();
const user = reactive({ username: "test", password: "test1234" });
// local state
let passwordHandle = ref({
  type: "password",
  text: "Show",
});
let hasSubmitTriggered = ref(false);
const isAuth = computed(() => store.getters.isAuthenticated);

// watch and handle on auth event
watch(isAuth, (isAuth, previsAuth) => {
  if (isAuth) {
    store.dispatch(SHOW_TOAST, {
      duration: 5,
      toastHeading: "Welcome",
      toastCopy: "you are now logged in",
      icon: "fa-solid fa-user",
      inverse: true,
    });
    router.replace("/transactions");
  }
});

// handle form submit
const onSubmit = () => {
  store.dispatch(LOGIN, user);
};

// handle password toggle
const togglePassword = () => {
  if (passwordHandle.value.type == "password") {
    passwordHandle.value.type = "text";
    passwordHandle.value.text = "Hide";
  } else {
    passwordHandle.value.type = "password";
    passwordHandle.value.text = "Show";
  }
};
// init yup schema
const schema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
});
</script>

<template>
  <!-- Login page template -->
  <div class="container-fluid">
    <div class="d-flex vh-100 align-items-center justify-content-center">
      <div class="login-page mx-auto">
        <div class="text-center mb-4 pb-4">
          <img class="logo" :src="logo" alt="The Fertility Partners" />
        </div>
        <h1 class="heading mb-4">Log In</h1>
        <Form
          class="login-form"
          @submit="onSubmit"
          :validation-schema="schema"
          autocomplete="nope"
        >
          <div class="form-field mb-3">
            <Field
              type="text"
              v-model="user.username"
              class="form-control"
              name="username"
              placeholder="Username"
              autocomplete="off"
            />
            <ErrorMessage v-if="hasSubmitTriggered" name="username" />
          </div>
          <div class="form-field mb-3 position-relative">
            <Field
              :type="passwordHandle.type"
              v-model="user.password"
              class="form-control"
              name="password"
              placeholder="Password"
              autocomplete="off"
            />
            <ErrorMessage v-if="hasSubmitTriggered" name="password" />
            <span class="show-password" @click.prevent="togglePassword">{{
              passwordHandle.text
            }}</span>
          </div>
          <button
            @click="hasSubmitTriggered = true"
            class="btn btn-primary w-100 login-submit"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/login.scss";
.logo {
  width: 180px;
}
.heading {
  font-size: 20px;
}
</style>
