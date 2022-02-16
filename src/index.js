import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import AmazonService from './js/amazonService.js';
import Player from './js/gameLogic.js';

let player1 = new Player(3, 0, 0); 

function displayErrors(error) {
  $("#errors").html(error);
}

function refreshHearts() {
  if (player1.hearts === 2) {
    $(".heart-3").hide();
    $("#wrong-guess").html("You went over, and lost a heart!");
  } else if (player1.hearts === 1) {
    $(".heart-2").hide();
  }
}

function displayProduct(productArray, i) {
  $("#active-game").removeClass("hidden");
  $("#intro").addClass("hidden");
  $("#score").html(player1.points);
  refreshHearts();
  $("#item-title").html(productArray[i].title);
  $(".item-image").attr('src', `${productArray[i].image}`);
}

function displayPrice(userGuess, itemPrice) {
  player1.guessCheck(userGuess, itemPrice);
  $("#actual-price").html("$"+itemPrice);
  $("#user-guess").html("$"+userGuess);
  $("#won-points").html(player1.points);
  refreshHearts();
  $("#active-game").addClass("hidden");
  $("#result").removeClass("hidden"); 
}

function loadScreen() {
  $(".container").addClass("hidden");
  $("#intro").addClass("hidden");
  $(".load-screen").fadeIn();
  setTimeout(function(){$(".load-screen").fadeOut();}, 4000);
  setTimeout(function(){$(".container").removeClass("hidden");}, 4000);
  setTimeout(function(){$("#active-game").removeClass("hidden");}, 4000);
}

$(document).ready(function() { 
  let productArray;
  let i = 0;
  $("#start-game").on('click', function() {
    $("#video")[0].src += "?autoplay=1";
    loadScreen();
    let searchCategory = $("input:radio[name=searchCategory]:checked").val(); // Add in Category selection
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

  $("#guess-button").on('click', function(){ // for submitting guessed price for each item
    let userGuess = $("#price-guess").val();
    $("#price-guess").val("");
    let itemPrice = productArray[i].price.value;
    displayPrice(userGuess, itemPrice);
  });

  $("#new-product").on('click', function(){ // for switching out the product and hiding the results screen
    i ++; // global variable increments every time time the function is called
    $("#results-screen").hide();
    displayProduct(productArray, i);
  });

});