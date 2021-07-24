// Element variables from food.html
const foodSearchFormEl = document.querySelector("#food-search-form");
const ingredientSearchInput = document.querySelector("#food-ingredient-search-input");
const dietSelectEl = document.querySelector("#diet-select");
const timeSelectEl = document.querySelector("#cook-time-select");

// Variables for modal
const foodModal = document.querySelector("#food-modal");
const modalCloseBtn = document.querySelector("#close-modal");
const modalBg = document.querySelector(".modal-background");
const modalContentEl = document.querySelector("#modal-content-container");

// Initiate these variables globally for use in multiple functions
let ingredient;
let diet;
let time;

// local storage section
let savedFood = JSON.parse(localStorage.getItem("userFavorites") || "[]");


// Add event listeners to close modal
modalCloseBtn.addEventListener("click", () => {
    foodModal.classList.remove('is-active');
})

modalBg.addEventListener("click", () => {
    foodModal.classList.remove('is-active');
})


// Add event listener to food search form
foodSearchFormEl.addEventListener("submit", function(event) {
    event.preventDefault();

    ingredient = ingredientSearchInput.value.trim();
    diet = dietSelectEl.value;
    time = timeSelectEl.value;
    console.log(diet);
    console.log(typeof(diet));
    console.log(time);
    console.log(typeof(time));

    if (diet === "Choose preferred diet (optional)") {
        diet = undefined;
    }
    if (time === "Choose preferred cook time (optional)") {
        time = undefined;
    }

    ingredientSearchInput.value = "";
    foodModal.classList.add('is-active');
    getFoodRecipe(ingredient, diet, time);
})

// Variables for food recipe search API
const foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
const appIDKey = "&app_id=99f65177&app_key=ecb411eb41e5416150875af0c19ffec7";

// Gets data from Edamam API
function getFoodRecipe(ingredient, diet, time) {
    if (diet && time) {
        fetch(foodURL + ingredient + appIDKey + "&diet=" + diet + "&time=" + time)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function(data) {
                if (data.count !== 0) {
                    console.log(data);
                    showRecipes(data.hits);
                }
            })
    } else if (diet && !time) {
        fetch(foodURL + ingredient + appIDKey + "&diet=" + diet)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function(data) {
                if (data.count !== 0) {
                    console.log(data);
                    showRecipes(data.hits);
                }
            })
    } else if (!diet && time) {
        fetch(foodURL + ingredient + appIDKey + "&time=" + time)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function(data) {
                if (data.count !== 0) {
                    console.log(data);
                    showRecipes(data.hits);
                }
            })
    } else if (!diet && !time) {
        fetch(foodURL + ingredient + appIDKey)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function(data) {
                if (data.count !== 0) {
                    console.log(data);
                    showRecipes(data.hits);
                }
            })
    }

}

// Display recipes on cards within modal
function showRecipes(recipes) {
    let allFoodRecipes = [];
    modalContentEl.innerHTML = "";

    // Loop through recipe to create an object of necessary info for each recipe, and add it to the allFoodRecipes array
    for (let i = 0; i < recipes.length; i++) {

        let nextRecipe = {
            name: recipes[i].recipe.label,
            image: recipes[i].recipe.image,
            url: recipes[i].recipe.url
        }
        
        allFoodRecipes.push(nextRecipe);

        // Create elements
        let nextSection = document.createElement("section");

        let nextCard = document.createElement("article");
        nextCard.setAttribute("class", "card");
        nextCard.setAttribute("style", "margin-bottom: 1em");

        let nextImageDiv = document.createElement("div");
        nextImageDiv.setAttribute("class", "card-image");
        // nextImageDiv.setAttribute("id", i);
        // // console.log(nextImageDiv);

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

        let saveButton = document.createElement("button");
        saveButton.setAttribute("type", "submit");
        saveButton.setAttribute("data-index", i);
        console.log(saveButton);
        saveButton.innerHTML = "SAVE ME!";



        // Append all elements to their parents
        modalContentEl.appendChild(nextSection);
        nextSection.appendChild(nextCard);
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
        
        saveButton.addEventListener("click", function(event) {
            event.preventDefault();
            
            console.log(event.target.parentNode)
            savedFood.push(allFoodRecipes[i]);
        //    let savedFood = allFoodRecipes[i];
        localStorage.setItem("userFavorites", JSON.stringify(savedFood));
        //    console.log(savedFood);
           // allFoodRecipes[saveButton.getAttribute("data-index")]
           saveButton.innerHTML = "SAVED";
        }  )
           
        //  = function(event) {
        //     event.preventDefault();
            
        //     console.log(event.target.parentNode)
        //    let savedFood = allFoodRecipes[saveButton.getAttribute("data-index")];
        //    console.log(allFoodRecipes[saveButton.getAttribute("data-index")])
        //    saveButton.innerHTML = "SAVED";
            
           
        

        
    }
    console.log(allFoodRecipes);
    // console.log(document.getElementById("1").id)

    //  saveButton.addEventListener("submit", function(event) {
    //      event.preventDefault();

    //     console.log("Hello");
    //  }) 

    

}