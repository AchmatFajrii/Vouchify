import HeroImg from "../../../assets/img/heroimage.svg"
const HeroImage = () => {
  return (
    <div className="hero-image-1 mt-5 block md:mt-0 md:w-[40%]">
      <img className="ml-auto w-full" src={HeroImg} alt="" />
    </div>
//     <div className="hero-image mt-5 hidden lg:block overflow-hidden md:mt-0 md:w-[40%]">
//     <img id="hero-image" class="box-image ml-auto w-full" src="" alt="" />
//   </div>
  );
};

export default HeroImage;
