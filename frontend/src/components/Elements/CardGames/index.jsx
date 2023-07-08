import StarWars from "../../../assets/img/STAR_WARS_JEDI-_SURVIVOR_PC.jpeg";
import ResidentEvil4 from "../../../assets/img/resident_evil_4_remake_-_137x76.png";
import TheLastOfUs2 from "../../../assets/img/THE_LAST_OF_US_PART_I.jpeg";
import Sims from "../../../assets/img/sims_4_growing_together_-_137x76.png";
import Button from "./Button";

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const CardGames = () => {
  const baseURL = "http://localhost:3000/games/latest";
  const [games, setGames] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setGames(response.data);
    });
  }, []);

  if (!games) return null;

  const cardGames = [
    {
      image: StarWars,
      info: "COMING SOON",
      desc: "STAR WARS JEDI : SURVIVOR PC [ORIGIN]",
    },
    {
      image: ResidentEvil4,
      info: "NEW RELEASE",
      desc: "STAR WARS JEDI : SURVIVOR PC [ORIGIN]",
    },
    {
      image: TheLastOfUs2,
      info: "NEW RELEASE",
      desc: "STAR WARS JEDI : SURVIVOR PC [ORIGIN]",
    },
    {
      image: Sims,
      info: "NEW RELEASE",
      desc: "STAR WARS JEDI : SURVIVOR PC [ORIGIN]",
    },
  ];

  return (
    <>
      <div className="card-games-release w-[400px] hidden rounded-lg lg:block">
        <ul className="list-card-games flex flex-col justify-start h-full border-2 border-white overflow-hidden rounded-lg">
          {games.data.map((game, index) => {
            return (
              <>
                <li
                  key={index}
                  className="card-games p-3 text-white transition-all duration-100 ease-linear border-[1px] border-secondary hover:bg-secondary"
                >
                  <Link to={`/games/${game.id}`} className="flex gap-4">
                    <div className="w-24 img-card rounded-lg">
                      <img
                        className="w-16 h-16 rounded-lg object-cover"
                        src={game.image}
                        alt=""
                      />
                    </div>
                    <div className="card-description flex flex-col gap-2">
                      <p className="text-base">{game.name}</p>
                      <p className="text-sm font-bold">
                        {game.description.length > 50 ?
                          `${game.description.substring(0, 50)}...` : game.description
                        }
                      </p>
                    </div>
                  </Link>
                </li>
              </>
            );
          })}
        </ul>
      </div>
      <div className="btn-comingsoon-release flex text-primary text-sm font-bold md:text-lg lg:hidden">
        <Button bgColor="bg-fourth">COMING SOON</Button>
        <Button bgColor="bg-fifth">NEW RELEASE</Button>
      </div>
    </>
  );
};

export default CardGames;
