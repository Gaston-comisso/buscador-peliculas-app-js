document.getElementById('searchButton').addEventListener('click', searchMovies);
document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchMovies();
  }
});

let api_key = '239516f5a1c28298aad1baf6ad030a14';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w500';

function searchMovies(page = 1) {
  let resultContainer = document.getElementById('results');
  resultContainer.innerHTML = '<div class="loading"></div>'; // Spinner de carga

  let searchInput = document.getElementById('searchInput').value;

  fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}&page=${page}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      return response.json();
    })
    .then(response => {
      displayMovie(response.results);
      currentPage = page;
      updatePagination(response.total_pages);
    })
    .catch(error => {
      resultContainer.innerHTML = '<p>Hubo un error al realizar la búsqueda. Inténtalo de nuevo.</p>';
      console.error(error);
    });
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
    releaseDate.textContent = 'Lanzamiento: ' + new Date(movie.release_date).toLocaleDateString();

    let rating = document.createElement('p');
    rating.textContent = `⭐ Calificación: ${movie.vote_average}`;

    let overview = document.createElement('p');
    overview.textContent = movie.overview;

    let readMore = document.createElement('span');
    readMore.textContent = 'Leer más';
    readMore.classList.add('read-more');
    readMore.addEventListener('click', () => {
      overview.classList.toggle('expanded');
      readMore.textContent = overview.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
    });

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement('img');
    poster.src = posterPath;
    poster.alt = `Poster de ${movie.title}`;

    let moreButton = document.createElement('button');
    moreButton.textContent = 'Más información';
    moreButton.addEventListener('click', () => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank'));

    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(rating);
    movieDiv.appendChild(overview);
    movieDiv.appendChild(readMore);
    movieDiv.appendChild(moreButton);

    resultContainer.appendChild(movieDiv);
  });
}

let currentPage = 1;

function updatePagination(totalPages) {
  let pagination = document.createElement('div');
  pagination.classList.add('pagination');

  // Crear botones de paginación con estilo
  if (currentPage > 1) {
    let prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.classList.add('pagination-button');
    prevButton.addEventListener('click', () => searchMovies(currentPage - 1));
    pagination.appendChild(prevButton);
  }

  if (currentPage < totalPages) {
    let nextButton = document.createElement('button');
    nextButton.textContent = 'Siguiente';
    nextButton.classList.add('pagination-button');
    nextButton.addEventListener('click', () => searchMovies(currentPage + 1));
    pagination.appendChild(nextButton);
  }

  // Añadir la barra de paginación al contenedor
  let resultContainer = document.getElementById('results');
  resultContainer.appendChild(pagination);

  // Asegurar que los botones estén alineados correctamente
  pagination.style.display = 'flex';
  pagination.style.justifyContent = 'center';
  pagination.style.marginTop = '20px';
}

