import { Link } from "react-router-dom";
import Genere from "../../Components/Genere";
import Search from "../../Components/Search";
import logo from "../../Images/weblogo.png";
import "../../Styling/home.css";

function Header() {
  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className=" mt-3 header-width-1 ">
        <Link to="/home">
          <img src={logo} alt="logo" width={"65px"} />
        </Link>
        <div className="container-fluid header-width ">
          <Genere />
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Header;
