<script setup>
// import hooks
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
// import constants
import { REMOVE_TRANSACTION } from "@/store/actions.types";
import { EXPENSE } from "@/helpers/transactions.types";

// FontAwesome icon init
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleXmark);
// FontAwesome icon init end

const store = useStore();

const transactions = computed(() => store.getters.transactions);

// handle remove transaction
const removeTransaction = (id) => {
  store.dispatch(REMOVE_TRANSACTION, id);
};
</script>

<template>
  <!-- Template to show transactions history -->

  <div class="mb-4">
    <h3 class="section-heading">History</h3>
    <ul class="history-list">
      <li
        v-for="(transaction, idx) in transactions"
        :key="idx"
        class="card justify-content-between flex-row shadow-sm"
      >
        <div class="left">{{ transaction.title }}</div>
        <div
          class="right"
          :class="[transaction.type === EXPENSE ? 'expense' : 'income']"
        >
          {{ transaction.type === EXPENSE ? "-" : "+" }}{{ transaction.amount }}
          <span @click="(e) => removeTransaction(transaction.id)">
            <font-awesome-icon
              icon="fa-solid fa-circle-xmark"
              class="text-red ml-3"
            />
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/variables";
.history-list {
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  li {
    :not(:last-child) {
      margin-bottom: 8px;
    }
    > div {
      padding: 8px 12px;
      &.right {
        border-right: 6px solid $red;

        &.income {
          border-color: $green;
        }
      }
    }
  }
}
</style>