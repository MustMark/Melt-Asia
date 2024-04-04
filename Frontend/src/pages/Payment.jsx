import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaRegCreditCard } from "react-icons/fa6";
import { PiBankLight } from "react-icons/pi";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Nav from '../components/Nav';


function Payment() {
    const navigate = useNavigate()
    const location = useLocation()

    const booking_no = String(location.state.booking_id)

    const [detail, setDetail] = useState();
    const [cookies] = useCookies(['user']);

    const price = async () => {
        try {
            const userId = cookies.user._User__user_id
            const response = await axios.get(`http://localhost:8000/${userId}/${booking_no}/show_price_summary`)
            setDetail(response.data)
        }
        catch (error) {
            alert("Error" + error.name)
        }
    }

    useEffect(() => {
        price();
    }, []);

    function handleCard() {
        navigate("/payment/card", { state: { booking_id: location.state.booking_id, total_price: detail.price['Summary price'] } });
    }

    function handleMobile() {
        navigate("/payment/mobile", { state: { booking_id: location.state.booking_id, total_price: detail.price['Summary price'] } });
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center overflow-hidden">
            <Nav />
            <video autoPlay loop muted playsInline className="absolute right-0 bottom-0 z-[-1]">
                <source src="/src/assets/plane2.mp4" type="video/mp4"></source>
            </video>
            <div className="rounded-3xl text-white border-solid bg-red-500 pe-5 mb-8 w-3/12 border-1 border-slate-500 shadow-md">
                <h1 className="text-bold text-4xl text-center mt-6 underline">Price Summary</h1>
                <div className='p-8 text-center'>
                    <p className="pb-5 text-xl">All Seat Price: {detail && detail.price && detail.price['seat price'].toLocaleString()}</p>
                    <p className="pb-5 text-xl">All Luggage Price: {detail && detail.price && detail.price['luggages price'].toLocaleString()}</p>
                    <p className="pb-1 text-xl">Total Price : {detail && detail.price && detail.price['Summary price'].toLocaleString()}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center">
                <button onClick={handleCard} className="shadow-md flex items-center gap-2 rounded-3xl border-solid bg-slate-200 px-5 py-3 mx-10 mt-6 border-1 border-slate-500 hover:bg-red-500 hover:text-white transition-colors duration-200">
                    <div>Pay By Card</div>
                    <div><FaRegCreditCard /></div>
                </button>
                <button onClick={handleMobile} className="shadow-md flex items-center gap-2 rounded-3xl border-solid bg-slate-200 ps-5 py-3 mt-6 mr-4 border-1 border-slate-500 hover:bg-red-500 hover:text-white transition-colors duration-200">
                    <div>Pay By Mobile Banking</div>
                    <div className='me-5'><PiBankLight /></div>
                </button>
            </div>
        </div>
    )
}

export default Payment