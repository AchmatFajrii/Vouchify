import SplideCarousel from "../Elements/SplideCarousel";
import CardGames from "../Elements/CardGames";

const InfoGames = () => {
  return (
    <section className="info-game mt-10 md:mt-14 lg:mt-28">
      <div className="container mx-auto lg:px-32">
        <div className="flex flex-col justify-between lg:flex-row">
          <SplideCarousel />
          <CardGames />
        </div>
      </div>
    </section>
  );
};

export default InfoGames;
