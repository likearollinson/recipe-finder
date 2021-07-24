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

// const searchBtnEl = document.querySelector("#search-btn");

let drinkIngredient;


// Add event listeners to close modal
modalBg.addEventListener("click", () => {
    drinkModal.classList.remove("is-active");
})

modalCloseBtn.addEventListener("click", () => {
    drinkModal.classList.remove("is-active");
})

// Add event listeners to make sure only one search parameter can be used (API limitation)
drinkIngredientSearchInputEl.addEventListener("blur", function() {
    console.log("works");
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

randomDrinkSearchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    drinkModal.classList.add("is-active");
    getRandomDrinkRecipe();
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
                console.log(data);
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
                console.log(data);
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
            console.log(data);
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
    console.log(drinkRecipes);
    let allDrinkRecipes = [];
    modalContentEl.innerHTML = "";

    // Loop through recipe to create an object of necessary info for each recipe, and add it to the allDrinkRecipes array
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
        console.log(nextDrinkRecipe);

        allDrinkRecipes.push(nextDrinkRecipe);

        // getDrinkIngredientRecipe(nextDrinkRecipe.id, nextDrinkRecipe.name);

        // function getDrinkIngredientRecipe(drinkId, drinkName) {
        //     fetch(drinkURL + "lookup.php?i=" + drinkId)
        //         .then(function (response) {
        //             if (response.ok) {
        //                 return response.json();
        //             }
        //         })
        //         .then(function (data) {
        //             if (data.count !== 0) {
        //                 console.log(data);

        //                 console.log(newName);
        //                 console.log(`https://www.thecocktaildb.com/drink/${drinkId}-${newName}-Cocktail`);
        //                 showDrinkRecipes(data);
        //             }
        //         })
        // }



        // Create elements
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
        // saveButton.setAttribute("type", "submit");
        saveButton.setAttribute("class", "button is-info");
        saveButton.textContent = "SAVE ME!";

        // saveButton.setAttribute("data-index", i);
        // console.log(saveButton);

        // Append
        modalContentEl.appendChild(nextCard);
        nextCard.appendChild(nextImageDiv);
        nextCard.appendChild(nextCardContentDiv);
        nextImageDiv.appendChild(nextFigure);
        nextFigure.appendChild(nextImage);

        nextCardContentDiv.appendChild(nextMediaDiv);
        nextCardContentDiv.appendChild(saveButton);
        nextMediaDiv.appendChild(nextMediaContent);
        nextMediaContent.appendChild(nextRecipeName);
        nextMediaContent.appendChild(nextRecipeURL);
        nextRecipeURL.appendChild(nextLink);
        

        
    }
    console.log(allDrinkRecipes);
}
