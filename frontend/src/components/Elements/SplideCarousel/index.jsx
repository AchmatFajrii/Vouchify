import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import MarioBros from "../../../assets/img/mariobros.png"
import TheLastOfUs from "../../../assets/img/thelastofus.png";
import Sims4 from "../../../assets/img/sims4.png";
import ResidentEvil from "../../../assets/img/ResidentEvil4_HomepageBanner_956x528-En.png";
import Destiny from "../../../assets/img/Destiny_HomepageBanner_956x528-En.png";

import axios from "axios";
import React from "react";

const SplideCarousel = () => {
  const baseURL = "http://localhost:3000/banners/active-banners";
  const [banners, setBanners] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setBanners(response.data);
    });
  }, []);

  if (!banners) return null;

    return(
        <div
            id="image-carousel"
            className="splide lg:px-4"
            aria-label="Beautiful Images"
          >
            <div className="splide__track md:rounded-t-lg lg:max-w-[59rem] lg:rounded-lg">
              <Splide
                hasTrack={false}
                aria-label="My Favorite Images"
                options={{
                  type: "loop",
                  autoplay: true,
                }}
              >
                <SplideTrack>
                  {banners.data.map((banner, index) => {
                    return (
                      <>
                        <SplideSlide>
                          <img src={banner.image} alt={banner.name} className="h-[400px] w-full object-fill" />
                        </SplideSlide>
                      </>
                    )
                  })}
                </SplideTrack>
              </Splide>
            </div>
          </div>
    )
}

export default SplideCarousel;