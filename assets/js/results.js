var marvelKey = "910ff7a2993b594f4e47981e53b2dfbf";
var OMDbKey = "558d2320";

var query = document.location.search.split('=')[1];
var comicContent = document.querySelector('#comics');
var movieContent = document.querySelector('#movies');
var comicSpan = document.querySelector('#comics')
var movieSpan = document.querySelector('#movies')
var movieContent = document.querySelector('#movie-content')
    

    function searchApi (query) {
        var marvelApi = "https://gateway.marvel.com:443/v1/public/characters?name=" + query + "&limit=10&apikey=" + marvelKey;
        var OMDbApi = "https://www.omdbapi.com/?apikey=" + OMDbKey + "&t=" + query;
        var comicData;
        var description;

        fetch(marvelApi)
        .then(function (response) {
        response.json().then(function (data) {
                console.log('data', data);
            description = data.data.results[0].description;
            console.log(description)
         

            var descriptionCard = document.createElement('div');
            descriptionCard.classList.add('card-panel', 'red', 'darken-4');

            var descriptionBody = document.createElement('span');
            descriptionBody.classList.add('white-text');
            descriptionCard.append(descriptionBody);

            var descriptionContent = document.createElement('p');
            descriptionContent.innerHTML =
                'Description: ' + description;

            descriptionBody.append(descriptionContent);
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

            document.querySelector('#poster-img').src = poster;

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

            var movieCard = document.createElement('div');
            movieCard.classList.add('card-panel', 'red', 'darken-4');

            var movieBody = document.createElement('span');
            movieBody.classList.add('white-text');
            movieCard.append(movieBody);

            var movieText = document.createElement('p');
            movieText.innerHTML = 
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

            movieBody.append(movieText);
            movieContent.append(movieCard);

            })
        
    })
};

searchApi(query);