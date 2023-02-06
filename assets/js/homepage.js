var marvelKey = "910ff7a2993b594f4e47981e53b2dfbf";
var OMDbKey = "558d2320";

var searchFormEl = document.querySelector('.search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  if (!searchInputVal) {
    console.error('You need a search input value!');
    // $(function(){
    //   document.$('#modal1').modal();
    // });
    return;
  }

  var queryString = './result.html?q=' + searchInputVal;
  location.assign(queryString);
 
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
