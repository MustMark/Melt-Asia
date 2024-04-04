import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../App.css'
import axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginResult, setLoginResult] = useState(null);
  const [cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    console.log(email, password)
  }, [email, password])

  const sendData = async () => {
    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/login", userData)
      setLoginResult(response.data.status)
      setCookie('user', response.data.user , { path: '/' });
      const responseMessageString = JSON.stringify(response.data.message)
      alert(responseMessageString)
      if (response.data.message === "Logged in successfully"){
        handleLogin()
      }

    }
    catch (error) {
      alert("Login failed, Please try again");
      return null
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  function handleRegister() {
    navigate("/register")
  }

  function handleLogin() {
    navigate("/home")
  }

  return (
    <div className="antialiased flex justify-center items-center min-h-screen">
      <video autoPlay loop muted playsInline className="absolute right-0 bottom-0 z-[-1]">
        <source src="/src/assets/plane2.mp4" type="video/mp4"></source>
      </video>
      {
        <div className="w-96 text-gray-50 rounded-xl border-solid border-1 border-slate-50 py-8 px-10 backdrop-blur-lg shadow-2xl">

          <h1 className="text-4xl text-center text-5x1 font-medium">Login</h1>

          {/* Login box */}
          <div className="mt-8 mb-3">
            <div className="grid grid-cols-12 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
              <input value={email} onChange={handleEmail} type="email" placeholder="Email" className="col-span-11 p-2 ps-4 bg-transparent text-slate-800" required />
              <FaUser className="col-span-1 align-middle h-full text-red-500" />
            </div>

            <div className="grid grid-cols-12 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5">
              <input value={password} onChange={handlePassword} type="password" placeholder="Password" className="col-span-11 p-2 ps-4 bg-transparent text-slate-800" required />
              <FaLock className="col-span-1 align-middle h-full text-red-500" />
            </div>
          </div>

          <button className="transition-colors duration-200 bg-white text-red-500 w-full h-11 border-none outline-none rounded-3xl cursor-pointer font-medium mt-3 hover:bg-red-500 hover:text-neutral-50" onClick={sendData}>Login</button>

          <div className="text-center mt-4 text-sm">
            <p>Don't have an account? <a href="" className="text-neutral-50 font-bold hover:underline hover:text-red-500 italic" onClick={handleRegister}>Sign up!</a></p>
          </div>
        </div>
      }
    </div>
  )
}

export default Login