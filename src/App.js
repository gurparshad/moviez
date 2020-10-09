import React from "react";
import "./App.css";
import requests from "./requests";

import Nav from "./components/Nav/Nav";
import Row from "./components/Row/Row";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />

      <Row title="Trending" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="From Netflix" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror" fetchUrl={requests.fetchHorroMovies} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
