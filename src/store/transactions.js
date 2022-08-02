// import constants
import { ADD_TRANSACTION, REMOVE_TRANSACTION, SHOW_TOAST } from './actions.types';
import { SET_ACCOUNT_SUMMARY, SET_TRANSACTIONS } from './mutations.types';
import { EXPENSE, INCOME } from '../helpers/transactions.types';

// FontAwesome icon init
import { library } from '@fortawesome/fontawesome-svg-core'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
library.add(faListCheck, faBan)
// FontAwesome icon end

// initial summary object
const initialSummary = {
	income: 0,
	expense: 0,
	balance: 0
}
const Transactions = {
	namespaced: false,
	state: () => ({
		transactions: [],
		summary: {
			...initialSummary,
		}
	}),

	getters: {
		transactions: (state) => state.transactions,
		summary: (state) => state.summary,
	},

	mutations: {
		// set account summary on page load and manipulation in transactions
		[SET_ACCOUNT_SUMMARY](state, transactions) {
			// iterate through transactions
			transactions.forEach(transaction => {
				switch (transaction.type) {
					// check if income add to income
					case INCOME:
						state.summary.income += +transaction.amount
						break;
					// check if expense add to expenses
					case EXPENSE:
						state.summary.expense += +transaction.amount
						break;
				}
				// calculate balance
				state.summary.balance = state.summary.income - state.summary.expense
			});
		},
		// set all available transactions to state
		[SET_TRANSACTIONS](state, transactions) {
			state.transactions = transactions
		},
	},

	actions: {
		// add transaction to record
		[ADD_TRANSACTION]({ commit, state, dispatch }, transaction) {
			// set type expense/income as per the amount coming from user input
			transaction.type = +transaction.amount < 0 ? EXPENSE : INCOME
			// lean amount remove +/-
			transaction.amount = Math.abs(+transaction.amount)
			// static id
			transaction.id = state.transactions.length
			// push to transaction
			state.transactions.push(transaction)
			// update summary record
			commit(SET_ACCOUNT_SUMMARY, [transaction])
			// show toast
			dispatch(SHOW_TOAST, {
				duration: 3,
				toastHeading: 'Success',
				toastCopy: 'Transaction has been addedd successfully',
				icon: "fa-solid fa-list-check",
				color: 'green',
				inverse: true
			});
		},

		// remove transaction
		[REMOVE_TRANSACTION]({ commit, state, dispatch }, id) {
			// remove item from store
			state.transactions = state.transactions.filter(transaction => transaction.id !== id)
			// init summary
			state.summary = { ...initialSummary }
			// repopulate summary
			commit(SET_ACCOUNT_SUMMARY, state.transactions)
			// show toast
			dispatch(SHOW_TOAST, {
				duration: 3,
				toastHeading: 'Removed',
				toastCopy: 'Transaction has been removed successfully',
				icon: "fa-solid fa-ban",
				color: 'yellow',
				inverse: true
			});
		}
	},
};
export default Transactions;
