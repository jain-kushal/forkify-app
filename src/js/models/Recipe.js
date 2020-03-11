import axios from 'axios';
import { API_URL } from '../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}
	async getRecipe() {
		try {
			const res = await axios.get(`${API_URL}/get?rId=${this.id}`);
			console.log(res.data.recipe);
		} catch (err) {
			console.log(err);
		}
	}
}
