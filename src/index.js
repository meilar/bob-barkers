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

function displayProduct(productArray, i) {
  $("#score").html(player1.points);
  $("#item-name").html(productArray[i].title);
  $("#item-image").attr('src', `${productArray[i].image}`);
  if (player1.hearts === 2) {
    $("#heart1").hide();
  } else if (player1.hearts === 1) {
    $("#heart2").hide();
  } else if (player1.hearts == 0) {
    $("#heart3").hide();
  }
}

function displayPrice(userGuess, price) {
  let points = player1.guessCheck(userGuess);
  $("#price").html("$"+price);
  $("guessed").html("$"+userGuess);
  $("#won-points").html(points);
  $("#result").show(); 
}

$(document).ready(function() { 
  let productArray;
  let i = 0;
  $("#start-game").on('click', function() {
    $("#video")[0].src += "?autoplay=1";

    $("#intro").hide();
    $(".load-screen").fadeIn();
    setTimeout(function(){$(".load-screen").fadeOut();}, 3000);
    setTimeout(function(){$("#intro").show();}, 30000);

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
  $("#submit-price").on('click', function(){ // for submitting guessed price for each item
    let userGuess = $("#price-guess").val();
    let price = productArray[i].price.value;
    displayPrice(userGuess, price);
  });
  $("#new-product").on('click', function(){ // for switching out the product and hiding the results screen
    i ++; // global variable increments every time time the function is called
    $("#results-screen").hide();
    displayProduct(productArray);
  });

});