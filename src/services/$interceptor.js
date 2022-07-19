import axios from 'axios';

class $interceptors {
	_default(err) {
		return {
			status: err.response.status,
			message: err.response.data,
			statusText: err.response.statusText
		}
	}

	_network() {
		return {
			status: -999,
			message: {
				non_field_errors: ['Service is unavailable. Please check your internet connection. If connection is not the problem, please contact our technical support.']
			},
			statusText: 'Network Error'
		}
	}

	_internal(err) {
		return {
			status: err.response.status,
			message: {
				non_field_errors: ['Error occured on the server. Please contact our technical support.']
			},
			statusText: err.response.statusText
		}
	}

	_not_found(err) {
		return {
			status: 404,
			message: {
				non_field_errors: ['URL not found!']
			},
			statusText: err.response.statusText
		}
	}

	_cancel(err) {
		return {
			status: -998,
			message: {
				non_field_errors: ['Canceled request!']
			},
			statusText: 'Request canceled by the client!'
		}
	}

	init() {
		axios.interceptors.response.use(
			response => response, 
			err => {
				
				if(!err.response) {
					if(err.message) {
						if(err.message === 'cancel') {
							return Promise.reject(this._cancel(err.message))
						}
					}
				// NETWORK ERROR - SERVICE IS DOWN, CORS ISSUES, INTERNET CONNECTION...
				return Promise.reject(this._network());

			} else {
				

				// INTERNAL SERVER ERROR
				if(err.response.status === 500) {
					return Promise.reject(this._internal(err));
				}

				if(err.response.status === 404) {
					return Promise.reject(this._not_found(err))
				}

				// DEFAULT ERROR
				return Promise.reject(this._default(err));
			}
		});
	}

}

export default new $interceptors();

