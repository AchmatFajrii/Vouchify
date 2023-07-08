
import Hero from "../components/Fragments/Hero";
import InfoGames from "../components/Fragments/InfoGames";
// import FlashSale from "./components/Fragments/FlashSale";
import TopGames from "../components/Fragments/TopGames";
import CategoryGames from "../components/Fragments/CategoryGames";
import Benefit from "../components/Fragments/Benefit";
import UpdateTournament from "../components/Fragments/UpdateTournament";
import BlogGames from "../components/Fragments/BlogGames";
import Payment from "../components/Fragments/Payment";

const Homepage = () => {
    return (
        <div>
            
            <Hero />
            <InfoGames />
            <TopGames />
            <CategoryGames />
            <Benefit />
            <UpdateTournament />
            {/* <BlogGames /> */}
            <Payment />
        </div>
    )
}

export default Homepage;