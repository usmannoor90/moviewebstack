import { Routes, Route } from "react-router-dom";
import AccountLayout from "./Layouts/Account/AccountLayout";
import SignUp from "./Pages/AccountsPages/SignUp";
import Login from "./Pages/AccountsPages/Login";
import Home from "./Pages/Home/Home";
import HomeLayout from "./Layouts/Home/HomeLayout";
import MovieDetails from "./Pages/Home/MovieDetails";
import GenreMovies from "./Pages/Home/GenreMovies";
import Searched from "./Pages/Home/Searched";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AccountLayout />}>
          <Route index element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {}
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/home/:Gname" element={<GenreMovies />} />
          <Route path="/home/movie/:id" element={<MovieDetails />} />
          <Route path="/home/searched/:input" element={<Searched />} />
        </Route>
        <Route path="*" element={<h2>Error no path found</h2>}></Route>
      </Routes>
    </>
  );
}

export default App;
