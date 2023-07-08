import CardBenefits from "../Elements/CardBenefits";

const Benefit = () => {
  return (
    <section className="benefit mt-10 md:mt-14 lg:mt-24">
      <div className="container mx-auto px-5 md:px-0 lg:px-32">
        <div className="title flex items-center">
          <p className="p-2 w-[9rem] text-lg text-white font-bold border-2 border-white shadow-xl shadow-secondary md:w-[19rem] md:text-3xl lg:w-[17rem] lg:text-3xl">
            BENEFIT
          </p>
          <div className="line h-[1px] w-full border-[1px] border-white"></div>
        </div>
      <CardBenefits />
      </div>
    </section>
  );
};

export default Benefit;
