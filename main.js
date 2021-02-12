const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const responseBox = document.querySelector('.response-box');
const titleContainer = document.querySelector('.title-container');
const descriptionContainer = document.querySelector('.description-container');

async function getCountry() {
	const country = searchInput.value;
	const spinner = document.querySelector('.globe');

	try {
        if (searchInput.value != '' && !responseBox.classList.contains('visible')) {

            spinner.setAttribute('src', '/assets/globe.gif');
            const response = await axios.get(
                `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
            );
            const data = response.data[0];
            console.log(data);

            const flag = document.createElement('img');
            flag.classList.add('flag');
            flag.setAttribute('src', data.flag);

            const countryName = document.createElement('h2');
            countryName.classList.add('country-name');
            countryName.textContent = data.name;

            const countryInfo = document.createElement('p');
            countryInfo.classList.add('country-info');
            countryInfo.textContent = addGeneralInfo(data);

            titleContainer.appendChild(flag);
            titleContainer.appendChild(countryName);
            descriptionContainer.append(countryInfo);

            responseBox.classList.add('visible');
            searchInput.value = '';
        } else {
            responseBox.classList.remove('visible');
            while (titleContainer.firstChild) {
                titleContainer.removeChild(titleContainer.lastChild);
                descriptionContainer.removeChild(descriptionContainer.lastChild);
            }
        }
	} catch (error) {
		if (error.type === 'Type Error') {
            console.log('Type Error!');
        }
	}
	spinner.setAttribute('src', '/assets/globe_still.png');
}

function addGeneralInfo(country) {
	return `${country.name} is situated in ${country.subregion}.
    It has a population of ${country.population.toLocaleString()} people.
    The capital is ${country.capital} ${addCurrency(country.currencies)}.
    ${addLanguages(country.languages)}.`;
}

function addCurrency(currencies) {
	let string = `and you pay with ${currencies[0].name}s`;
	if (currencies.length > 1) {
		for (currency of currencies) {
			string += ` and ${currency.name}s`;
		}
	}
	return string;
}

function addLanguages(languages) {
	let string = `They speak ${languages[0].name}`;
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

// getCountry();
searchBtn.addEventListener('click', getCountry);
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getCountry();
    }
});


// Checken welke landen er meer dan 1 valuta hebben:
// fetch('https://restcountries.eu/rest/v2/').then((res) => res.json()).then(countries => {
// const what = countries.filter(country => country.currencies.length > 1)
// const names = what.map(country => country.name)
// console.log(names)});
