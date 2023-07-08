import Minecraft from "../../../assets/img/minecraft.jpeg";
import Redfall from "../../../assets/img/csaca_1.jpg";
import StrongHold from "../../../assets/img/strong.jpg";
import Eidolon from "../../../assets/img/eidolon.jpg";
import Serinfate from "../../../assets/img/serinfate.jpeg";
import Surviving from "../../../assets/img/surviving.jpeg";
import Magicka from "../../../assets/img/magicka.jpg";
import Halfpast from "../../../assets/img/halfpast.jpeg";
import Papoyo from "../../../assets/img/papo.jpeg";
import Endless from "../../../assets/img/endless.jpeg";

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const CardTopGames = () => {
  const baseURL = "http://localhost:3000/games?skip=0&take=20";
  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setGames(response.data);
    });
  }, []);

  if (!games) return null;
  
  return (
    <>
    <div className="card-best-seller flex justify-start flex-wrap mt-3 md:mt-6">
      {games.data.map((game, index) => {
        return (
          <>
            <Link to={`/games/${game.id}`} className="m-[2.5px] lg:m-1">
              <div className="card w-[9.6rem] h-[13rem] p-3 bg-white relative overflow-visible rounded-lg md:w-[15.2rem] md:h-[18.4rem] lg:w-[15rem] lg:h-[19.4rem]">
                <div className="card-img w-[100%] h-[50%] overflow-hidden md:w-[100%] md:h-[50%]">
                  <img src={game.image} alt="" />
                </div>
                <div className="card-info text-[0.6rem] md:text-[1rem]">
                  <p className="text-title">{game.name}</p>
                </div>
                <div className="card-footer flex justify-between items-center pt-2">
                  <div className="card-button hover:text-white px-4 py-2">
                    {game.gameCategory.name}
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
    </>
  );
};

export default CardTopGames;
