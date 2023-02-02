var marvelKey = "910ff7a2993b594f4e47981e53b2dfbf";
var OMDbKey = "558d2320";

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getSearch () {
    var query = document.location.search
    
    searchApi(query);
    }
    
    
    function searchApi (query) {
        var marvelApi = "https://gateway.marvel.com:443/v1/public/characters?name=" + query + "&apikey=" + marvelKey;
        var OMDbApi = "http://www.omdbapi.com/?apikey=" + OMDbKey + "t=" + query;

        fetch(marvelApi)
        .then(function (response) {
          if (!response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })
        fetch(OMDbApi)
        .then(function (response) {
        if (!response.ok) {
        response.json().then(function (data) {
            console.log(data);
            })
        }
    })
};


