import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const moviePosterBaseURL = "https://image.tmdb.org/t/p/original/";

  // code snippet that will rumn on a specific condition.
  useEffect(() => {
    console.log("here");
    // use effect dont take a asynchronous function as a call back function so we need to declare tha synchronous function separatly and call it.
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3${fetchUrl}`
      );
      console.log(request.data.results);
      setMovies(request.data.results);
      // return request;
    }
    fetchData();
    // if [], means this use effect will run only once when the component loads and dont run again.
  }, [fetchUrl]);

  const opts = {
    height: "430px",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleClick = (movie) => {
    if (selectedMovie !== "") {
      setSelectedMovie("");
      setTrailerUrl("");
    } else {
      setSelectedMovie(movie);
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          //   https://www.youtube.com/watch?v=y8UDuUVwUzg
          //  new URL(url).search (this is give the data after quesntion mark)   =====>    v=y8UDuUVwUzg
          const urlParams = new URLSearchParams(new URL(url).search); // all parameters got stored in urlParams
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* BEM naming structure */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${moviePosterBaseURL}${movie.poster_path}`}
            alt="moviePoster"
          />
        ))}
      </div>
      {/* videoId look like this ----> y8UDuUVwUzg */}
      {selectedMovie && (
        <div className="movie__info">
          <div className="movie__trailer">
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
          </div>
          <div className="movie__data">
            <h2 className="movie__title">
              {selectedMovie.title ||
                selectedMovie.name ||
                selectedMovie.original_name}
            </h2>
            <h4 className="movie__desc">{selectedMovie.overview}</h4>
            <button className="watchList__button">Add to WatchList</button>
          </div>
        </div>
      )}

      {/* above line means when i will have the trailerUrl only then i want to show the video. */}
    </div>
  );
}
