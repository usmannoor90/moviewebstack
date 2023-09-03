import React, { useEffect, useState } from "react";
import MoviePoster from "./MoviePoster";
import "../Styling/home.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
import "@splidejs/react-splide/css/skyblue";
import "@splidejs/react-splide/css/sea-green";

// or only core styles
import "@splidejs/react-splide/css/core";
function Discover() {
  const [movie, setMovie] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_Url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMBD_KEY}`;

  useEffect(() => {
    getMovies();
    setLoading(false);
  }, []);

  async function getMovies() {
    const api = await fetch(API_Url);
    const result = await api.json();
    setMovie(result.results);
    console.log(result.results);
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container-fluid" style={{ maxWidth: "1500px" }}>
      <h2 className="mt-5 " style={{ marginLeft: "3rem" }}>
        {" "}
        Discover Movies
      </h2>

      <Splide
        className="pt-2"
        options={{
          gap: "1rem",
          perPage: 4,
          arrows: false,
          breakpoints: {
            992: {
              perPage: 2,
            },
            557: {
              perPage: 1,
            },
          },
        }}
      >
        {movie?.map((data: any) => {
          return (
            <SplideSlide key={data.id}>
              <MoviePoster key={data.id} {...data} />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Discover;
