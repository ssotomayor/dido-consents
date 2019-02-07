//TODO: Remove fake fetch
import fakeFetch from 'fake-fetch';
fakeFetch.install();

const mockConsents = [
	{
		"name": "Bojack Horseman", // nice reference 🐴 :)
		"email": "bojack@horseman.com",
		"consentFor": ["newsletters", "targetedAds"],
		"id": "nad222ay3khz9wq2q4yred"
	},
	{
		"name": "Princess Carolyn",
		"email": "princess@manager.com",
		"consentFor": ["newsletters"],
		"id": "w54z8doi8k8xfzyv0jk3f"
	}
];

/**
 * Helper method to create unique IDs
 * @returns {String} with unique ID
 */
function generateUID () {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Gets initial data
 * @returns {Object} with property consents that holds an array with consents
 */
export const getInitialData = async () => {
	try {
		const consents = await _getConsents();
		return ({
			consents
		});
	}
	catch (e) {
		console.warn(e);
	}
};

/**
 * GET /consents to get all the consents stored
 * @returns {Array} of consents
 */
export async function _getConsents () {
	fakeFetch.respondWith(JSON.stringify(mockConsents));
	try {
		const response = await fetch('/consents', { method: 'GET' });
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
				response.status);
			return;
		}
		return response.json();
	}
	catch (err) {
		console.warn(err);
	}
}

/**
 * POST to /consent to save the consent
 * @param {Object} consent {name: (String), email: (String), newsletters: (Boolean), visits: (Boolean), targetedAds: (Boolean) }
 * @param {String} consent.name - Name of the user
 * @param {String} consent.email - Email of the user
 * @param {Boolean} consent.targetedAds - If the user consented to receive targeted ads
 * @param {Boolean} consent.newsletters - If the user consented to receive newsletters
 * @param {Boolean} consent.visits - If the user consented to send statistics
 * @returns {Object} saved consent with an ID
 */
export async function _saveConsent (consent) {
	consent.id = generateUID(); // generates unique ID for each consent
	fakeFetch.respondWith(JSON.stringify(consent))
	try {
		const response = await fetch('/consent', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(consent),
		});
		if (response.status !== 200) {
			console.log('Looks like there was a problem. Status Code: ' +
				response.status);
			return;
		}
		return response.json();
	}
	catch (err) {
		console.warn(err);
	}	
}
