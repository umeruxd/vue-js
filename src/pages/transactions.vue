<script setup>
// import components
import AccountSummary from "@/components/transactions/account-summary.vue";
import TransactionsHistory from "@/components/transactions/transactions-history.vue";
import TransactionsEntry from "@/components/transactions/transactions-entry.vue";
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex align-items-center justify-content-center">
      <div class="transactions-section card px-4 py-4 bg-light-gray mx-auto">
        <h1 class="heading mb-5 text-center">Daily Expense Tracker</h1>
        <account-summary />
        <transactions-history />
        <transactions-entry />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.transactions-section {
  width: 480px;
  max-width: 90%;
}
</style>