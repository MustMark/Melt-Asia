import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';

function PayByCard() {
  const navigate = useNavigate()
  const location = useLocation()

  const [cookies, setCookie] = useCookies(['user']);
  const [cardHolderName, setCardHolderName] = useState();
  const [cardNo, setCardNo] = useState();
  const [expirationDate, setExpirationDate] = useState();
  const [securityCode, setSecurityCode] = useState();

  const booking_id = String(location.state.booking_id)

  useEffect(() => {
  }, [cardHolderName, cardNo, expirationDate, securityCode])

  const handleCardHolderName = (e) => {
    setCardHolderName(e.target.value);
  };

  const handleCardNo = (e) => {
    setCardNo(e.target.value);
  };

  const handleExpirationDate = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleSecurityCode = (e) => {
    setSecurityCode(e.target.value);
  };

  const sendData = async () => {
    const data = {
      card_holder_name: cardHolderName,
      card_no: cardNo,
      expiration_date: expirationDate,
      security_code: securityCode
    }
    try {
      const userId = cookies.user._User__user_id;
      const response = await axios.put(`http://localhost:8000/${userId}/payment_method/pay_by_card?booking_id=${booking_id}`, data)
      alert(response.data)
      navigate("/account")
    }
    catch (error) {
      alert("Error" + error.name)
    }
  }

  const back = () => {
    navigate("/payment", {
      state: {
        booking_id: booking_id
      }
    })
  }

  return (
    <div>
      <Nav />
      <video autoPlay loop muted playsInline className="absolute right-0 bottom-0 z-[-1]">
        <source src="/src/assets/plane2.mp4" type="video/mp4"></source>
      </video>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-red-500 p-10 rounded-xl shadow-lg flex flex-col items-center">
          <h1 className="text-white text-4xl mb-4 underline">Pay By Card</h1>
          <h1 className="text-white text-2xl mb-4">Total Price : {location.state.total_price.toLocaleString()}</h1>
          <div className="flex flex-col gap-4 w-80">
            <input 
              value={cardHolderName} 
              onChange={handleCardHolderName} 
              type="text" 
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500 text-center" 
              placeholder="Card Holder Name" 
            />
            <input 
              value={cardNo} 
              onChange={handleCardNo} 
              type="text" 
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500 text-center" 
              placeholder="Card No" 
            />
            <input 
              value={securityCode} 
              onChange={handleSecurityCode} 
              type="password" 
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500 text-center" 
              placeholder="Security Code" 
            />
            <p className="text-white">Expiration Date</p>
            <input 
              value={expirationDate} 
              onChange={handleExpirationDate} 
              type="date" 
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500 text-center" 
            />
          </div>
          <button className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-5 transition duration-300 ease-in-out transform hover:scale-105 w-full" onClick={sendData}>Pay</button>
        </div>
        <button onClick={back} className="shadow-md rounded-3xl border-solid bg-slate-200 w-1/12 py-3 mt-6 hover:bg-red-500 hover:text-white transition-colors">Back</button>
      </div>
    </div>
  )
}

export default PayByCard