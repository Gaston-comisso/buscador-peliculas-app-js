document.getElementById('searchButton').addEventListener('click', searchMovies);

let api_key = '239516f5a1c28298aad1baf6ad030a14';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w500';

function searchMovies() {
    // Mueve esta línea para definir resultContainer dentro de la función searchMovies
    let resultContainer = document.getElementById('results');
    resultContainer.innerHTML = 'Cargando...';  // Mensaje mientras se cargan los resultados

    let searchInput = document.getElementById('searchInput').value;

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovie(response.results));
}

function displayMovie(movies) {
    let resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda</p>';
        return;
    }

    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let title = document.createElement('h2');
        title.textContent = movie.title;

        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let posterPath = urlImg + movie.poster_path;
        let poster = document.createElement('img');
        poster.src = posterPath;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        resultContainer.appendChild(movieDiv);
    });
}
