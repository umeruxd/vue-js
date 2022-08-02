import api from './api';
import routes from '@/routes';

const executeInterceptors = (app) => {
	app.config.globalProperties.$axios = api;
	api.defaults.timeout = 10000;
	const redirect = () => {
		routes.replace({
			path: '/',
		});
	};
	api.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem('accessToken');
			if (token) {
				config.headers.common['Authorization'] = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
	api.interceptors.response.use(
		(response) => {
			if (response.status === 200 || response.status === 201) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(response);
			}
		},
		(error) => {
			if (error.response.status) {
				switch (error.response.status) {
					case 400:
						break;

					case 401:
					case 403:
					case 502:
						redirect();
						break;
					case 404:
						alert('page not exist');
						break;
				}
				return Promise.reject(error.response);
			}
		}
	);
};

export default executeInterceptors;
