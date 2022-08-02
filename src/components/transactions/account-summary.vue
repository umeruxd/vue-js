<script setup>
// import hooks
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
const store = useStore();

// local state from store
const accountSummary = computed(() => store.getters.summary);
</script>

<template>
  <!-- Template to show transactions summary -->
  <div class="mb-4">
    <div class="balance">
      <h3 class="balance-heading text-uppercase">Your Balance</h3>
      <h1 class="balance-amount" v-if="accountSummary.balance">
        Rs. {{ accountSummary.balance.toFixed(2) }}
      </h1>
    </div>
    <ul
      class="
        income-expense
        card
        shadow-sm
        align-items-center
        justify-content-center
        flex-row
        text-center
      "
    >
      <li v-if="accountSummary.income">
        <h4 class="text-uppercase">Income</h4>
        <p class="my-0 text-green">{{ accountSummary.income.toFixed(2) }}</p>
      </li>
      <li v-if="accountSummary.expense">
        <h4 class="text-uppercase">Expense</h4>
        <p class="my-0 text-red">{{ accountSummary.expense.toFixed(2) }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/variables";

.income-expense {
  list-style: none;
  padding: 0;
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  li {
    padding: 0 30px;
    margin: 16px 0;
    &:first-child {
      border-right: 1px solid rgba($gray, 0.2);
    }
  }
  p {
    font-size: 18px;
    font-weight: 600;
  }
}
.balance-heading {
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 700;
}
</style>