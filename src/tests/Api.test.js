
import { getInitialData, _saveConsent } from "../utils/api"

describe('API Tests', () => {
	test('API should return data', (done) => {
		getInitialData().then((data) => {
			expect(data).toBeTruthy();
			expect(data).toHaveProperty('consents');
			expect(Array.isArray(data.consents)).toBe(true);
			done();
		})
	});
	
	test('API should SAVE consent and return the saved consent with a unique ID', (done) => {
		const consentToSave = { 
			name: 'New Name', 
			email:'new@name.com', 
			newsletters: true, 
			visits: true, 
			targetedAds: true
		}
		_saveConsent(consentToSave).then((data) => {
			expect(data).toBeTruthy();
			expect(data).toHaveProperty('id');
			done();
		})
	});
})
