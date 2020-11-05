'use strict';


var product = [];
var totalClicksAllowed = 25;
var clicks = 0;
var myContainer = document.getElementById('container');
var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');
var myList = document.getElementById('list');
var ctx = document.getElementById('myChart').getContext('2d');

// constructor
function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  product.push(this);
}
// function
function getRandomProductIndex() {
  return Math.floor(Math.random() * product.length);
}

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

function renderProduct() {
  var productOne = getRandomProductIndex();
  var productTwo = getRandomProductIndex();
  var productThree = getRandomProductIndex();

  while (productOne === productTwo) {
    productTwo = getRandomProductIndex();

  }

  imgOne.src = product[productOne].src;
  imgOne.alt = product[productOne].name;
  product[productOne].views++;

  imgTwo.src = product[productTwo].src;
  imgTwo.alt = product[productTwo].name;
  product[productTwo].views++;

  imgThree.src = product[productThree].src;
  imgThree.alt = product[productThree].name;
  product[productThree].views++;
}
function renderResults() {
  for (var i = 0; i < product.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${product[i].name} had ${product[i].votes} votes, and was seen ${product[i].views} times.`;
    myList.appendChild(li);
  }
}

renderProduct();

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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
      }]
    }
  }
});

function handleClick(event) {
  var clickedProduct = event.target.alt;
  clicks++;

  for (var i = 0; i < product.length; i++) {
    if (clickedProduct === product[i].name) {
      product[i].votes++;
    }
  }

  renderProduct();
  if (clicks === totalClicksAllowed) {
    myContainer.removeEventListener('click', handleClick);
    renderResults();
  }
}



myContainer.addEventListener('click', handleClick);
