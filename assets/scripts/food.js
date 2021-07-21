// Element variables from food.html
const foodSearchFormEl = document.querySelector("#food-search-form");
const ingredientSearchInput = document.querySelector("#food-ingredient-search-input");

const foodDropdownTextEl = document.querySelector("#food-dropdown-text");
const foodDropdownItems = document.querySelectorAll(".food-dropdown-item");

let ingredient;

const foodSearchBtn = document.getElementById("food-return");
const modalCloseBtn = document.getElementById("close-modal");
const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");

foodSearchBtn.addEventListener("click", () => {
    modal.classList.add('is-active');
})

modalCloseBtn.addEventListener("click", () => {
    modal.classList.remove('is-active');
})

modalBg.addEventListener("click", () => {
    modal.classList.remove('is-active');
})


// Event listener for dropdown menu to change text upon selection
for (let i = 0; i < foodDropdownItems.length; i++) {
    foodDropdownItems[i].addEventListener("click", function(event) {
        event.preventDefault();
        foodDropdownTextEl.textContent = event.target.textContent;
    })
}


// Adds conditional to prevent errors on landing page
if (foodSearchFormEl !== null) {
    foodSearchFormEl.addEventListener("submit", function(event) {
        event.preventDefault();
        ingredient = ingredientSearchInput.value;
        ingredientSearchInput.value = "";
        modal.classList.add('is-active');
        
        
    })
}

// Variables for food recipe search API
const foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const appIDKey = "&app_id=99f65177&app_key=ecb411eb41e5416150875af0c19ffec7";

// Gets data from Edamam API
function getFoodRecipe(ingredient) {
    fetch(foodURL + ingredient + appIDKey)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(data) {
            if (data.count !== 0) {
                showRecipes(data.hits);
            }
        })
}

// Display recipes on cards within modal
function showRecipes(recipes) {
    console.log(recipes);
    let allFoodRecipes = [];

    // Loop through recipe to create an object of necessary info for each recipe, and add it to the allFoodRecipes array
    for (let i = 0; i < recipes.length; i++) {

        let nextRecipe = {
            name: recipes[i].recipe.label,
            image: recipes[i].recipe.image,
            url: recipes[i].recipe.url
        }

        allFoodRecipes.push(nextRecipe);

        // Create elements

        // Section element created just for testing
        let nextSection = document.createElement("section");

        let nextCard = document.createElement("article");
        nextCard.setAttribute("class", "card");

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

        // Append
        nextSection.appendChild(nextCard);
        nextCard.appendChild(nextImageDiv);
        nextCard.appendChild(nextCardContentDiv);
        nextImageDiv.appendChild(nextFigure);
        nextFigure.appendChild(nextImage);
        
        nextCardContentDiv.appendChild(nextMediaDiv);
        nextMediaDiv.appendChild(nextMediaContent);
        nextMediaContent.appendChild(nextRecipeName);
        nextMediaContent.appendChild(nextRecipeURL);

        nextSection.style.display = "block";


    }
    console.log(allFoodRecipes);

    // TODO:
    
    // Define and show modal

    // Loop through each recipe, creating card elements for each one, adding the necessary info to each card
}