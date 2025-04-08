let currentPage = 1;
let currentCategory = 'now_playing';
let totalPages = 1;
let isSearchMode = false;
let searchQuery = '';

function fetchMovies(category, page = 1) {
  const url = isSearchMode 
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchQuery}&page=${page}`
    : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&region=KR&page=${page}`;

  $.ajax({
    url: url,
    method: 'GET',
    success: function(response) {
      $('#movie-list').empty();
      totalPages = response.total_pages;

      response.results.forEach(function(movie) {
        if (movie.poster_path) {
          const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          const html = `
            <div class="movie" data-id="${movie.id}">
              <h3>${movie.title}</h3>
              <img src="${posterUrl}" alt="${movie.title}">
              <p>개봉일: ${movie.release_date}</p>
              ${currentCategory !== 'upcoming' ? `<p>평점: ${movie.vote_average}</p>` : ''}
            </div>
          `;
          $('#movie-list').append(html);
        }
      });

      renderPagination();
    }
  });
}

function renderPagination() {
  $('#page-numbers').empty();

  let startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  let endPage = Math.min(startPage + 4, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    $('#page-numbers').append(`<button class="page-btn ${i === currentPage ? 'active' : ''}">${i}</button>`);
  }
}

function fetchMovieDetail(id) {
  const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`;

  $.when(
    $.get(detailUrl),
    $.get(creditsUrl)
  ).done(function(detailResponse, creditsResponse) {
    const movie = detailResponse[0];
    const credits = creditsResponse[0];

    const director = credits.crew.find(person => person.job === 'Director');
    const castList = credits.cast.slice(0, 5).map(actor => actor.name).join(', ');

    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : '';

    const html = `
      <div>
        <img src="${posterUrl}" alt="${movie.title}">
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
        ${currentCategory !== 'upcoming' ? `<p><strong>평점</strong>: ${movie.vote_average}</p>` : ''}
        <p><strong>감독:</strong> ${director ? director.name : '정보 없음'}</p>
        <p><strong>출연진:</strong> ${castList}</p>
        <button onclick="$('#movie-modal').hide()">닫기</button>
      </div>
    `;

    $('#modal-content').html(html);
    $('#movie-modal').show();
  });
}

$(document).on('click', '.category-btn', function() {
  currentCategory = $(this).data('category');
  currentPage = 1;
  isSearchMode = false;
  fetchMovies(currentCategory, currentPage);
});

$(document).on('click', '.page-btn', function() {
  currentPage = parseInt($(this).text());
  fetchMovies(currentCategory, currentPage);
});

$('#prev-btn').click(function() {
  if (currentPage > 5) {
    currentPage -= 5;
  } else {
    currentPage = 1;
  }
  fetchMovies(currentCategory, currentPage);
});

$('#next-btn').click(function() {
  if (currentPage + 5 <= totalPages) {
    currentPage += 5;
  } else {
    currentPage = totalPages;
  }
  fetchMovies(currentCategory, currentPage);
});

$('#search-btn').click(function() {
  searchQuery = $('#search-input').val().trim();
  if (searchQuery) {
    currentPage = 1;
    isSearchMode = true;
    fetchMovies(null, currentPage);
  }
});

$("#search-input").on("keyup", function(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    $("#search-btn").click();
  }
});

$('#movie-modal').click(function(e) {
  if ($(e.target).is('#movie-modal')) {
    $(this).hide();
  }
});

$(document).on('click', '.movie', function() {
  const movieId = $(this).data('id');
  fetchMovieDetail(movieId);
});

$(document).ready(function() {
  fetchMovies(currentCategory, currentPage);
});

