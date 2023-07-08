import LogoSearchCountry from "../Elements/LogoSearchCountry";
import TroliLogin from "../Elements/TroliLogin";
import BarMenu from "../Elements/BarMenu";

const Navbar = () => {
  return (
    <nav className="navbar-nav flex items-center justify-between">
      <LogoSearchCountry />
      <TroliLogin />
      <BarMenu></BarMenu>
    </nav>
  );
};

export default Navbar;
