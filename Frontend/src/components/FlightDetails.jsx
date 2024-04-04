import React from "react"
import { useNavigate } from 'react-router-dom';

function FlightDetails({ flight_info, total_passenger }) {
  const navigate = useNavigate()

  const goto = (route) => {
    navigate(route, {
      state: {
        booking_data: flight_info,
        total_passenger: total_passenger
      }
    })
  };

  const [departure_date, departure_time] = flight_info.departure_time.split(' ');
  const [destination_date, destination_time] = flight_info.destination_time.split(' ');

  const date = new Date(departure_date).toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className='bg-gray-100 w-1/4 h-56 rounded-3xl m-5'>
      <div className="flex justify-center">
        <p className="font-bold underline mt-2">{date}</p>
      </div>
      <div className="flex justify-center space-x-20 mt-1 mb-3">
        <p>{flight_info.departure}</p>
        <p>{flight_info.duration}</p>
        <p>{flight_info.destination}</p>
      </div>
      <div className="flex justify-center">
        <p>{departure_time}</p>
        <p className="text-bold">&#8594;</p>
        <p>{destination_time}</p>
      </div>
      <div>
        {flight_info.price === flight_info.discount ? (
          <p className="flex justify-center m-6">{flight_info.price.toLocaleString()} THB</p>
        ) : (
          <div>
            <p className="flex justify-center mt-4 line-through">{flight_info.price.toLocaleString()} THB</p>
            <p className="flex justify-center">{flight_info.discount.toLocaleString()} THB</p>
          </div>
        )}
        <div className="flex justify-center m-4">
          <button onClick={() => goto("/add_on")} className="text-white bg-red-500 w-16 h-11 rounded-2xl mx-5">Select</button>
        </div>
      </div>
    </div>
  )
}

export default FlightDetails;