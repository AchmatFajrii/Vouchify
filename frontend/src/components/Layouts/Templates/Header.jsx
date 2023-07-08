import Navbar from "../../Fragments/Navbar";
import TroliLoginMobile from "../../Elements/TroliLogin/TroliLoginMobile";
import NavbarMenu from "../../Elements/NavbarMenu";

const Header = () => {
  return (
    <header className="py-5 text-base text-white font-semibold bg-primary border-b-2 border-white sticky top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-10 lg:px-32">
        {/* navbar start */}
        <Navbar />
        <TroliLoginMobile />
        {/* <NavbarMenu /> */}
        {/* navbar end */}
      </div>
    </header>
  );
};

export default Header;
