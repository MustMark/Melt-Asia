import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BoardingPass from '../components/BoardingPass';
import Nav from '../components/Nav';

function ViewBoardingPass() {
    const navigate = useNavigate()
    const location = useLocation()

    const [currentPassenger, setCurrentPassenger] = useState(1);

    const handlePassengerChange = (passenger) => {
        setCurrentPassenger(passenger);
    };

    const all_passenger_boarding_pass = location.state.all_passenger_boarding_pass

    const back = () => {
        navigate("/account", {
        })
      }

    return (
        <div className="flex justify-center">
            <Nav/>
            <div className="passenger-button translate-y-32">
                {Array.from({ length: Object.keys(all_passenger_boarding_pass).length }, (_, index) => (
                    <div className="mb-4" key={index + 1}>
                        <button
                            onClick={() => handlePassengerChange(index + 1)}
                            className={currentPassenger === index + 1 ? "selected rounded-xl w-36 h-12" : ""}
                        >
                            <p className="font p-3 place-content-center">
                                Passenger {index + 1}
                            </p>
                        </button>
                    </div>
                ))}
            </div>
            <div className="translate-y-16">
                <BoardingPass passenger_info={all_passenger_boarding_pass[`Passenger ${currentPassenger}`]} />
                <div className="-translate-y-44 translate-x-28">
                    <button onClick={back} className="shadow-md rounded-3xl border-solid bg-slate-200 w-1/6 py-3 mt-6 hover:bg-red-500 hover:text-white transition-colors">Back</button>
                </div>
            </div>
        </div>
    )
}

export default ViewBoardingPass