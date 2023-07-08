import InstagramLogo from "../../assets/img/instagram.svg"
import TiktokLogo from "../../assets/img/tiktok.svg";
import FacebookLogo from "../../assets/img/facebook1.svg";

const SocialMedia = () => {
  return (
    <aside className="social-media fixed top-60 z-50 left-0">
      <div className="sosmed-logo w-7 md:w-10 p-2 bg-secondary">
        <a href="">
          <img src={InstagramLogo} alt="" />
        </a>
      </div>
      <div className="sosmed-logo w-7 md:w-10 p-2 bg-secondary mt-2">
        <a href="">
          <img src={TiktokLogo} alt="" />
        </a>
      </div>
      <div className="sosmed-logo w-7 md:w-10 p-2 bg-secondary mt-2">
        <a href="">
          <img src={FacebookLogo} alt="" />
        </a>
      </div>
    </aside>
  );
};

export default SocialMedia;
