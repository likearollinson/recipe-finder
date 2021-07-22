const drinkURL = "https://thecocktaildb.com/api/json/v1/1/";
const drinkSearchFormEl = document.querySelector("#drink-search-form");


let drinkIngredientSearchInputEl = document.querySelector("#drink-ingredient");
let cocktailNameSearchInputEl = document.querySelector("#cocktail-name");
let alcoholicSearchInputEl = document.querySelector("#alcoholic");

// const searchBtnEl = document.querySelector("#search-btn");

let drinkIngredient;

if (drinkSearchFormEl !== null) {
    drinkSearchFormEl.addEventListener("submit", function(event) {
        event.preventDefault();
        drinkIngredient = drinkIngredientSearchInputEl.value;
        drinkIngredientSearchInputEl.value = "";
        getDrinkIngredientRecipe(drinkIngredient);
    })
}

function getDrinkIngredientRecipe(drinkIngredient) {
    fetch(drinkURL + "filter.php?i=" + drinkIngredient)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(data) {
            if (data.count !== 0) {
                showDrinkRecipes(data.hits);
                console.log(data);
            }
        })
}

// Display recipes on cards within modal
function showDrinkRecipes(drinkRecipes) {
    console.log(drinkRecipes);
//     let allDrinkRecipes = [];

//     // Loop through recipe to create an object of necessary info for each recipe, and add it to the allFoodRecipes array
//     for (let i = 0; i < drinkRecipes.length; i++) {

//         let nextDrinkRecipe = {
//             name: drinkRecipes[i].recipe.label,
//             image: drinkRecipes[i].recipe.image,
//             url: drinkRecipes[i].recipe.url
//         }

//         allFoodRecipes.push(nextRecipe);
//     }
}

console.log()
// searchBtnEl.addEventListener("click", function() {
//     let drinkIngredientSearch = "filter.php?i=" + seinkIngredientEl.value;
//     let cocktailNameSearch = "search.php?s=" + cocktailNameEl.value;
//     let ingredientSearchURL = drinkURL + ingredientSearch + "&a=Alcoholic";
//     let byNameURL = drinkURL + cocktailNameSearch;
//     function getDrinkRecipeIngredient() { 
//         fetch(drinkIngredientSearchURL)
//             .then(function(response) {
//             return response.json();
//         })
//             .then(function(data) {
//                 console.log(data);
//         })
//     }
//     function getDrinkRecipeName() { 
//         fetch(byNameURL)
//             .then(function(response) {
//             return response.json();
//         })
//             .then(function(data) {
//                 console.log(data);
//         })
//     }
    
//     function getDrinkRecipeAlcoholic() { 
//         fetch(alcoholicURL)
//             .then(function(response) {
//             return response.json();
//         })
//             .then(function(data) {
//                 console.log(data);
//         })
//     }

// })


// getDrinkRecipe()