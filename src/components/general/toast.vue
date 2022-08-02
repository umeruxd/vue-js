<template>
  <div
    class="toast-container position-fixed p-3 top-0 end-0"
    id="toast"
    ref="toast"
  >
    <div
      class="toast show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body d-flex justify-content-between align-items-center">
        <div class="toast-body-text">
          <div class="fw-bold">{{ toastData.toastHeading }}</div>
          <span class="toast-copy">{{ toastData.toastCopy }}</span>
        </div>
        <div
          class="toast-body-icon"
          :class="`bg-${toastData.color || 'purple'}`"
        >
          <font-awesome-icon
            :icon="toastData.icon"
            :inverse="toastData.inverse"
          />
        </div>
      </div>
      <div class="toast-footer d-flex justify-content-end">
        <span
          class="toast-close cursor-pointer"
          @click="triggerClose"
          data-bs-dismiss="toast"
          aria-label="Close"
          >{{ toastData.closeText ? toastData.closeText : "Close" }}</span
        >
        <span
          v-if="toastData.callback"
          @click="toastData.callback()"
          class="toast-action"
          aria-label="other"
          >{{
            toastData.callbackText ? toastData.callbackText : "Action"
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import defaultIcon from "@/assets/images/time.svg";
import { mapGetters } from "vuex";
import { HIDE_TOAST } from "@/store/actions.types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },
  data: () => ({
    defaultIcon: defaultIcon,
  }),
  computed: {
    ...mapGetters(["toastData", "showToast"]),
  },
  mounted() {},
  methods: {
    triggerClose() {
      this.$store.dispatch(HIDE_TOAST);
      this.$emit("", false);
    },
  },
};
</script>
<style lang="scss">
.toast-container {
  z-index: 9999999;
  .toast {
    border-radius: 10px;
    overflow: hidden;
    background-color: #f6f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &-body {
      padding: 18px;
      background: #fff;
      &-text {
        font-size: 18px;
        .toast-copy {
          font-size: 14px;
          line-height: 1.2;
          display: block;
        }
      }
      &-icon {
        // background: #9C88FF;
        border-radius: 10px;
        width: 40px;
        height: 40px;
        justify-content: center;
        display: flex;
        align-items: center;
      }
    }
    &-footer {
      padding: 0.5rem 1rem;
      > * {
        margin-left: 1rem;
        font-size: 12px;
        font-weight: 300;
      }
      .toast-action {
        font-weight: 400;
      }
    }
  }
}
</style>
