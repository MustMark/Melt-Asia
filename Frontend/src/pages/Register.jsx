import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { LuUser, LuPhone, LuHome } from "react-icons/lu";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";

function Register() {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user']);

    const [firstName, setFirstName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState();
    const [birthDate, setBirthDate] = useState();
    const [result, setResult] = useState(null);

    useEffect(() => {
        console.log(firstName, surname, email, password, phoneNumber, address, birthDate
        )
      }, [firstName, surname, email, password, phoneNumber, address, birthDate])

    const sendData = async () => {
        const data = {
            full_name: firstName + " " + surname,
            email: email,
            password: password,
            phone_number: phoneNumber,
            address: address,
            birth_date: birthDate
        }
        try {
            const response = await axios.post("http://localhost:8000/register", data)
            setResult(response.data.status)
            setCookie('user', response.data.user , { path: '/' });
            const responseMessageString = JSON.stringify(response.data.message)
            alert(responseMessageString)

            if (response.data.message !== "Failed to create user"){
                handleRegister();
              }
        }
        catch(error) {
            alert("Failed")
            return null
        }
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleSurnameChange = (e) => {
        setSurname(e.target.value);
      };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    function handleRegister() {
        navigate("/home")
    };

return (
    <div className="flex flex-colflex justify-center items-center min-h-screen">
        <video autoPlay loop muted playsInline className="absolute right-0 bottom-0 z-[-1]">
            <source src="/src/assets/plane2.mp4" type="video/mp4"></source>
        </video>
            <div className="backdrop-blur-lg shadow-2xl w-96 rounded-3xl border-solid border-1 border-slate-50 py-8 px-10">
                
                <h1 className="text-slate-50 text-4xl text-center text-5x1 font-medium">Sign up</h1>

                <div className="mt-8 mb-4">
                    <div className="grid grid-cols-11 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
                        <input type="text" placeholder="First name" value={firstName} onChange={handleFirstNameChange} className="col-span-9 p-1 ps-4 bg-transparent text-slate-800" required/>
                        <LuUser className="register-icon col-span-2 align-middle h-full translate-x-5"/>
                    </div>
                    <div className="grid grid-cols-11 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
                        <input type="text" placeholder="Surname" value={surname} onChange={handleSurnameChange} className="col-span-9 p-1 ps-4 bg-transparent text-slate-800" required/>
                        <LuUser className="register-icon col-span-2 align-middle h-full translate-x-5"/>
                    </div>
                    <div className="grid grid-cols-11 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
                        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} className="col-span-9 p-1 ps-4 bg-transparent text-slate-800" required/>
                        <MdOutlineMailOutline className="register-icon col-span-2 align-middle h-full translate-x-5"/>
                    </div>

                    <div className="grid grid-cols-11 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} minLength="8" className="col-span-9 p-1 ps-4 bg-transparent text-slate-800" required/>
                        <MdLockOutline className="register-icon col-span-2 align-middle h-full translate-x-5"/>
                    </div>
                    <div className="grid grid-cols-11 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
                        <input type="text" placeholder="Phone number" value={phoneNumber} maxlength="10" onChange={handlePhoneNumberChange} className="col-span-9 p-1 ps-4 bg-transparent text-slate-800" required/>
                        <LuPhone className="register-icon col-span-2 align-middle h-full translate-x-5"/>
                    </div>
                    <div className="grid grid-cols-11 gap-4 rounded-3xl border-solid bg-neutral-50 pe-5 mb-3">
                        <input type="text" placeholder="Address" value={address} onChange={handleAddressChange} className="col-span-9 p-1 ps-4 bg-transparent text-slate-800" required/>
                        <LuHome className="register-icon col-span-2 align-middle h-full translate-x-5"/>  
                    </div>
                    <div className="grid grid-col-11">
                        <p className="text-white">Birth Date</p>
                        <input type="date" placeholder="Birth Date" value={birthDate} onChange={handleBirthDateChange} className="col-span-9 p-1 ps-4 bg-neutral-50 border-solid rounded-3xl pe-5 text-slate-800"required/>
                    </div>
                </div>

                    <button className="transition-colors duration-200 bg-white text-red-500 w-full h-11 border-none outline-none rounded-3xl cursor-pointer font-medium mt-3 hover:bg-red-500 hover:text-neutral-50" onClick={sendData}>Register</button>
                </div>
    </div>
  )
}

export default Register