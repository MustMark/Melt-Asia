import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MdLuggage, MdNoLuggage } from "react-icons/md";

function SelectAddOn({ booking_data, total_passenger }) {
  const location = useLocation();
  const navigate = useNavigate();

  const flight_instance_no = booking_data.flight_instance_no;

  const weight_packages = [15, 20, 25, 30, 40, 50, 60];

  const [SeatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState(Array.from({ length: total_passenger }, () => "-"));
  const [weights, setWeights] = useState(Array.from({ length: total_passenger }, () => 0));
  const [currentPassenger, setCurrentPassenger] = useState(1);
  const [show, setShow] = useState(true);

  const booking = location.state.booking_data

  const CreateData = async (route) => {

    const goto = (route) => {
      navigate(route, {
        state: {
          booking_data: booking,
          passenger_data: PassengerAddOn(),
        }
      })
    };

    goto(route);

  }

  const check_seat = (route) => {

    const passenger_addon = PassengerAddOn()
    for (let passenger = 1; passenger <= total_passenger; passenger++) {

      if (passenger_addon[`Passenger${passenger}`]["seat"] === "-") {
        alert(`Please select a seat for all passenger!`);
        return;
      }
    }

    CreateData(route)
  }


  const PassengerAddOn = () => {
    const passengerAddOn = {};

    for (let passenger = 1; passenger <= total_passenger; passenger++) {
      const seat = selectedSeats[passenger - 1] || "-";
      const weight = weights[passenger - 1] || 0;

      passengerAddOn[`Passenger${passenger}`] = { seat, weight };
    }

    return passengerAddOn;
  };

  const total_price = () => {
    let seat_price = 0;
    let seat_count = 0;
    let luggage_price = 0;
    let luggage_count = 0;

    Object.values(selectedSeats).forEach((seat) => {

      if (seat !== "-") {
        seat_price += SeatData[seat]["price"];
        seat_count++
      }
    })

    Object.values(weights).forEach((weight) => {
      luggage_price += weight * 30;
      if (weight !== 0) {
        luggage_count++
      }
    })

    return (
      <div className="flex justify-center">
        {`All Seat Price (x${seat_count}): ${seat_price.toLocaleString()}`}<br />
        {`All Luggage Price (x${luggage_count}): ${luggage_price.toLocaleString()}`}<br />
        {`Total Price : ${(seat_price + luggage_price).toLocaleString()}`}
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/${flight_instance_no}/view_seat_map`
        );
        setSeatData(response.data);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchData();
  }, [flight_instance_no]);

  const SeatClick = (seat) => {
    const isSeatReserved = SeatData[seat] && SeatData[seat].is_reserved;
    const isSeatSelectedByAnother =
      Object.values(selectedSeats).includes(seat) &&
      selectedSeats[currentPassenger] !== seat;

    if (!isSeatReserved && !isSeatSelectedByAnother) {
      setSelectedSeats((prevWeights) => {
        const newWeights = [...prevWeights];
        newWeights[currentPassenger - 1] = seat;
        return newWeights;
      });
    }
  };

  const handleButtonClick = (selectedWeight) => {
    setWeights((prevWeights) => {
      const newWeights = [...prevWeights];
      newWeights[currentPassenger - 1] = selectedWeight;
      return newWeights;
    });
  };

  const handlePassengerChange = (passenger) => {
    setCurrentPassenger(passenger);
  };

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div>
      <div className="flex justify-center gap-6">
        <div className="passenger-button">
          <div className="checkbox flex items-center justify-center bg-gray-200">
            <span className="mr-2">Show Price</span>
            <input type="checkbox" id="cbx-46" className="w-4 h-4" onClick={handleToggle} />
          </div>
          {Array.from({ length: total_passenger }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePassengerChange(index + 1)}
              className={currentPassenger === index + 1 ? "selected" : ""}
            >
              <p className="font-bold">
                Passenger {index + 1}
              </p>
              <p>
                Seat : {selectedSeats[index] ? selectedSeats[index] : "-"}
              </p>
              <p>
                {weights[index] ? ` Luggage : ${weights[index]} kg` : "No Luggage"}
              </p>
            </button>
          ))}
        </div>
        <div className="seat-map">
          {Object.keys(SeatData).map((seat) => (
            <div
              key={seat}
              className={`seat ${SeatData[seat].is_reserved ? "reserved" : ""
                } ${Object.values(selectedSeats).includes(seat)
                  ? selectedSeats[currentPassenger - 1] === seat
                    ? "selected"
                    : "unavailable"
                  : ""
                } ${SeatData[seat].seat_type === "hot_seat" ? "hot_seat" : ""} ${show ? "show-seat" : "show-price"}`}
              onClick={() => SeatClick(seat)}
            >
              <div className="tooltip">
                {show ? (seat) : `${seat} ${(SeatData[seat].price.toLocaleString())}`}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-center font-bold">**30 THB / 1 kg**</div>
          <div className="select-luggage">
            <button
              onClick={() => handleButtonClick(0)}
              className={`flex justify-center flex-col items-center bg-gray-100 w-28 h-28 rounded-3xl m-5 ${weights[currentPassenger - 1] === 0 ? "bg-red-500 text-white" : ""
                }`}
            >
              <MdNoLuggage className="text-3xl" />
              <p className="font-medium">No Luggage</p>
              <p className="font-medium">0 THB</p>
            </button>
            {weight_packages.map((packageWeight) => (
              <button
                key={packageWeight}
                onClick={() => handleButtonClick(packageWeight)}
                className={`flex justify-center flex-col items-center bg-gray-100 w-28 h-28 rounded-3xl m-5 ${weights[currentPassenger - 1] === packageWeight ? "bg-red-500 text-white" : ""
                  }`}
              >
                <MdLuggage className="text-3xl" />
                <p className="font-medium">{packageWeight} kg</p>
                <p className="font-medium">{(packageWeight * 30).toLocaleString()} THB</p>
              </button>
            ))}
          </div>
        </div>
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex justify-center">
            {total_price()}
          </div>
          <div>
          <button className="text-white bg-red-500 w-18 h-11 rounded-2xl mx-5 p-2" onClick={() => check_seat("/fill_info")}>Continue</button>
          </div>
        </div>
      </div>
  );
}
export default SelectAddOn;