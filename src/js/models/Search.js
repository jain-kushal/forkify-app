import axios from 'axios';
import { API_URL } from '../config';

export default class Search {
	constructor(query) {
		this.query = query;
	}
	async getResults() {
		try {
			const res = await axios.get(`${API_URL}/search?q=${this.query}`);
			this.recipes = res.data.recipes;
			// console.log(res);
		} catch (err) {
			console.log(`Error in Search.js: ${err}`);
		}
	}
}
