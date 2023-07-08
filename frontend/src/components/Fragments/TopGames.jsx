import CardTopGames from "../Elements/CardTopGames";

const TopGames = () => {
  return (
    <section id="top-games" className="top-games mt-10 md:mt-14 lg:mt-24">
      <div className="container mx-auto px-5 md:px-0 lg:px-32">
        <div className="title flex items-center">
          <p className="p-2 w-[18rem] text-lg text-white font-bold border-2 border-white shadow-xl shadow-secondary md:w-[29rem] md:text-3xl lg:w-[32.7rem] lg:text-3xl">
            Games
          </p>
          <div className="line h-[1px] w-full border-[1px] border-white"></div>
        </div>
          <CardTopGames/>
      </div>
    </section>
  );
};

export default TopGames;
