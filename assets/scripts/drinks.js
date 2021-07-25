// Variables from modal elements in drinks.html
const drinkModal = document.querySelector("#drink-modal");
const modalCloseBtn = document.querySelector("#close-drink-modal");
const modalBg = document.querySelector("#drink-modal-background");
const modalContentEl = document.querySelector("#drink-modal-content-container");

// Variables from form elements
const drinkSearchFormEl = document.querySelector("#drink-search-form");
const randomDrinkSearchBtn = document.querySelector("#random-drinks");
let drinkIngredientSearchInputEl = document.querySelector("#drink-ingredient");
let cocktailNameSearchInputEl = document.querySelector("#cocktail-search");

const clearFavoritesBtn = document.querySelector("#clear-favorites");
const cardsContainer = document.querySelector("#cards-container");

// Declare globally for use in multiple functions
let drinkIngredient;

// Set savedDrinks from local storage if available, and to an empty array if not
let savedDrinks = JSON.parse(localStorage.getItem("userDrinkFavorites") || "[]");


// Add event listeners to close modal
modalBg.addEventListener("click", () => {
    drinkModal.classList.remove("is-active");
    modalContentEl.innerHTML = "";
})

modalCloseBtn.addEventListener("click", () => {
    drinkModal.classList.remove("is-active");
    modalContentEl.innerHTML = "";
})


// Add event listeners to make sure only one search parameter can be used (API limitation)
drinkIngredientSearchInputEl.addEventListener("blur", function() {
    if (drinkIngredientSearchInputEl.value.trim().length !== 0) {
        cocktailNameSearchInputEl.disabled = true;
    } else {
        cocktailNameSearchInputEl.disabled = false;
    }
})

cocktailNameSearchInputEl.addEventListener("blur", function() {
    if (cocktailNameSearchInputEl.value.trim() !== "") {
        drinkIngredientSearchInputEl.disabled = true;
    } else {
        drinkIngredientSearchInputEl.disabled = false;
    }
})


// Search for drink recipes on form submit
drinkSearchFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    drinkIngredient = drinkIngredientSearchInputEl.value.trim();
    cocktailName = cocktailNameSearchInputEl.value.trim();
    drinkIngredientSearchInputEl.value = "";
    cocktailNameSearchInputEl.value = "";
    drinkModal.classList.add("is-active");
    if (drinkIngredient) {
        getDrinkFromIngredient(drinkIngredient);
    } else if (cocktailName) {
        getDrinkFromName(cocktailName);
    }
})


// Search for random recipe
randomDrinkSearchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    drinkModal.classList.add("is-active");
    getRandomDrinkRecipe();
})


// Clear favorites button function
clearFavoritesBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("userDrinkFavorites");
    savedDrinks = [];
    showFavorites(savedDrinks);
})


// URL for fetching drinks API data
const drinkURL = "https://thecocktaildb.com/api/json/v1/1/";


function getDrinkFromIngredient(drinkIngredient) {
    fetch(drinkURL + "filter.php?i=" + drinkIngredient)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            if (data.count !== 0) {
                showDrinkRecipes(data.drinks);
            }
        })
        .catch(function (error) {
            console.log(error);
            invalidIngredient(drinkIngredient);
        })
}


function getDrinkFromName(cocktailName) {
    fetch(drinkURL + "search.php?s=" + cocktailName)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            if (data.count !== 0) {
                showDrinkRecipes(data.drinks);
            }
        })
        .catch(function (error) {
            console.log(error);
            invalidIngredient(drinkIngredient);
        })
}


function getRandomDrinkRecipe() {
    fetch(drinkURL + "random.php")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showDrinkRecipes(data.drinks)
        })
}

// Show error message if user searches for invalid ingredient
function invalidIngredient(drinkIngredient) {
    modalContentEl.innerHTML = "";
    let errorMessageContainer = document.createElement("article");
    errorMessageContainer.setAttribute("class", "card");
    let errorDiv = document.createElement("div");
    errorDiv.setAttribute("class", "card-content");
    let errorMessage = document.createElement("p");
    errorMessage.setAttribute("class", "title is-4 has-text-black");
    if (drinkIngredient) {
        errorMessage.textContent = "Sorry, there were no cocktails found with that ingredient.";
    } else if (cocktailName) {
        errorMessage.textContent = "Sorry, there were no cocktails found with that name.";
    }

    modalContentEl.appendChild(errorMessageContainer);
    errorMessageContainer.appendChild(errorDiv);
    errorDiv.appendChild(errorMessage);
}

// Display recipes on cards within modal
function showDrinkRecipes(drinkRecipes) {

    // Loop through recipes to create an object of necessary info for each recipe
    for (let i = 0; i < drinkRecipes.length; i++) {

        let thisDrinkName = drinkRecipes[i].strDrink;
        let thisDrinkImage = drinkRecipes[i].strDrinkThumb;
        let thisDrinkID = drinkRecipes[i].idDrink;

        // Format drink names with a hyphen between words for use in URL
        let arr = thisDrinkName.split(" ");
        let formattedDrinkName = arr.join("-");

        let thisDrinkURL = `https://www.thecocktaildb.com/drink/${thisDrinkID}-${formattedDrinkName}-Cocktail`;

        let nextDrinkRecipe = {
            name: thisDrinkName,
            image: thisDrinkImage,
            url: thisDrinkURL
        }

        // Create elements to add to the modal for each recipe
        let nextCard = document.createElement("article");
        nextCard.setAttribute("class", "card m-5 p-5");

        let nextImageDiv = document.createElement("div");
        nextImageDiv.setAttribute("class", "card-image");

        let nextFigure = document.createElement("figure");
        nextFigure.setAttribute("class", "image is-4by3");

        let nextImage = document.createElement("img");
        nextImage.setAttribute("src", nextDrinkRecipe.image);

        let nextCardContentDiv = document.createElement("div");
        nextCardContentDiv.setAttribute("class", "card-content");

        let nextMediaDiv = document.createElement("div");
        nextMediaDiv.setAttribute("class", "media");

        let nextMediaContent = document.createElement("div");
        nextMediaContent.setAttribute("class", "media-content");

        let nextRecipeName = document.createElement("p");
        nextRecipeName.setAttribute("class", "title is-4 has-text-black");
        nextRecipeName.textContent = nextDrinkRecipe.name;

        let nextRecipeURL = document.createElement("p");
        nextRecipeURL.setAttribute("class", "subtitle is-6 has-text-black");
        let nextLink = document.createElement("a");
        nextLink.setAttribute("href", thisDrinkURL);
        nextLink.setAttribute("target", "_blank");
        nextLink.textContent = thisDrinkURL;

        let saveButton = document.createElement("button");

        // Style button to show whether a recipe has already been saved
        if (JSON.stringify(savedDrinks).includes(JSON.stringify(nextDrinkRecipe))) {
            saveButton.setAttribute("class", "button is-success");
            saveButton.textContent = "SAVED";
        } else {
            saveButton.setAttribute("class", "button is-info");
            saveButton.textContent = "SAVE ME!";
        }

        // Append elements to their parents
        modalContentEl.appendChild(nextCard);
        nextCard.appendChild(nextImageDiv);
        nextCard.appendChild(nextCardContentDiv);
        nextImageDiv.appendChild(nextFigure);
        nextFigure.appendChild(nextImage);

        nextCardContentDiv.appendChild(nextMediaDiv);
        nextMediaDiv.appendChild(nextMediaContent);
        nextMediaContent.appendChild(nextRecipeName);
        nextMediaContent.appendChild(nextRecipeURL);
        nextRecipeURL.appendChild(nextLink);
        nextCardContentDiv.appendChild(saveButton);

        saveButton.addEventListener("click", function(event) {
            event.preventDefault();
            if (saveButton.textContent !== "SAVED") {
                savedDrinks.push(nextDrinkRecipe);
                localStorage.setItem("userDrinkFavorites", JSON.stringify(savedDrinks));
    
                saveButton.setAttribute("class", "button is-success");
                saveButton.textContent = "SAVED";
                showFavorites(savedDrinks);
            }
        })

    }
}


// Display cards with user's saved drink recipes - on page load if available, and after saving a recipe
function showFavorites(savedDrinks) {

    // Disable the "clear favorites" button if there are no items in the favorites section and enable otherwise
    if (savedDrinks.length !== 0) {
        clearFavoritesBtn.disabled = false;
    } else {
        clearFavoritesBtn.disabled = true;
    }

    cardsContainer.innerHTML = "";

    for (let i = 0; i < savedDrinks.length; i++) { 

        let nextRecipe = savedDrinks[i];

        // Create elements
        let nextCard = document.createElement("article");
        nextCard.setAttribute("class", "card column is-one-quarter m-5 p-5");

        let nextImageDiv = document.createElement("div");
        nextImageDiv.setAttribute("class", "card-image");

        let nextFigure = document.createElement("figure");
        nextFigure.setAttribute("class", "image is-4by3");
        
        let nextImage = document.createElement("img");
        nextImage.setAttribute("src", nextRecipe.image);

        let nextCardContentDiv = document.createElement("div");
        nextCardContentDiv.setAttribute("class", "card-content");

        let nextMediaDiv = document.createElement("div");
        nextMediaDiv.setAttribute("class", "media");

        let nextMediaContent = document.createElement("div");
        nextMediaContent.setAttribute("class", "media-content");

        let nextRecipeName = document.createElement("p");
        nextRecipeName.setAttribute("class", "title is-4 has-text-black");
        nextRecipeName.textContent = nextRecipe.name;

        let nextRecipeURL = document.createElement("p");
        nextRecipeURL.setAttribute("class", "subtitle is-6 has-text-black");

        let nextLink = document.createElement("a");
        nextLink.setAttribute("href", nextRecipe.url);
        nextLink.setAttribute("target", "_blank");
        nextLink.textContent = nextRecipe.url;

        // Append all elements to their parents
        cardsContainer.appendChild(nextCard);
        nextCard.appendChild(nextImageDiv);
        nextCard.appendChild(nextCardContentDiv);
        nextImageDiv.appendChild(nextFigure);
        nextFigure.appendChild(nextImage);
        nextCardContentDiv.appendChild(nextMediaDiv);
        nextMediaDiv.appendChild(nextMediaContent);
        nextMediaContent.appendChild(nextRecipeName);
        nextMediaContent.appendChild(nextRecipeURL);
        nextRecipeURL.appendChild(nextLink);
    }
}

// Run on page load to show favorites from local storage if available
showFavorites(savedDrinks);