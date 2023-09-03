import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { genreList } from "../../Components/genreList";
import MoviePoster from "../../Components/MoviePoster";

function GenreMovies() {
  let name = useParams();
  let [movie, setMovie] = useState<any[]>([]);

  let obj = genreList.genres.find((i) => {
    return i.name === `${name.Gname}`;
  });

  async function getGenreMovies(id: any) {
    let Api = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMBD_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`
    );

    let result = await Api.json();
    setMovie(result.results);
  }

  console.log(movie);

  useEffect(() => {
    getGenreMovies(obj?.id);
  }, [obj?.id]);

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

export default GenreMovies;
