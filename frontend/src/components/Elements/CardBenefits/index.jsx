import CPPHover from "../../../assets/img/cpp-hover.webp";
import DealsHover from "../../../assets/img/deals-hover.webp";
import CSHover from "../../../assets/img/cs-hover.webp";
import GameHover from "../../../assets/img/gaming-blog-hover.webp";

const CardBenefits = () => {
  const dataCardBenefits = [
    { image: CPPHover, title: "Costumer Protection" },
    { image: DealsHover, title: "Deals & Promotions" },
    { image: CSHover, title: "24/7 Costumer Service" },
    { image: GameHover, title: "Gaming Blog" },
  ];
  return (
    <div className="list-benefit mt-5 lg:mt-10">
      <div className="flex flex-wrap justify-evenly items-center text-white text-center text-xs md:text-sm md:justify-between lg:text-base">
        {dataCardBenefits.map((cardBenefit, index) => {
          return (
            <>
              <div
                className="card-benefit flex flex-col justify-center p-4 mx-4 w-32 md:w-40 lg:w-56"
              >
                <img src={cardBenefit.image} alt="" />
                <p>{cardBenefit.title}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CardBenefits;
