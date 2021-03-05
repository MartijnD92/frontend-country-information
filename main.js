const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const containerAll = document.querySelector('.all-container');
const responseBox = document.querySelector('.response-box');
const titleContainer = document.querySelector('.title-container');
const descriptionContainer = document.querySelector('.description-container');

searchBtn.addEventListener('click', getCountry);
searchInput.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		getCountry();
	}
});

async function getCountry() {
	const query = searchInput.value;
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
		const errorMessage = document.createElement('p');
		errorMessage.classList.add('error-message');
		errorMessage.textContent = 'Please insert a country name!';
		containerAll.insertBefore(errorMessage, responseBox);
	}
	spinner.setAttribute('src', './assets/globe_still.png');
	searchInput.value = '';
}

function addGeneralInfo({ name, nativeName, subregion, population, capital, currencies, demonym, languages }) {
	return `${name} (${nativeName}) is situated in the region of ${subregion || 'N/A'}.
    It has a population of ${population.toLocaleString()} people.
    The capital is ${capital || 'N/A'}, ${getCurrency(
		currencies
	)}. ${demonym || name} ${getLanguages(languages)}.`;
}

function getCurrency(currencies) {
	let string = `and you pay with ${currencies[0].name}s`;
	if (currencies.length > 1) {
		for (let i = 1; i < currencies.length; i++) {
			if (currencies[i].name === null) {
				break;
			}
			if (i === currencies.length - 1) {
				string += ` and ${currencies[i].name}s`;
			} else {
				string += `, ${currencies[i].name}s`;
			}
		}
	}
	return string;
}

function getLanguages(languages) {
	let string = ` people speak ${languages[0].name}`;
	if (languages.length > 1) {
		for (let i = 1; i < languages.length; i++) {
			if (i === languages.length - 1) {
				string += ` and ${languages[i].name}`;
			} else {
				string += `, ${languages[i].name}`;
			}
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
// const what = countries.filter(country => country.languages.length > 2);
// const names = what.map(country => country.name)
// console.log(names)});
