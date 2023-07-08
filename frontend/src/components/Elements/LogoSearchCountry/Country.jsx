import IndonesiaLogo from "../../../assets/img/indonesia.svg";

const Country = () => {
  return (
    <div className="country items-center ml-5 hidden lg:flex">
      <img className="w-5" src={IndonesiaLogo} alt="" />
      <p className="ml-2">| IDR</p>
    </div>
  );
};

export default Country;
