import axios from 'axios';
import { API_URL } from '../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}
	async getRecipe() {
		try {
			const { data } = await axios.get(`${API_URL}/get?rId=${this.id}`);
			const recipe = data.recipe;
			this.title = recipe.title;
			this.author = recipe.publisher;
			this.ingredients = recipe.ingredients;
			this.imageUrl = recipe.image_url;
			this.sourceUrl = recipe.source_url;
		} catch (err) {
			console.log(err);
			alert('Something went wrong ☹️');
		}
	}
	calcTime() {
		const numIngredients = this.ingredients.length;
		// Assumption: Recipe with 3 ingredients takes 15 mins
		this.cookTime = Math.ceil(numIngredients / 3) * 15;
	}
	calcServings() {
		this.servings = 4;
	}
}
