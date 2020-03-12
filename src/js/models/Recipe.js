import axios from 'axios';
import { API_URL } from '../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}
	async getRecipe() {
		try {
			const { data: { recipe } } = await axios.get(`${API_URL}/get?rId=${this.id}`);
			this.title = recipe.title;
			this.author = recipe.publisher;
			this.ingredients = recipe.ingredients;
			this.imageUrl = recipe.image_url;
			this.sourceUrl = recipe.source_url;
		} catch (err) {
			console.log(`Error in Recipe.js: ${err}`);
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

	parseIngredients() {
		const unitsLong = [
			'tablespoons',
			'tablespoon',
			'ounces',
			'ounce',
			'teaspoons',
			'teaspoon',
			'cups',
			'pounds'
		];
		const unitsShort = [
			'tbsp',
			'tbsp',
			'oz',
			'oz',
			'tsp',
			'tsp',
			'cup',
			'lb'
		];
		const newIngredients = this.ingredients.map((el) => {
			// normailize units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unitLong, i) => {
				ingredient = ingredient.replace(unitLong, unitsShort[i]);
			});

			// remove parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// parse ingredients into count, unit and ingredient
			const arrOfIngredient = ingredient.split(' ');

			const unitIndex = arrOfIngredient.findIndex((el2) => unitsShort.includes(el2));
			let objIngredient;
			if (unitIndex > -1) {
				// There is a unit
				// Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") -->
				// Ex. 4  cups, arrCount is [4] --> "4"
				const arrCount = arrOfIngredient.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arrCount[0].replace('-', '+'));
				}
				else {
					count = eval(arrCount.join('+'));
				}
				objIngredient = {
					count,
					unit       : arrOfIngredient[unitIndex],
					ingredient : arrOfIngredient.slice(unitIndex + 1).join(' ')
				};
			}
			else if (parseInt(arrOfIngredient[0], 10)) {
				// There is NO unit, but 1st element is number
				objIngredient = {
					count      : parseInt(arrOfIngredient[0], 10),
					unit       : '',
					ingredient : arrOfIngredient.slice(1).join(' ')
				};
			}
			else if (unitIndex === -1) {
				// there is NO unit and NO number in 1st position
				objIngredient = {
					count      : 1,
					unit       : '',
					ingredient
				};
			}

			return objIngredient;
		});
		this.ingredients = newIngredients;
	}
}
