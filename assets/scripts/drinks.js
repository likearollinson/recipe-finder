const drinkURL = "https://thecocktaildb.com/api/json/v1/1/";
const drinkSearchFormEl = document.querySelector("#drink-search-form");
const drinkModal = document.querySelector("#drink-modal");
const modalCloseBtn = document.querySelector("#close-modal");
const modalBg = document.querySelector(".modal-background");
const modalContentEl = document.querySelector("#modal-content-container");

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
        getDrinkIngredientInfo(drinkIngredient);
    })
}

function getDrinkIngredientInfo(drinkIngredient) {
    fetch(drinkURL + "filter.php?i=" + drinkIngredient)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(data) {
            if (data.count !== 0) {
                showDrinkRecipes(data);
                console.log(data);
            }
        })
}

// Display recipes on cards within modal
function showDrinkRecipes(drinkRecipes) {
    console.log(drinkRecipes);
    let allDrinkRecipes = [];
    // Loop through recipe to create an object of necessary info for each recipe, and add it to the allFoodRecipes array
    for (let i = 0; i < allDrinkRecipes.length; i++) {

        let nextDrinkRecipe = {
            name: drinkRecipes[i].drinks.strDrink,
            image: drinkRecipes[i].drinks.strDrinkThumb,
            id: drinkRecipes[i].drinks.idDrink
        }

        allDrinkRecipes.push(nextDrinkRecipe);

        function getDrinkIngredientRecipe(drinkIngredient) {
            fetch(drinkURL + "lookup.php?i=" + drinkIngredient)
                .then(function(response) {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(function(data) {
                    if (data.count !== 0) {
                        showDrinkRecipes(data);
                        console.log(data);
                    }
                })
        }

        // Create elements
        let newSection = document.createElement("section");

        let nextCard = document.createElement("article");
        nextCard.setAttribute("class", "card");

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

        // Append
        modalConentEl.appendChild(newSection)
        nextSection.appendChild(nextCard);
        nextCard.appendChild(nextImageDiv);
        nextCard.appendChild(nextCardContentDiv);
        nextImageDiv.appendChild(nextFigure);
        nextFigure.appendChild(nextImage);
        
        nextCardContentDiv.appendChild(nextMediaDiv);
        nextMediaDiv.appendChild(nextMediaContent);
        nextMediaContent.appendChild(nextRecipeName);;

        nextSection.style.display = "block";


    }
}

// getDrinkRecipe()
