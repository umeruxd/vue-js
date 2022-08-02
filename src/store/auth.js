// import constants
import {
	LOGIN,
	GET_TOKEN,
	SET_TOKEN,
	LOGOUT,
} from './actions.types';
import { SET_ACCOUNT_SUMMARY, UPDATE_ACCESS_TOKEN, SET_TRANSACTIONS } from './mutations.types';
import { transactions } from './transactions.data';
const generalModule = {
	namespaced: false,
	state: () => ({
		accessToken: null,
		isAuthenticated: !!localStorage.getItem('accessToken'),
	}),

	getters: {
		isAuthenticated: (state) => state.isAuthenticated,
	},

	mutations: {
		// update access token
		[UPDATE_ACCESS_TOKEN]: (state, accessToken) => {
			if (accessToken) {
				state.accessToken = `Bearer ${accessToken}`;
				state.isAuthenticated = true;
			} else {
				state.accessToken = null;
				state.isAuthenticated = false;
			}
		},
	},

	actions: {
		// trigger login and save token
		[LOGIN]({ dispatch, commit }, credentials) {
			return new Promise((res, rej) => {
				dispatch(SET_TOKEN, 'Zl49StyUu9721TFoRHfDqGmEVikCKNhJayGUgDvK');
				res(true);
			});
		},
		// trigger logout
		[LOGOUT]({ commit }, credentials) {
			return new Promise((res, rej) => {
				localStorage.removeItem('accessToken');
				localStorage.removeItem('location');
				commit(UPDATE_ACCESS_TOKEN, null);
				res(true);
			});
		},
		// get auth token from storage
		[GET_TOKEN]({ commit }) {
			commit(SET_ACCOUNT_SUMMARY, transactions);
			commit(SET_TRANSACTIONS, transactions);

			let token = localStorage.getItem('accessToken');
			if (token !== null) {
				commit(UPDATE_ACCESS_TOKEN, token);
			}
		},
		// save token in store and storage
		[SET_TOKEN]({ commit }, token) {
			if (token) {
				commit(
					'updateAccessToken',
					token || localStorage.getItem('accessToken')
				);
				localStorage.setItem('accessToken', token);
			}
		},
	},
};
export default generalModule;
