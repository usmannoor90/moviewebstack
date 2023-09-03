import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MoviePoster from "../../Components/MoviePoster";

function Searched() {
  const [movie, setMovie] = useState<any[]>([]);
  const input = useParams();
  const [loading, setLoading] = useState(true);

  const searchMovies = async (input: any) => {
    const api = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${process.env.REACT_APP_TMBD_KEY}&include_adult=false&language=en-US&page=1`
    );
    const result = await api.json();
    setMovie(result.results);
  };

  useEffect(() => {
    searchMovies(input.input);
    setLoading(false);
  }, [input.input]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="container-fluid" style={{ maxWidth: "1500px" }}>
        <div className="grid-container">
          {movie?.map((data: any) => {
            return <MoviePoster key={data.id} {...data} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Searched;
