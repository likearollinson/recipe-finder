// Element variables from index.html
const homeButton = document.querySelector("#home-button");
const missionButton = document.querySelector("#mission-button");
const foodButton = document.querySelector("#food-search-button");
const drinksButton = document.querySelector("#drinks-search-button");

const foodSearchFormEl = document.querySelector("#food-search-form");
const ingredientSearchInput = document.querySelector("#food-ingredient-search-input");

const foodDropdownEl = document.querySelector("#food-dropdown-menu");

let ingredient;


// Adds event listeners for food and drinks search buttons to go to respective pages
if (foodButton !== null && drinksButton !== null) {
    foodButton.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "pages/food.html";
    })
    
    drinksButton.addEventListener("click", function(event) {
        event.preventDefault();
        location.href = "pages/drinks.html";
    })
}


// Event listener for dropdown menu
foodDropdownEl.addEventListener("change", function(event) {
    event.preventDefault();
    foodDropdownEl.textContent = foodDropdownEl.value;
})


// Adds conditional to prevent errors on landing page
if (foodSearchFormEl !== null) {
    foodSearchFormEl.addEventListener("submit", function(event) {
        event.preventDefault();
        ingredient = ingredientSearchInput.value;
        ingredientSearchInput.value = "";
        getFoodRecipe(ingredient);
    })
}






// Variables for food recipe search API
const foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const appIDKey = "&app_id=99f65177&app_key=ecb411eb41e5416150875af0c19ffec7";

function getFoodRecipe(ingredient) {
    fetch(foodURL + ingredient + appIDKey)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(data) {
            if (data.count !== 0) {
                console.log(data);
                console.log(data.hits[0].recipe.label);
                console.log(data.hits[0].recipe.image);
                console.log(data.hits[0].recipe.url);
            }
        })
}



const drinkURL = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

let cocktailName = "margarita";

function getDrinkRecipe() {
    fetch(drinkURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
}

// getDrinkRecipe();