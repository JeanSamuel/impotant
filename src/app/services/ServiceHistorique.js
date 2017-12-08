import config from '../configs/data/dataM'
import Utils from './Utils';

const BASEURL = config.ARIARY_BASE_URL
let instance = null;
class ServiceHistorique {
	static getInstance() {
		if (!instance) {
			instance = new ServiceHistorique();
		}
		return instance;
	}
    /**
     * 
     * @param {*} account_id 
     * @param {*} activity 
     */
	async getHistorique(account_id, activity) {
		let dataHisto = null;
		activity.setState({ loading: true });
		try {
			let url = BASEURL + 'transaction/' + account_id;
			await fetch(url)
				.then(response => response.json())
				.then(responseJson => {
					if (responseJson.error_message != null) {
						throw responseJson.error_message;
					} else {
						dataHisto = responseJson;
					}
				});
		} catch (error) {
			throw error.toString();
		} finally {
			activity.setState({ loading: false });
		}
		return dataHisto;
	}
}

export default ServiceHistorique.getInstance();
