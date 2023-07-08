import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";

import axios from "axios";
import React from "react";

const InfoPromo = () => {
  const baseURL = "http://localhost:3000/special-offers/active";
  const [promos, setPromos] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPromos(response.data);
    })
  }, []);

  if (!promos) return null;

  return (
    <section className="info flex items-center justify-center py-2 px-1 text-xs text-center bg-fourth lg:py-4 lg:text-base">
       <Splide
                hasTrack={false}
                aria-label="My Favorite Images"
                options={{
                  type: "loop",
                  autoplay: true,
                  pagination : false,
                  arrows     : false,
                  interval: 4000,
                  speed: 800,
                }}
              >
              <SplideTrack>
      {promos.data.map((promo, index) => {
        return (
          <>
          <SplideSlide>
            {promo.description}
            </SplideSlide>
          </>
        )
      })}
      </SplideTrack>
      </Splide>
    </section>
  );
};

export default InfoPromo;
