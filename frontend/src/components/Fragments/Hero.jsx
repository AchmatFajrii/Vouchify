import TaglineHero from "../Elements/TaglineHero";
import HeroImage from "../Elements/HeroImage";
const Hero = () => {
  return (
    <section className="hero">
      <div className="container mx-auto px-10 lg:px-32">
        <div className="flex flex-col items-center md:flex-row lg:px-20">
          <TaglineHero />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
