// Element variables from index.html
const homeButton = document.querySelector("#home-button");
const missionButton = document.querySelector("#mission-button");
const foodButton = document.querySelector("#food-search-button");
const drinksButton = document.querySelector("#drinks-search-button");

// Section in which to add the featured recipe cards
const missionSection = document.querySelector("#mission-section");

// Array of ingredients to choose from randomly
let possibleFoodIngredients = ["cheese", "beef", "steak", "chicken", "bread", "broccoli", "jalapeño", "mango", "apple", "banana"];

// Variables for food API
const foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const appIDKey = "&app_id=99f65177&app_key=ecb411eb41e5416150875af0c19ffec7";

// Choose one of the ingredients randomly
function getRandomIngredient() {
    let ingredient = possibleFoodIngredients[Math.floor(Math.random() * possibleFoodIngredients.length)];
    getFoodRecipe(ingredient);
}

// Call on page load to have new featured recipes each time
getRandomIngredient();


// Request data from food API using the random ingredient
function getFoodRecipe(ingredient) {
    fetch(foodURL + ingredient + appIDKey + "&random=true")
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(data) {
        if (data.count !== 0) {
            // Get returned list of recipes from random ingredient, then choose a random one of those
            let allReturnedRecipes = data.hits;
            let randomFromReturned = allReturnedRecipes[Math.floor(Math.random() * allReturnedRecipes.length)];
            let randomRecipeInfo = {
                name: randomFromReturned.recipe.label,
                image: randomFromReturned.recipe.image,
                url: randomFromReturned.recipe.url
            }
            console.log(randomRecipeInfo);
        }
    })
}

// TODO:

// Dynamically add cards to page

// Populate cards with information returned from APIs