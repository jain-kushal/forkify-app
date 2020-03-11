import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, removeLoader } from './views/base';
import Recipe from './models/Recipe';

/**  Global State of the app
*   - Search object
*   - Current recipe object
*   - Shopping list object
*   - Liked recipes
*/

const state = {};

/**
 * SEARCH CONTROLLER
 */

const handleSearch = async () => {
	// get query from view
	const query = searchView.getInput(); //TODO
	console.log(query);
	if (query) {
		// create new search object and add it to state
		state.search = new Search(query);
		console.log(state);
		// prepare UI for results
		searchView.clearInput();
		searchView.clearPrevResults();
		renderLoader(elements.searchResults);

		// search for recipes
		await state.search.getResults();

		// render results on UI
		removeLoader();
		if (state.search.recipes) {
			searchView.renderResults(state.search.recipes);
		}
	}
};

elements.searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	handleSearch();
});

elements.searchResultsPages.addEventListener('click', (e) => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearPrevResults();
		searchView.renderResults(state.search.recipes, goToPage);
	}
});

/**
 * RECIPE CONTROLLER
 */

const recipe = new Recipe(`c465d3`);
recipe.getRecipe();
