import { Link } from "react-router-dom";
import React from "react";

const Login = () => {
  const [isAuth,setAuth] = React.useState(localStorage.isAuth ?? false)
  const [token, setToken] = React.useState(localStorage.getItem("accessToken"))
 
  React.useEffect(() => {
    // localStorage.setItem("isAuth",isAuth)
    console.log(isAuth)
 },[isAuth]);

 
 let handleLogout = async (e) => {
  e.preventDefault();
  
  try {
    localStorage.clear();
    setAuth(false);
    console.log(isAuth)
  } catch (error) {
      console.log(error)
  }
};

  return (
    <>
    {isAuth ? 
    <div className="flex gap-4">
      <Link to={`/transactions`} className="login flex items-center">
        <button>Transaction</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
      :
      <Link to={`/login`} className="login flex items-center">
        <lord-icon
          class="w-11 h-11"
          src="https://cdn.lordicon.com/ljvjsnvh.json"
          trigger="hover"
          colors="primary:#ffffff,secondary:#ffffff"
          stroke="70"
        ></lord-icon>
        <span className="text-white font-semibold">Masuk</span>
      </Link>
     }
    </>
  );
};

export default Login;
