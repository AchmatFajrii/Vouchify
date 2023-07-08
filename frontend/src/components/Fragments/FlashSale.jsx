import FreeFire from "../../assets/img/ff.svg";
import MobileLegend from "../../assets/img/ml.svg";
import Pubg from "../../assets/img/pubg.svg";
import COC from "../../assets/img/coc.svg";
import Idk from "../../assets/img/idk.svg";
import Idk2 from "../../assets/img/idk2.svg";
import Valorant from "../../assets/img/valo.svg";

const FlashSale = () => {
  return (
    <section className="flashsale mt-10 md:mt-14 lg:mt-24">
      <div className="container mx-auto px-5 md:px-0 lg:px-32">
        <div className="title flex items-center">
          <p className="p-2 w-[18rem] text-lg text-white font-bold border-2 border-white shadow-xl shadow-secondary md:w-[33rem] md:text-3xl lg:w-[36rem] lg:text-3xl">
            FLASH SALE⚡
          </p>
          <div className="line h-[1px] w-full border-[1px] border-white"></div>
        </div>
        <div className="flash-sale-area p-3 mt-5 bg-primary border-2 border-white md:p-7 rounded-lg md:mt-10">
          <div className="countdown-area flex items-center rounded-lg">
            <div className="title">
              <h3 className="text-white text-sm font-bold md:text-2xl lg:text-2xl">
                Berakhir dalam :{" "}
              </h3>
            </div>
            <div className="countdown ml-4 text-xs md:text-3xl lg:text-4xl">
              <div className="days">00</div>
              <div className="hours">00</div>
              <div className="minutes">00</div>
              <div className="seconds">00</div>
            </div>
          </div>
          <div className="card-flash-sale mt-5">
            <div className="owl-carousel owl-theme">
              <div>
                {" "}
                <a href="">
                  <img src={FreeFire} alt="" />
                </a>{" "}
              </div>
              <div>
                {" "}
                <a href="">
                  <img src={COC} alt="" />
                </a>{" "}
              </div>
              <div>
                {" "}
                <a href="">
                  <img src={MobileLegend} alt="" />
                </a>{" "}
              </div>
              <div>
                {" "}
                <a href="">
                  <img src={Pubg} alt="" />
                </a>{" "}
              </div>
              <div>
                {" "}
                <a href="">
                  <img src={Idk} alt="" />
                </a>{" "}
              </div>
              <div>
                {" "}
                <a href="">
                  <img src={Idk2} alt="" />
                </a>{" "}
              </div>
              <div>
                {" "}
                <a href="">
                  <img src={Valorant} alt="" />
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
