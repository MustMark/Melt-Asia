import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Nav';

function PayByMobile() {
  const location = useLocation()
  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies(['user']);
  const [ownerName, setOwnerName] = useState();
  const [telNo, setTelNo] = useState();
  const [accountNo, setAccountNo] = useState();
  const [password, setPassword] = useState();

  const booking_id = String(location.state.booking_id)

  const sendData = async () => {
    const data = {
      owner_name: ownerName,
      tel_no: telNo,
      account_no: accountNo,
      password: password
    }
    try {
      const userId = cookies.user._User__user_id;
      const response = await axios.put(`http://localhost:8000/${userId}/payment_method/pay_by_mobile_banking?booking_id=${booking_id}`, data)
      alert(response.data)
      navigate("/account")
    }
    catch (error) {
      alert("Failed")
    }
  }

  const handleOwnerNameChange = (e) => {
    setOwnerName(e.target.value);
  };

  const handlTelNoChange = (e) => {
    setTelNo(e.target.value);
  };

  const handlAccountNoChange = (e) => {
    setAccountNo(e.target.value);
  };

  const handlPasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
          <h1 className="text-white text-4xl mb-4 underline">Pay By Mobile Banking</h1>
          <h1 className="text-white text-2xl mb-4">Total Price : {location.state.total_price.toLocaleString()}</h1>
          <div className="flex flex-col gap-4 w-80">
            <input
              value={ownerName}
              onChange={handleOwnerNameChange}
              type="text"
              placeholder="Owner Name"
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500"
            />
            <input
              value={telNo}
              onChange={handlTelNoChange}
              type="text"
              placeholder="Tel No"
              maxLength="10"
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500"
            />
            <input
              value={accountNo}
              onChange={handlAccountNoChange}
              type="text"
              placeholder="Account No"
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500"
            />
            <input
              value={password}
              onChange={handlPasswordChange}
              type="password"
              placeholder="Password"
              className="border-2 border-gray-300 p-3 rounded-lg placeholder-gray-500"
            />
          </div>
          <button className="bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-5 transition duration-300 ease-in-out transform hover:scale-105 w-full" onClick={sendData}>Pay</button>
        </div>
        <button onClick={back} className="shadow-md rounded-3xl border-solid bg-slate-200 w-1/12 py-3 mt-6 hover:bg-red-500 hover:text-white transition-colors">Back</button>
      </div>
    </div>
  );
}

export default PayByMobile