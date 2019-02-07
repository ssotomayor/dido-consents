import { getInitialData, _saveConsent } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { RECEIVE_CONSENTS, ADD_CONSENT } from "./actionTypes"

export const receiveConsents = ({consents}) => ({
	type: RECEIVE_CONSENTS,
	consents
})

export const addConsent = (consent) => ({
	type: ADD_CONSENT,
	consent
})

/**
 * Calls API to save the consent and dispatches action to reducer
 * @param {Object} consent - The consent
 * @param {string} consent.name - Name of the user
 * @param {string} consent.email - Email of the user
 * @param {Boolean} consent.targetedAds - If the user consented to receive targeted ads
 * @param {Boolean} consent.newsletters - If the user consented to receive newsletters
 * @param {Boolean} consent.visits - If the user consented to send statistics
 */
export const handleAddConsent = (consent) => {
	return async (dispatch, getState) => {
		dispatch(showLoading())
		try {
			const addedConsent = await _saveConsent(consent);
			dispatch(addConsent(addedConsent));
			dispatch(hideLoading());
		}
		catch (e) {
			console.warn(e);
			alert("There was an error saving the consent. Try again.");
		}
	}
}


/**
 * Gets initial data
 */
export function handleInitialData(){
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData().then((data) => {
			if(data.consents !== null && data.consents !== undefined){
				dispatch(receiveConsents(data))
			}
			dispatch(hideLoading())
		})
	}
}