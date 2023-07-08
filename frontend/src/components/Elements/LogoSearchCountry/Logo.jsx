import { Link } from "react-router-dom";
import VouchifyLogo from "../../../assets/img/vouchify-logo.svg";

const Logo = () => {
  return (
    <div className="logo">
      <Link to={`/`}>
        <img className="w-32 lg:w-full" src={VouchifyLogo} alt="" />
      </Link>
    </div>
  );
};

export default Logo;
