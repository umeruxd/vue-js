// store entry point
import Vuex from 'vuex';
import transactions from '@/store/transactions.js';
import auth from '@/store/auth.js';
import general from '@/store/general.js';
export default Vuex.createStore({
	modules: {
		auth,
		general,
		transactions,
	},
});
