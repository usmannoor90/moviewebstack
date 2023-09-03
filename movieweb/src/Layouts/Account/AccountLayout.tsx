import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function AccountLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AccountLayout;
