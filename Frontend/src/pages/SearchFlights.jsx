import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';

function SearchFlights() {
  const [departure, setDeparture] = useState("Suvarnabhumi");
  const [departureDate, setDepartureDate] = useState();
  const [destination, setDestination] = useState("Chiang Mai");
  const [passenger, setPassenger] = useState("1");
  const [promocode, setPromocode] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    console.log(departure, destination, passenger, departureDate, promocode
    )
  }, [departure, destination, passenger, departureDate, promocode])

  const sendData = async () => {
    const data = {
      departure: departure,
      destination: destination,
      departure_date: departureDate,
      total_passenger: passenger,
      promocode: promocode
    }
    const total_passenger = data.total_passenger
    const respone = await axios.post("http://localhost:8000/search_flight", data)
    if (typeof respone.data == "string") {

      alert(respone.data)
    }
    else {
      navigate("/search/flights_results", {
        state: {
          total_passenger: total_passenger
        }
      })
    }
  }

  const handleDepartureChange = (e) => {
    setDeparture(e.target.value);
  };

  const handleDepartureDateChange = (e) => {
    setDepartureDate(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handlePassenger = (e) => {
    setPassenger(e.target.value);
  };

  const handlePromocode = (e) => {
    setPromocode(e.target.value);
  };

  return (
    <div>
      <Nav />
      <div>
        <img src="/src/assets/MeltPlane.svg" className="absolute z-[-1]" />
      </div>

      {
        (
          <div>
            <div className="flex justify-center items-center min-h-screen">
              <div className=" backdrop-blur-xl shadow-2xl w-96 rounded-3xl border-solid border-1 border-slate-50 py-8 px-10">
                <div className='mb-4'>
                  <div className="flex flex-col">
                    <label htmlFor="departure" className="text-slate-50 text-xl italic">Departure</label>
                    <select value={departure} onChange={handleDepartureChange} className="text-base p-3 mb-1 mt-2 rounded-xl box-border w-11/12" required>
                      {destination && (
                        <>
                          <option value="Suvarnabhumi" disabled={destination === "Suvarnabhumi"}>Suvarnabhumi</option>
                          <option value="Chiang Mai" disabled={destination === "Chiang Mai"}>Chiang Mai</option>
                          <option value="Hat Yai" disabled={destination === "Hat Yai"}>Hat Yai</option>
                          <option value="Khon Kaen" disabled={destination === "Khon Kaen"}>Khon Kaen</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="destination" className="text-slate-50 text-xl italic mt-2">Destination</label>
                    <select value={destination} onChange={handleDestinationChange} className="text-base p-3 mb-1 mt-2 rounded-xl box-border w-11/12" required>
                      {departure && (
                        <>
                          <option value="Suvarnabhumi" disabled={departure === "Suvarnabhumi"}>Suvarnabhumi</option>
                          <option value="Chiang Mai" disabled={departure === "Chiang Mai"}>Chiang Mai</option>
                          <option value="Hat Yai" disabled={departure === "Hat Yai"}>Hat Yai</option>
                          <option value="Khon Kaen" disabled={departure === "Khon Kaen"}>Khon Kaen</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="passengers" className="text-slate-50 text-xl italic mt-2">Passengers</label>
                    <input value={passenger} onChange={handlePassenger} type="number" min="1" max="5" className="text-base p-3 ps-4 mb-1 mt-2 rounded-xl box-border w-16 h-10" required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="date" className="text-slate-50 text-xl italic mt-2">Date</label>
                    <input onChange={handleDepartureDateChange} value={departureDate} type="date" name="departure_date" id="departure_date" className="text-base p-3 ps-4 mb-1 mt-2 rounded-xl box-border w-11/12" required />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="promocode" className="text-slate-50 text-xl italic mt-4">Promocode</label>
                    <input onChange={handlePromocode} value={promocode} type="text" name="promocode" className="text-base p-3 mb-1 mt-2 rounded-xl box-border w-11/12" placeholder="Your Promocode" />
                  </div>
                </div>
                <button onClick={sendData} className="transition-colors duration-200 bg-red-500 text-white w-20 h-11 translate-x-48 border-none outline-none rounded-3xl cursor-pointer font-medium mt-3 hover:bg-red-600 hover:text-neutral-50">Search</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default SearchFlights;