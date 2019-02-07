import { ADD_CONSENT, RECEIVE_CONSENTS } from '../actions/actionTypes'

const consents = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_CONSENTS:
			return [
				...state,
				...action.consents
			]
		case ADD_CONSENT:
			return [
				...state,
				action.consent
			]
		default:
			return state
	}
}

export default consents