import {toggle} from "./shared.mjs";
import {API_KEY} from "./apiKey.mjs";

window.onload=function (){
    let id = window.location.href.split('?')[1];
    fetchSingle(API_KEY,id);
    toggle();
}

function fetchSingle(key,id){
    fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i="+id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": key,
            "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
        }
    })
        .then(response => {
            if (response.status !== 200)
                throw 'error';
            return response.json();
        }).then(populateSingle)
        .catch(err => {
            console.error(err);
        });
}
export function populateSingle(data) {
    let drinks = data.drinks[0];

    let imageContainer = document.getElementById('img-div');
    let infoUl = document.getElementById('brief-info-ul');
    let instruction = document.getElementById('text');
    let table = document.getElementById('table');

    //image
    let image = document.createElement('img');
    image.src=drinks['strDrinkThumb'];
    imageContainer.appendChild(image);


    //info
    let nameLi = document.createElement('li');
    let categoryLi = document.createElement('li');
    let glassLi = document.createElement('li');
    let typeLi = document.createElement('li');

    nameLi.textContent = `Name : ${drinks['strDrink']}`;
    categoryLi.textContent = `Category : ${drinks['strCategory']}`;
    glassLi.textContent=`Glass : ${drinks['strGlass']}`;
    typeLi.textContent=`Type : ${drinks['strAlcoholic']}`;
    infoUl.appendChild(nameLi);
    infoUl.appendChild(categoryLi);
    infoUl.appendChild(glassLi);
    infoUl.appendChild(typeLi);

    //instruction
    let txtContent = document.createElement('p');
    txtContent.textContent = drinks['strInstructions'];
    instruction.appendChild(txtContent);


    //table
    let approxNumOfIngredients = 15;
    for (let i = 1; i <= approxNumOfIngredients;i++){
        let currentIngredient = 'strIngredient' + i;
        let currentMeasure = 'strMeasure' + i;

        let tr;
        if (drinks[currentIngredient] !== null && drinks[currentMeasure] !== null){
            tr = document.createElement('tr');

            let ingredientTd = document.createElement('td');
            ingredientTd.textContent = drinks[currentIngredient];

            let measureTd = document.createElement('td');
            measureTd.textContent = drinks[currentMeasure];

            tr.appendChild(ingredientTd);
            tr.appendChild(measureTd);
        }
        table.appendChild(tr);
    }
}



