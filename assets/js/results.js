var marvelKey = "910ff7a2993b594f4e47981e53b2dfbf";
var OMDbKey = "558d2320";

var query = document.location.search.split('=')[1];
var comicSpan = document.querySelector('#comics');
var movieSpan = document.querySelector('#movies');
var movieContent = document.querySelector('#movie-content');
var historyButtonsEl = document.querySelector('#history-buttons');
var dataCount;


    function searchApi (query) {
        var marvelApi = "https://gateway.marvel.com:443/v1/public/characters?name=" + query + "&limit=10&apikey=" + marvelKey;
        var name;
        var comicData;
        var description;

        fetch(marvelApi)
        .then(function (response) {
        response.json().then(function (data) {
                console.log('data', data);
                dataCount = data.data.count;
                console.log(dataCount);
                name = data.data.results[0].name;

                var saveName = function(name) {
                    var previousSaveHistory = JSON.parse(localStorage.getItem('save-history')) || [];
                    if (previousSaveHistory.includes(name)) {
                        return;
                    } else {
                    previousSaveHistory.push(name);
                    localStorage.setItem('save-history', JSON.stringify(previousSaveHistory));
                    }
                };

            if (dataCount === 0) {
                $(document).ready(function(){
                    $('#modal2').modal().modal('open');
                  });
                  return;
            } else {
                searchOMDb(query);
                saveName(name);
            }

            comicSpan.innerHTML = " ";
            
            description = data.data.results[0].description;
            console.log(description);

            var descriptionCard = document.createElement('div');
            descriptionCard.classList.add('card-panel', 'red', 'darken-4');

            var descriptionBody = document.createElement('span');
            descriptionBody.classList.add('white-text');
            descriptionCard.append(descriptionBody);

            var descriptionTitle = document.createElement('h3')
            descriptionTitle.innerHTML = 'Description'


            var descriptionContent = document.createElement('p');
            descriptionContent.innerHTML =
                 description;

            if (!description) {
                descriptionContent.innerHTML =
                    'No Description available.'
            }

            descriptionBody.append(descriptionTitle, descriptionContent);
            comicSpan.append(descriptionCard);

            var comicCard = document.createElement('div');
            comicCard.classList.add('card-panel', 'red', 'darken-4');

            var comicTitle = document.createElement('h3');
            comicTitle.innerHTML = "Comics";
            comicCard.append(comicTitle);
            

        for (let i = 0; i < data.data.results[0].comics.items.length; i++){
            comicData = data.data.results[0].comics.items[i].name;
          
            var cardBody = document.createElement('ul');
            cardBody.classList.add('white-text');
            comicCard.append(cardBody);

            var bodyContentEl = document.createElement('li');
            bodyContentEl.innerHTML =
              comicData;
          
            cardBody.append(bodyContentEl);

            comicSpan.append(comicCard);
        }
            })
        
    })
};

function searchOMDb (query) {
    var OMDbApi = "https://www.omdbapi.com/?apikey=" + OMDbKey + "&t=" + query;
        fetch(OMDbApi)
        .then(function (response) {
        response.json().then(function (data) {
            console.log('data', data);
            var title = data.Title;
            console.log('title', title);
            var year = data.Year;
            console.log('year', year);
            var plot = data.Plot
            var poster = data.Poster;

            movieSpan.innerHTML = " ";

            var plotCard = document.createElement('div');
            plotCard.classList.add('card-panel', 'red', 'darken-4');

            var plotBody = document.createElement('span');
            plotBody.classList.add('white-text');
            plotCard.append(plotBody);

            var plotTitle = document.createElement('h3');
            plotTitle.innerHTML =
                title + ' ' + year;
            var plotContent = document.createElement('p');
            plotContent.innerHTML = plot;

            plotBody.append(plotTitle, plotContent);
            movieSpan.append(plotCard);

            var posterImage = " ";
            posterImage = document.querySelector('#poster-img');
            posterImage.src = poster;
            posterImage.style.marginLeft = "100px";
            posterImage.style.border = "8px solid #B71C1C";
            posterImage.style.borderRadius = "5px";

            var type = data.Type;
            var actors = data.Actors;
            console.log('actors', actors);
            var director = data.Director;
            console.log('director', director);
            var writer = data.Writer;
            console.log('writers', writer);
            var awards = data.Awards;
            console.log('awards', awards);
            var boxOffice = data.BoxOffice;
            console.log('box office', boxOffice);
            var imdbRating = data.imdbRating;
            console.log('imdb rating', imdbRating);

            movieContent.innerHTML = " ";

            var movieCard = document.createElement('div');
            movieCard.classList.add('card-panel', 'red', 'darken-4');

            var movieBody = document.createElement('span');
            movieBody.classList.add('white-text', 'flow-text');
            movieCard.append(movieBody);

            var movieText = document.createElement('p');
            movieText.innerHTML = 
                "<b>Type: </b>" + type + "<br/>";
            movieText.innerHTML += 
                "<b>Actors: </b>" + actors + "<br/>";
            movieText.innerHTML += 
                "<b>Director: </b>" + director + "<br/>";
            movieText.innerHTML +=
                "<b>Writers: </b>" + writer + "<br/>";
            movieText.innerHTML +=
                "<b>Awards: </b>" + awards + "<br/>";
            movieText.innerHTML +=
                "<b>Box Office: </b>" + boxOffice + "<br/>";
            movieText.innerHTML += 
                "<b>IMDb Rating: </b>" + imdbRating+ "<br/>";

            movieBody.appendChild(movieText);
            movieContent.append(movieCard);

            })  
        })
    };

    var saveHistory = function() {
        historyButtonsEl.innerHTML = " ";

        var historyTitle = document.createElement('h5');
        historyTitle.innerHTML = "Search History";
        historyButtonsEl.append(historyTitle);

        var history = JSON.parse(localStorage.getItem('save-history'));
       
    if(history) {
        for (let i = 0; i < history.length; i++) {
          const character = history[i];
          
        var historyButton = document.createElement('button');
        var buttonText = document.createTextNode(character);
      
        historyButton.setAttribute('value', value = character);
        historyButton.appendChild(buttonText);
        historyButton.classList.add('waves-effect', 'waves-light', 'red', 'darken-4', 'btn');
        historyButton.style.margin = '5px';
      
        historyButtonsEl.appendChild(historyButton);
        }
    }
    }

      var buttonClickHandler = function (event) {
        var query = event.target.getAttribute('value','button');
       
        searchApi(query);
        searchOMDb(query); 
    };

historyButtonsEl.addEventListener('click', buttonClickHandler);
searchApi(query);
saveHistory();


