# Welcome to Skillet and Shaker! Your one stop spot to find food and drink recipes.

#### This is a web application designed using HTML, CSS, JS, Bulma, the Edamam food recipe finding API, and the CocktailDB API allowing users to search for drink recipes, ad save the results.

## Link to Deployed Site

[Skillet and Shaker](https://likearollinson.github.io/recipe-finder/)

## Table of Contents
  * [Motivation and Technologies](#motivation)
  * [Functionality](#functionality)
  * [File Architecture](#file-architecture)
  * [Challenges](#challenges)
  * [Usage](#usage)

## Motivation

As a team, we aimed to create a web application where users who are looking for cocktail or food recipes in a simple and easy to use fashion. We wanted the users to be able to search by simple parameters to find the recipe(s) they are looking for.  An added feature is that users can save search results with a simgle click, and revisit them whenever they want. The design concept is simple, easy to navigate, and consistent across all pages.

#### Technologies
* HTML
* CSS 
* JavaScript
* Bulma
* Edamam Recipe API
* CocktailDB Recipe API

## Functionality

![landing-demo](https://user-images.githubusercontent.com/82903201/126918471-c28a7faf-e0cb-42d7-85e3-731ce9bdb95e.gif)
![food-search-demo](https://user-images.githubusercontent.com/82903201/126918472-297fd7f9-78dd-4054-bf97-826d5cadbcc3.gif)
![drink-search-demo](https://user-images.githubusercontent.com/82903201/126918473-6e669972-6cad-45ee-96f9-62901c6fe355.gif)
#### The demo shows the main functions of Skillet and Shaker recipe finder:
* The landing page introduces the site, has buttons to navigate to Food and Drink search pages, and includes a "Featured Recipes" section for users who prefer not to spend time searching.
* Users click on either "Search Food" or "Drink Search" in the navbar which leads them to a page for finding food recipes or drink recipes by certain search parameters. 
* On the "Search Food" page, the user is presented with a search form with the parameters of ingredient, diet, and cooktime.  
* The user must enter an ingredient, but can select a preferred diet type and cooktime from dropdown menus.
* Recipes are shown in a modal with multiple cards displaying a picture of the dish, the name of the dish, a link to the recipe, and a save recipe button. 
* If the user hits the save recipe button, the recipe card is shown at the bottom of the page along with any other recipes that have been previously saved. These saved items are stored in local storage.
* The favorites sections have a "Clear" button for users to reset their favorites.
* The "Search Drinks" page functions in the same fashion as the "Search Food" page, except that the search parameters are  ingredient, cocktail name, and a button to show a random cocktail recipe.

## File Architecture
```
├── README.md
├── assets
│   ├── images
│   │   ├── background-food.jpg
│   │   ├── burger.jpg
│   │   ├── favicon.png
│   │   ├── food-hero-image.jpg
│   │   ├── hero-image.jpg
│   │   └── old-fashioned.jpg
│   ├── scripts
│   │   ├── drinks.js
│   │   ├── food.js
│   │   └── main.js
│   └── styles
│       ├── drinks.css
│       ├── food.css
│       └── style.css
├── index.html
└── pages
    ├── drinks.html
    └── food.html
```
## Challenges
The major challenge we faced with the development of this application was dealing with github merge conflicts and making sure we weren't all working on the same sections at the same time.

## Usage
* Find food and drink recipes based on certain parameters. 
* Use this to help understand how to make API calls.
* Save search results and return to them as needed.
* Use to see how to incorporate Bulma into a responsive web application.
* Learn how to develop a web application in a group and use github in a group setting. 

## Future Development
* Refine the favorites section and create a digital recipe book that users can download.
* Further develop the API calls and display full recipes on the page.
* Create a stylized recipe book using Bulma and CSS.
* Unify the JS code across pages for easier use.
* Use "On load" API calls to reduce the amount of stale data on the page.
* Create a specific page for favorite recipes.
* Optimize dynamic creation, searches, and functions 