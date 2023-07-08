import axios from "axios";
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { GoogleLogin } from '@harisenin/react-google-login';
import { GoogleOAuthProvider , useGoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigateTo = useNavigate();

    let handleSignInByGoogle = async (e) => {
        e.preventDefault();

        window.open("http://localhost:3000/auth/google/register", '_blank').then((res) => console.log(res));
        // try {
        //     axios.get("http://localhost:3000/auth/google").then((res) => {
        //         console.log(res)
        //     });
        // } catch (error) {
            
        // }
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const loginData = {
                email: email,
                password: password
            };

            console.log(loginData);
    
            axios.post("http://localhost:3000/auth/login", loginData).then((response) => {
                const data = response.data;
    
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('isAuth', true);
                
                navigateTo('/', {replace: true});
                navigateTo(0);
            });
            
        } catch (error) {
            console.log(error)
        }
    };

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: function(codeResponse) {
            const data = {
                code: codeResponse.code
            };
    
            axios.post("http://localhost:3000/auth/google", data).then((response) => {
                const data = response.data;
    
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('isAuth', true);
                
                navigateTo('/', {replace: true});
                navigateTo(0);
            });

        },
    });

      const credentialResponse = (response) => {
        console.log(response);
        console.log(response);
      }
    return (
        <form onSubmit={handleSubmit}>
           <div className="w-96 mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <div className="mb-4">
                    <label className="text-white" for="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" placeholder="email" 
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-6">
                    <label className="text-white" for="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" 
                        placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-red text-xs italic">Please choose a password.</p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-between">
                    <button className="w-full btn-hero rounded-lg py-4" type="submit">
                        Sign In
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <Link to={'/register'} className="w-full btn-hero rounded-lg py-4">
                            Register
                        </Link>
  {/* <GoogleLogin
    clientId="646344540885-ubl8t9tvl8mbmjnv8cd9iimllc5akjtb.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />, */}
  
  {/* <GoogleOAuthProvider clientId="646344540885-ubl8t9tvl8mbmjnv8cd9iimllc5akjtb.apps.googleusercontent.com"> */}

                        <button className="w-full btn-hero rounded-lg py-4" onClick={login}>
                            Google
                        </button>
  {/* </GoogleOAuthProvider> */}
                    </div>
                </div>

                <div className="message">{message ? <p>{message}</p> : null}</div>
   
            </div>
        </form>
    )
}

export default Login;