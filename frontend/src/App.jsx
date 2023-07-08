import "./App.css";
import Header from "./components/Layouts/Templates/Header";
import Info from "./components/Fragments/InfoPromo";
import SocialMedia from "./components/Fragments/SocialMedia";
import Footer from "./components/Layouts/Templates/Footer";

import Homepage from "./pages/Homepage";
import DetailGameCategory from "./pages/GameCategory/[id]";
import TransactionIndex from "./pages/Transaction/Index";


import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DetailGame from "./pages/Game/[id]";
import TransactionShow from "./pages/Transaction/[id]";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="bg-primary">
          <Info />
          <SocialMedia />
          <Header />
          <main className="my-5 md:my-10">
            <Routes>
              <Route path="/" element={<Homepage />} /> 
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} /> 
              <Route path="/game-categories/:id" element={<DetailGameCategory />} /> 
              <Route path="/games/:id" element={<DetailGame />} /> 
              <Route path="/transactions" element={<TransactionIndex />} /> 
              <Route path="/transactions/:id" element={<TransactionShow />} /> 
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
