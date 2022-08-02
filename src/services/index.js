import api from './api';

const ApiServices = {
	/* General query for get request */
	query(endpoint, params) {
		return Vue.axios.get(endpoint, params).catch((error) => {
			if (error && error.response)
				throw new Error(
					`TheFertilityPartners ApiService on API:${endpoint} with ${params}, error: ${error.data.message}`
				);
			else
				throw new Error(
					`TheFertilityPartners ApiService on API:${endpoint} with ${params}, error: ${error}`
				);
		});
	},
	/* General get request */
	get(endpoint, params) {
		params = params ? `${endpoint}/${params}` : `${endpoint}`;
		return api.get(params).catch((error) => {
			if (error && error.data)
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error.data.message}`
				);
			else
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error}`
				);
		});
	},

	post(endpoint, params) {
		return api.post(endpoint, params).catch((error) => {
			if (error && error.data)
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error.data.message}`
				);
			else
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error}`
				);
		});
	},

	/* General delete request */
	delete(resource, params) {
		return api.delete(resource, params).catch((error) => {
			if (error && error.data)
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error.data.message}`
				);
			else
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error}`
				);
		});
	},
	/* General put request */
	put(resource, params) {
		return api.put(resource, params).catch((error) => {
			if (error && error.data)
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error.data.message}`
				);
			else
				throw new Error(
					`TheFertilityPartners ApiService on API: ${params}, error: ${error}`
				);
		});
	},
};

export default ApiServices;
