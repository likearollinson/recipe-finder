# Welcome to my Weather Dashboard!

#### This is a web application designed using HTML, CSS, JS, Bootstrap, and the Open Weather Map API allowing users to search for the weather in a specific city, and see the current weather and a the 5 day forecast.

## Link to Deployed Site

[Weather Dashboard](https://beardomattix.github.io/Weather-Dashboard/)

## Table of Contents
  * [Motivation and Technologies](#motivation)
  * [Functionality](#functionality)
  * [File Architecture](#file-architecture)
  * [Usage](#usage)

## Motivation

I wanted to create a simple weather app that allows users to input a city and see the current and future weather. The app uses the Open Weather Map API to get the weather information, and it is rendered on the page using JS. The app also allows users to see their previous searches by rendering them in a list below the search bar. When a user clicks on a previous search, they are taken back to the weather information for that city. Users can also click to clear the search history!

#### Technologies
* HTML
* CSS 
* JavaScript
* Bootstrap
* Open Weather Map API

## Functionality

![Weather-DEMO](https://user-images.githubusercontent.com/82903201/125833228-4862c1f1-1a77-4414-a194-bb32068a36ef.gif)
#### The demo shows the main functions of the Weather Dashboard:
* Users search for weather by typing in the name of a city.
* The app makes a call to the open weather API and returns the current weather in the searched city, and a 5 day forecast.  
* Searches are saved in local storage and displayed on the page under the search bar. 
* When a user clicks on a previous search, they given the accurate weather for that city.  

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

## Usage
* Find the current weather of a chosen city. 
* Use this to help understand how to make API calls.
* Use to see how to easlily incorporate Bootstrap into a responsive web application. 

## Future Development
* Use geolocation to show the weather information for the users current location upon page load. 
* Integrate weather maps so users can see the real-time weather map for a specific area. 