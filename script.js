const endpoint = 'world-cities_json.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.country.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    if (matchArray.length > 2700) return
    else {
        const html = matchArray.map(place => {
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
            const countryName = place.country.replace(regex, `<span class="hl">${this.value}</span>`);
            return `
          <li>
            <span class='name'>${countryName}</span>
            <span class='name'>${cityName}</span>
          </li>
          `;
        }).join('');
        suggestions.innerHTML = html;
    }
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', displayMatches);