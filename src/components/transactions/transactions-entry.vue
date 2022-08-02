<script setup>
// import modules
import * as yup from "yup";
// import hooks
import { ref } from "vue";
import { useStore } from "vuex";
// import constants
import { ADD_TRANSACTION } from "@/store/actions.types";

// import components
import { Field, Form, ErrorMessage } from "vee-validate";

const store = useStore();

const hasSubmitTriggered = ref(false);

// initial transaction state
const initialTransactionState = {
  title: "",
  amount: "",
};

// init transaction state
const transaction = ref({ ...initialTransactionState });

// handle transaction entry and reset form
const handleTransactionEntry = (data, { resetForm }) => {
  store.dispatch(ADD_TRANSACTION, data);
  resetForm();
};

// yup schema
const schema = yup.object({
  title: yup.string().required(),
  amount: yup.number().required(),
});
</script>

<template>
  <!-- Template to add transactions entry -->
  <div>
    <h3 class="section-heading">Add new transaction</h3>

    <Form
      class="login-form"
      @submit="handleTransactionEntry"
      :validation-schema="schema"
      autocomplete="nope"
    >
      <div class="form-field-lg mb-2">
        <label class="mb-1" for="title">Title</label>

        <Field
          v-model="transaction.title"
          class="form-control fz-16 fw-500 bg-white"
          type="text"
          name="title"
          id="title"
          label="Title"
          placeholder="Enter title..."
          autocomplete="off"
        />
        <ErrorMessage v-if="hasSubmitTriggered" name="title" />
      </div>
      <div class="form-field-lg mb-2">
        <label class="d-block" for="amount">Amount</label>
        <label class="mb-1" for="amount">
          (Negative expense, Positive income)
        </label>
        <Field
          label="Amount"
          v-model="transaction.amount"
          class="form-control fz-16 fw-500 bg-white"
          type="text"
          name="amount"
          id="amount"
          placeholder="Enter amount..."
          autocomplete="off"
        />
        <ErrorMessage v-if="hasSubmitTriggered" name="amount" />
      </div>

      <div class="transaction-footer">
        <div class="d-flex justify-content-center mb-2">
          <button
            type="submit"
            @click="hasSubmitTriggered = true"
            class="btn modal-btn btn-primary w-100"
          >
            Add transaction
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>
