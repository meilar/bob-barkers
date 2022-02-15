import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import AmazonService from './js/amazonService.js';

function displayErrors(error) {
  $("#errors").html(error);
}

function displayProduct(response) {
  // format the response in some way
  let i = Math.floor(Math.random() * 50);
  $(".title").html(response.bestsellers[i].title);
  $(".image").html(`<img src='${response.bestsellers[i].image}' alt='${response.bestsellers[0].title}'>`);
  $(".price").html(`$${response.bestsellers[i].price.value}`);
}

$(document).ready(function() {
  $("#start-game").on('click', function() {
    let searchCategory = //Add in Category selection buttons with endpoint values
    AmazonService.makeAPICall(searchCategory).then(function(response) {
      if (response instanceof Error) {
        throw Error(`There was an unexpected error: ${response.message}`);
      }
      displayProduct(response);
    }) .catch(function(error) {
      displayErrors(error.message);
    });
  });
});