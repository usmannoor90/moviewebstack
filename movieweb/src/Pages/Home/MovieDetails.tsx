import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetail {
  title: string;
  id: number;
  overview: string;
  backdrop_path: string;
  genres: [];
}

interface GenresList {
  id: number;
  name: string;
}

function MovieDetails() {
  const [movieDetail, setMovieDetail] = useState<MovieDetail>();
  const [loading, setLoading] = useState(true);

  const ImgUrl = "https://image.tmdb.org/t/p/w500/";

  const list: GenresList[] | any = movieDetail?.genres;

  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_TMBD_KEY}`
    );
    const detailData = await data.json();
    console.log(detailData);
    setMovieDetail(detailData);
  };

  useEffect(() => {
    fetchDetails();
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="container-fluid mt-5 pt-5" style={{ maxWidth: "1400px" }}>
      <div className="row">
        <div className="col-lg-5 d-flex align-items-center justify-content-center">
          <img
            src={ImgUrl + movieDetail?.backdrop_path}
            alt={movieDetail?.title}
            className="img-fluid"
          />
        </div>
        <div className="col-lg-7 mt-lg-0 mt-4">
          <h1>{movieDetail?.title}</h1>
          <h6>Genres</h6>
          <ul>
            {list?.map((i: any) => {
              return <li key={i.id}> {i.name}</li>;
            })}
          </ul>
          <h4>Overview</h4>
          <p>{movieDetail?.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
