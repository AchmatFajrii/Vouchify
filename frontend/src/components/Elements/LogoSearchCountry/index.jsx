import Logo from "./Logo";
import Search from "./Search";
import Country from "./Country";

const LogoSearchCountry = () => {
  return (
    <div
      className="group-logo-search-country flex items-center"
      style={{ flex: 4 }}
    >
      <Logo />
      {/* <Search /> */}
      <Country />
    </div>
  );
};


export default LogoSearchCountry;
