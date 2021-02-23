async function sortCountries() {
	try {
		const result = await axios.get('https://restcountries.eu/rest/v2/all');
		const sortedCountries = result.data.sort(
			(country1, country2) => country1.population - country2.population
		);
		for (country of sortedCountries) {
			const { name, flag, population, region } = country;
			makeList(name, flag, region);
		}
	} catch (e) {
		console.log(e);
	}
}

function makeList(countryName, countryFlag, countryRegion) {
	const list = document.querySelector('.list');
	let country = document.createElement('li');
	let name = document.createElement('span');
	let flag = document.createElement('img');

	name.classList.add('country-name');
	flag.classList.add('country-flag');

	name.textContent = countryName;
	colorCodeCountry(name, countryRegion);
	flag.setAttribute('src', countryFlag);

	country.appendChild(flag);
	country.appendChild(name);
	list.appendChild(country);

	
}

function colorCodeCountry(element, countryRegion) {
	switch (countryRegion) {
		case 'Africa':
			element.classList.add('africa');
			break;
		case 'Americas':
			element.classList.add('americas');
			break;
		case 'Asia':
			element.classList.add('asia');
			break;
		case 'Europe':
			element.classList.add('europe');
			break;
		case 'Oceania':
			element.classList.add('oceania');
			break;
		case 'Polar':
			element.classList.add('polar');
			break;
	}
}

function showPopulation(countries) {
	for (country of countries) {
		const { population } = country;
	}
}

sortCountries();
