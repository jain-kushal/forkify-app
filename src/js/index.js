import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, removeLoader } from './views/base';

/**  Global State of the app
*   - Search object
*   - Current recipe object
*   - Shopping list object
*   - Liked recipes
*/

const state = {};

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
