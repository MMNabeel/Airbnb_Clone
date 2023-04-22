import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(event){
        event.preventDefault();
        try {
           const {data} = await axios.post("/login", {email, password});
           setUser(data);
            alert("Login Successful")
            setRedirect(true);
        } catch (e){
            alert("Login failed")
        }
    }
    if(redirect){
        return <Navigate to={"/"} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="Please enter your email:" value={email}
                    onChange={event => setEmail(event.target.value)}
                    />
                    <input type="password" placeholder="Please enter your password:" value={password}
                    onChange={event => setPassword(event.target.value)}
                    />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have account yet!
                        <Link className="underline text-black" to={'/register'}> Please Register</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}