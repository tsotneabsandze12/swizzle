import {toggle} from "./shared.mjs";
import {API_KEY} from "./apiKey.mjs";


function fetchApi(key) {
    fetch('https://the-cocktail-db.p.rapidapi.com/popular.php', {
        method: 'GET',
        headers: {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
        }
    }).then(function (response) {
        if (response.status !== 200)
            throw 'error';
        return response.json();
    }).then(populatePage)
        .catch(function (error) {
            console.log(error)
        })
}


export function populatePage(data) {
    let parentElement = document.getElementById('deck');

    data.drinks.forEach(item => {
        let card = document.createElement('div');
        card.className = 'card';

        let a = document.createElement('a');
        a.href = '../templates/details.html?' + item['idDrink'];

        let img = document.createElement('img');
        img.src = item['strDrinkThumb'];

        let drink = document.createElement('h2');
        drink.textContent = item['strDrink'];

        a.appendChild(img);
        a.appendChild(drink);

        card.appendChild(a);

        parentElement.appendChild(card);
    })
}


fetchApi(API_KEY);
toggle();

