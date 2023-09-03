import { Link } from "react-router-dom";

interface Props {
  title: string;
  id: number;
  overview: string;
  backdrop_path: string;
}

function MoviePoster({ title, id, overview, backdrop_path }: Props) {
  const ImgUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className="card" key={id}>
      <div className="card-img">
        <img src={ImgUrl + backdrop_path} alt={title} />
      </div>
      <div className="card-shit">
        <div className="pb-2 text-center">{title}</div>
        <Link to={"/home/movie/" + id}>
          <button className="btn btn-primary w-100"> See More</button>
        </Link>
      </div>
    </div>
  );
}

export default MoviePoster;
