import {Link, useParams} from 'react-router-dom';

import axios from "axios";
import React from "react";

const DetailGameCategory = () => {
    const { id } = useParams();
    const baseURL = `http://localhost:3000/games/game-category/${id}?skip=0&take=10`;
    const [games, setGames] = React.useState(null);
    
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
          setGames(response.data);
        });
    }, []);
  
    if (!games) return null;

    return (
        <div className="card-best-seller flex justify-center flex-wrap mt-3 md:mt-6">
          {games.data.map((game, index) => {
            return (
              <>
                <Link to={`/games/${game.id}`}  key={game.id} className="m-[2.5px] lg:m-1">
                    <div className="card w-[9.6rem] h-[13rem] p-3 bg-white relative overflow-visible rounded-lg md:w-[15.2rem] md:h-[18.4rem] lg:w-[15rem] lg:h-[19.4rem]">
                      <div className="card-img w-[100%] h-[50%] overflow-hidden md:w-[100%] md:h-[50%]">
                        <img src={game.image} alt="" />
                      </div>
                      <div className="card-info text-[0.6rem] md:text-[1rem]">
                        <p className="text-title">{game.name}</p>
                        <p className="text-base">
                          {game.description.length > 100 ?
                            `${game.description.substring(0, 100)}...` : game.description
                          }
                        </p>
                      </div>
                    </div>
                  </Link>
              </>
            );
          })}
        </div>
    )
}

export default DetailGameCategory;