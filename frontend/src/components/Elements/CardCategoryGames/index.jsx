import Action from "../../../assets/img/action.svg";
import Adventure from "../../../assets/img/adventure.svg";
import FPS from "../../../assets/img/fps.svg";
import RPG from "../../../assets/img/rpg.svg";
import Indie from "../../../assets/img/indie.svg";
import Simulation from "../../../assets/img/simulation.svg";
import Strategy from "../../../assets/img/strategy.svg";
import Racing from "../../../assets/img/racing.svg";
import Fighting from "../../../assets/img/fighting.svg";
import Sport from "../../../assets/img/sport.svg";
import Puzzle from "../../../assets/img/puzzle.svg";
import Arcade from "../../../assets/img/arcade.svg";
import MMO from "../../../assets/img/mmo.svg";
import Educational from "../../../assets/img/educational.svg";

import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";


const CardCategoryGames = () => {
  const baseURL = "http://localhost:3000/game-categories?skip=0&take=10";
  const [gameCategories, setGameCategories] = React.useState(null);

    React.useEffect(() => {
      axios.get(baseURL).then((response) => {
        setGameCategories(response.data);
      });
    }, []);

    if (!gameCategories) return null;
    
  return (
    <>
      <ul className="flex flex-wrap justify-start gap-4 mt-4 md:mt-6">
        {gameCategories.data.map((gameCategory, index) => {
          return (
            <>
              <li key={index} className="lg:m-1">
                <Link to={`/game-categories/${gameCategory.id}`}>
                  <div className="card-category rounded-2xl overflow-hidden">
                    <div className="card-category2 flex flex-col gap-4 justify-between items-center py-4 w-[105px] h-[105px] text-xs text-white font-semibold md:text-base md:w-[183px] md:h-[170px] lg:w-[170px] lg:h-[170px]">
                      {gameCategory.image != null
                        ? <img src={gameCategory.image} alt="gameCategory.name" className="h-20 object-cover" />
                        : <></>
                      }
                      <span className="text-center text-sm px-4">{gameCategory.name}</span>
                    </div>
                  </div>
                </Link>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default CardCategoryGames;
