// Element variables from index.html
const homeButton = document.querySelector("#home-button");
const missionButton = document.querySelector("#mission-button");
const foodButton = document.querySelector("#food-search-button");
const drinksButton = document.querySelector("#drinks-search-button");




var drinkURL = "https://thecocktaildb.com/api/json/v1/1/";

var ingredientEl = document.querySelector("#ingredient");
var cocktailNameEl = document.querySelector("#cocktail-name");

var searchBtnEl = document.querySelector("#search-btn");

searchBtnEl.addEventListener("click", function() {
    console.log(cocktailNameEl.value);
    console.log(ingredientEl.value);
    console.log(ingredientSearch);
    var ingredientSearch = "filter.php?i=" + ingredientEl.value;
    var cocktailNameSearch = "search.php?s=" + cocktailNameEl.value;
    var searchURL = drinkURL + ingredientSearch + "&=Alcoholic";
    var byNameURL = drinkURL + cocktailNameSearch;
    function getDrinkRecipe() { 
        fetch(searchURL)
            .then(function(response) {
            return response.json();
        })
            .then(function(data) {
                console.log(data);
        })
    }
    function getDrinkRecipeName() { 
        fetch(byNameURL)
            .then(function(response) {
            return response.json();
        })
            .then(function(data) {
                console.log(data);
        })
    }
    
    getDrinkRecipe();
    getDrinkRecipeName();
})


// getDrinkRecipe();