import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

import Login from '@/pages/login.vue';
import Transactions from '@/pages/transactions.vue';
import { GET_TOKEN } from './store/actions.types';

const routes = [
	{ path: '/', component: Login },
	{ path: '/transactions', component: Transactions },
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
	mode: 'history',
	history: createWebHistory(),
	routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
	store.dispatch(GET_TOKEN, null, { root: true });
	if (to.fullPath !== '/') {
		if (!store.state.auth.accessToken) {
			next('/');
			return;
		}
	}
	if (to.fullPath === '/') {
		if (store.state.auth.accessToken) {
			next('/transactions');
			return;
		}
	}
	next();
});

export default router;
