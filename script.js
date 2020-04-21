const renderMovies = movies => {
    document.querySelector('main.movies').innerHTML = ''
    for (const movie of movies) {
        document.querySelector('main.movies').innerHTML+= getMovieHtml(movie)
    }     
}

const getMovieHtml = movie =>{
    return `
    <div class="movie" onclick="getMovieDetailed(${movie.id})">
           <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="Imagen de la película">
           <h2>${movie.title}</h2>
        </div>
    `
}

const getMovieDetailedHtml = movie =>{
    return `
    <div class="detailed">
        <div class="row1">
            <div class="img">
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="Imagen de la película">
            </div>
            <span class="title">
                <p><strong>${movie.title}</strong></p>
                <br>
                <p>Puntuación:</p>
                <p>${movie.vote_average}</p>
            </span>
        </div>
        <div class="row2">
            <div class="description">
                <p><strong>Descripción:</strong></p>
                <br>
                <p>${movie.overview}</p>
            </div>
        </div>
     </div>
    `
}

const getMovieDetailed = movie_id => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES`)
    .then(res=>{
        const movie = res.data
        document.querySelector('main.movies').innerHTML = getMovieDetailedHtml(movie)
    })
    .catch(console.error)
}

const getLastestMovies = async () => {
    
    try {
        const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES');
        const movies = res.data.results;
        renderMovies(movies);
    } catch (error) {
        console.error(error);
    }
}

const getPopularMovies =()=>{
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES')
    .then(res=>res.json())
    .then(res=>{
        const movies = res.results;
        renderMovies(movies);
    })
    .catch(error=>console.error(error))
}

const clean = async () => {
    try {
        document.querySelector('main.movies').innerHTML = ''
        document.querySelector('main.movies').innerHTML = `
        <div class="inicio">
           <p>Utilice el navegador de la parte superior de la pantalla para empezar</p>
        </div>
    `
    } catch (error) {
        
    }
}

const findMovie =  async () => {
    var text = document.getElementById("buscar").value;
    document.getElementById("buscar").value = '';
    fetch(`https://api.themoviedb.org/3/search/movie?query=${text}&api_key=b5138e06a3a9125b8c326498bbeae997&language=es-ES&page=1&include_adult=false`)
    .then(res=>res.json())
    .then(res=>{
        const movies = res.results;
        renderMovies(movies);
    })
    .catch(error=>console.error(error))
}

