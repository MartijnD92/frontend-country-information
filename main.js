const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const containerAll = document.querySelector('.all-container');
const responseBox = document.querySelector('.response-box');
const titleContainer = document.querySelector('.title-container');
const descriptionContainer = document.querySelector('.description-container');
const queryParams = new URLSearchParams(window.location.search);
let query;

if (queryParams.has('country')) {
	document.addEventListener('DOMContentLoaded', () => {
		query = queryParams.get('country');
		getCountry();
	});
}
searchBtn.addEventListener('click', () => {
	query = searchInput.value;
	getCountry();
});
searchInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		query = searchInput.value;
		getCountry();
	}
});

async function getCountry() {
	queryParams.set('country', query);
	history.pushState(null, null, '?' + queryParams.toString());

	const spinner = document.querySelector('.globe');
	responseBox.classList.remove('visible');

	const errorMessage = document.querySelector('.error-message');
	if (errorMessage) {
		containerAll.removeChild(errorMessage);
	}

	if (titleContainer.hasChildNodes()) {
		removeAllChildNodes(titleContainer);
		removeAllChildNodes(descriptionContainer);
	}

	try {
		spinner.setAttribute('src', './assets/globe.gif');
		const response = await axios.get(
			`https://restcountries.eu/rest/v2/name/${query}?fullText=true`
		);
		const country = response.data[0];
		const { name, flag } = country;

		const flagImg = document.createElement('img');
		flagImg.classList.add('flag');
		flagImg.setAttribute('src', flag);

		const countryName = document.createElement('h2');
		countryName.classList.add('country-name');
		countryName.textContent = name;

		const countryInfo = document.createElement('p');
		countryInfo.classList.add('country-info');
		countryInfo.textContent = addGeneralInfo(country);

		titleContainer.appendChild(flagImg);
		titleContainer.appendChild(countryName);
		descriptionContainer.append(countryInfo);

		responseBox.classList.add('visible');
	} catch (e) {
		console.error(e);
		const errorMessage = document.createElement('p');
		errorMessage.classList.add('error-message');
		errorMessage.textContent = 'Please insert a country name!';
		containerAll.insertBefore(errorMessage, responseBox);
	}
	spinner.setAttribute('src', './assets/globe_still.png');
	searchInput.value = '';
}

function addGeneralInfo({
	name,
	nativeName,
	subregion,
	population,
	capital,
	currencies,
	demonym,
	languages,
}) {
	return `${name} (${nativeName}) is situated in the region of ${subregion || 'N/A'}.
    It has a population of ${population.toLocaleString()} people.
    The capital is ${capital || 'N/A'}, ${getCurrency(currencies)}. ${
		demonym || name
	} ${getLanguages(languages)}.`;
}

function getCurrency(currencies) {
	let string = 'and you pay with ';
	let lastIndex = currencies.length - 1;
	if (currencies[lastIndex].name === null) lastIndex = currencies.length - 2;

	for (let currency of currencies) {
		if (currency.name === null) {
			continue;
		}
		switch (currencies.indexOf(currency)) {
			case 0:
				string += `${currency.name}s`;
				break;
			case lastIndex:
				string += ` and ${currency.name}s`;
				break;
			default:
				string += `, ${currency.name}s`;
				break;
		}
	}
	return string;
}

function getLanguages(languages) {
	let string = ' people speak ';
	for (let language of languages) {
		switch (languages.indexOf(language)) {
			case 0:
				string += language.name;
				break;
			case languages.length - 1:
				string += ` and ${language.name}`;
				break;
			default:
				string += `, ${language.name}`;
				break;
		}
	}
	return string;
}

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

// Checken welke landen er tot een bepaalde categorie behoren:
// fetch('https://restcountries.eu/rest/v2/').then((res) => res.json()).then(countries => {
// const what = countries.filter(country => country.currencies.length > 2);
// const names = what.map(country => country.name)
// console.log(names)});
