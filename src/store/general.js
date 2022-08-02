// import constants
import { SHOW_TOAST, HIDE_TOAST } from './actions.types';
import { SET_TOAST_DATA } from './mutations.types';
const generalModule = {
	namespaced: false,
	state: () => ({
		showToast: false,
		toastData: {},
	}),

	getters: {
		showToast: (state) => state.showToast,
		toastData: (state) => state.toastData,
	},

	mutations: {
		[SET_TOAST_DATA](state, toastData) {
			state.toastData = toastData;
			state.showToast = toastData.duration ? true : false;
		},
	},

	actions: {
		// show toast
		[SHOW_TOAST]({ commit, dispatch }, payload) {
			commit(SET_TOAST_DATA, payload);
			if (payload.duration) {
				setTimeout(() => {
					dispatch(HIDE_TOAST);
				}, +payload.duration * 1000);
			}
		},
		// hide toast
		[HIDE_TOAST]({ commit }) {
			commit(SET_TOAST_DATA, {});
		},
	},
};
export default generalModule;
