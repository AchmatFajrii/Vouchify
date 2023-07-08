import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        
        const registerData = {
            name: name,
            email: email,
            password: password,
            gender: gender,
            phoneNumber: phoneNumber,
        };

        axios.post("http://localhost:3000/auth/register", registerData).then((response) => {
          console.log(response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            onChange={(e) => setName(e.target.value)} />

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)} />

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="phone_number"
                            placeholder="Phone Number"
                            onChange={(e) => setPhoneNumber(e.target.value)} />

                        <select name="gender" id="gender" className="w-full" onChange={(e) => setGender(e.target.value)}>
                            <option value="" selected disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)} />

                        <button
                            type="submit"
                            className="w-full bg-blue-500 btn-hero rounded-lg py-4"
                        >Create Account</button>

                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the 
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and 
                            <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                    
                    <div className="text-white mt-6">
                        Already have an account? 
                        <Link className="w-full btn-hero rounded-lg py-4" to="/login">
                            Log in
                        </Link>.
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Register;