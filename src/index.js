import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import AmazonService from './js/amazonService.js';
import Player from './js/gameLogic.js';
let player1 = new Player(3, 0); 


function displayErrors(error) {
  $("#errors").html(error);
}

function displayProduct(productArray, i) {
  $(".title").html(productArray[i].title);
  $(".image").html(`<img src='${productArray[i].image}' alt='${productArray[i].title}'>`);
  $(".price").html(`$${productArray[i].price.value}`);
}

function displayPrice(userGuess) {
  player1.guessCheck(userGuess);
  $("#results-screen").show(); 
  // this is for showing the price of the product and and users points gained from guess on a results screen
}

$(document).ready(function() { 
  let productArray;
  let i = 0;
  $("#start-game").on('click', function() {
    $("#video")[0].src += "?autoplay=1";
    let searchCategory = //Add in Category selection buttons with endpoint values
    AmazonService.makeAPICall(searchCategory).then(function(response) {
      if (response instanceof Error) {
        throw Error(`There was an unexpected error: ${response.message}`);
      }
      productArray = response.bestsellers;
      displayProduct(productArray, i);
    }) .catch(function(error) {
      displayErrors(error.message);
    });
  });
  $("#submit-price").on('click', function(){ // for submitting guessed price for each item
    let userGuess = $("#price-guess").val();
    displayPrice(userGuess);
  });
  $("#newProduct").on('click', function(){ // for switching out the product and hiding the results screen
    i ++; // global variable increments every time time the function is called
    $("#results-screen").hide();
    displayProduct(productArray);
  });

});