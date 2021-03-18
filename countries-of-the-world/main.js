async function sortCountries() {
	try {
		const result = await axios.get('https://restcountries.eu/rest/v2/all');
		const sortedCountries = result.data.sort(
			(country1, country2) => country1.population - country2.population
		);
		for ({ name, flag, region } of sortedCountries) {
			addCountryToList(name, flag, region);
		}
	} catch (e) {
		console.log(e);
	}
}

function addCountryToList(countryName, countryFlag, countryRegion) {
	const list = document.querySelector('.list');
	const country = document.createElement('li');
	const name = document.createElement('span');
	const flag = document.createElement('img');
	const link = document.createElement('a');

	name.className = 'country-name';
	flag.className = 'country-flag';
	link.className = 'country-link';

	name.textContent = countryName;
	setColorCodeCountry(name, countryRegion);
	flag.setAttribute('src', countryFlag);
	link.setAttribute('href', `/?country=${countryName}`);

	link.appendChild(flag);
	link.appendChild(name);
	country.appendChild(link);
	list.appendChild(country);
}

function setColorCodeCountry(nameElement, countryRegion) {
	switch (countryRegion) {
		case 'Africa':
			nameElement.classList.add('africa');
			break;
		case 'Americas':
			nameElement.classList.add('americas');
			break;
		case 'Asia':
			nameElement.classList.add('asia');
			break;
		case 'Europe':
			nameElement.classList.add('europe');
			break;
		case 'Oceania':
			nameElement.classList.add('oceania');
			break;
		case 'Polar':
			nameElement.classList.add('polar');
			break;
	}
}

sortCountries();
