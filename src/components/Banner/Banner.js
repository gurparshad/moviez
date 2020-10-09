import Axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../../requests";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) // Math.random() wil generate a random number bw 0 to 1 , excluding 1.
        ]
      );
    }
    fetchData();
  }, []);

  // ?. is a operational chaining.
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
    )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="bannner__button">My Watch List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 300)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}
