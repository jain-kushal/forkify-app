import { elements } from './base';
// 'Pasta with Tomato and Spinach
const limitRecipeTitle = (title, limit = 18) => {
	if (title.length > limit) {
		let newTitle = [];

		title.split(' ').reduce((acc, cur) => {
			if (acc + cur.length <= limit) {
				newTitle = [
					...newTitle,
					cur
				];
				return acc + cur.length;
			}
		}, 0);

		return `${newTitle.join(' ')} ...`;
	}
	return title;
};

const renderRecipe = (recipe) => {
	const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;

	elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearPrevResults = () => {
	elements.searchResultsList.innerHTML = '';
	elements.searchResultsPages.innerHTML = '';
};

// type: 'prev' OR 'next'
const createButton = (currPage, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? currPage - 1 : currPage + 1}>
        <span>Page ${type === 'prev' ? currPage - 1 : currPage + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;
const renderButtons = (currPage, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);
	let button;

	if (currPage === 1 && pages > 1) {
		// Button to go to next page
		button = createButton(currPage, 'next');
	}
	else if (currPage < pages) {
		// display both buttons
		button = createButton(currPage, 'prev') + createButton(currPage, 'next');
	}
	else if (currPage === pages && pages > 1) {
		// Button to go prev page
		button = createButton(currPage, 'prev');
	}
	elements.searchResultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	recipes.slice(start, end).forEach(renderRecipe);

	// render pagination buttons
	renderButtons(page, recipes.length, resPerPage);
};
