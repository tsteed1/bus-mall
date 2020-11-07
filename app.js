'use strict';


var allProducts = [];
var totalClicksAllowed = 25;
var clicks = 0;
var renderQ = [];
var myContainer = document.getElementById('images');
var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');
var myList = document.getElementById('list');
var ctx = document.getElementById('myChart').getContext('2d');
var nameArray = [];
var votesArray = [];
var viewsArray = [];

// constructor
function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}
// function
function getRandomProductIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

var retrievedResults = localStorage.getItem('productResults');

if (retrievedResults) {
  var parsedRetrievedResults = JSON.parse(retrievedResults);
  allProducts = parsedRetrievedResults;
} else {
  // exectuable code
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('usb');
  new Product('water-can');
  new Product('wine-glass');
}


function populateQue() {
  while (renderQ.length > 0) {
    renderQ.pop();
  }
  while (renderQ.length < 6) {
    var item = randomItem();
    while (renderQ.includes(item)) {
      item = randomItem();
  }
  renderQ.push(item);
}

function renderProduct() {
  var productOne = getRandomProductIndex();
  var productTwo = getRandomProductIndex();
  var productThree = getRandomProductIndex();

  while (productOne === productTwo) {
    productTwo = getRandomProductIndex();
  }
  imgOne.src = allProducts[productOne].src;
  imgOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imgTwo.src = allProducts[productTwo].src;
  imgTwo.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;

  imgThree.src = allProducts[productThree].src;
  imgThree.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
}
function renderResults() {
  for (var i = 0; i < allProducts.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times.`;
    myList.appendChild(li);
  }
}

renderProduct();

function grabData() {
  for (var i = 0; i < allProducts.length; i++) {
    votesArray.push(allProducts[i].votes);
    viewsArray.push(allProducts[i].views);
    nameArray.push(allProducts[i].name);
  }
}

function handleClick(event) {
  var clickedProduct = event.target.alt;
  clicks++;

  for (var i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }

  renderProduct();
  if (clicks === totalClicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    makeChart();
    renderResults();

    var stringifiedResults = JSON.stringify(allProducts);
    localStorage.setItem('productResults', stringifiedResults);
  }
}

function makeChart() {
  grabData();
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [{
        label: '# of Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: '# of Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
      }
    }
  });
}

myContainer.addEventListener('click', handleClick);