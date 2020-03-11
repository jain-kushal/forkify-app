import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}
	async getResults() {
		const API_URL = 'https://forkify-api.herokuapp.com/api';
		try {
			const res = await axios.get(`${API_URL}/search?q=${this.query}`);
			this.recipes = res.data.recipes;
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}
}
