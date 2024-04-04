import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from "axios";

function PassengersInfo({ booking_data, passenger_data }) {
  const navigate = useNavigate();

  const total_passenger = Object.keys(passenger_data).length
  const [cookies, setCookie] = useCookies(['user']);
  const userId = cookies.user._User__user_id;
  const flight_instance_no = booking_data.flight_instance_no;

  const [firstname, setFirstname] = useState(Array.from({ length: total_passenger }, () => ""));
  const [surname, setSurname] = useState(Array.from({ length: total_passenger }, () => ""));
  const [citizenID, setCitizenID] = useState(Array.from({ length: total_passenger }, () => ""));
  const [phoneNumber, setPhoneNumber] = useState(Array.from({ length: total_passenger }, () => ""));
  const [birthDate, setBirthDate] = useState(Array.from({ length: total_passenger }, () => ""));
  const [gender, setGender] = useState(Array.from({ length: total_passenger }, () => ""));
  const [currentPassenger, setCurrentPassenger] = useState(1);

  const fill_info = async (passenger_info, route) => {

    const userId = cookies.user._User__user_id;
    const response = await axios.post(`http://localhost:8000/${userId}/${flight_instance_no}/create_booking`);

    for (let passenger = 1; passenger <= total_passenger; passenger++) {

      const data = {
        seat_no: passenger_info[`Passenger${passenger}`]["seat"],
        gender: passenger_info[`Passenger${passenger}`]["passenger_gender"],
        tel_no: passenger_info[`Passenger${passenger}`]["phone_number"],
        name: passenger_info[`Passenger${passenger}`]["full_name"],
        birth_date: passenger_info[`Passenger${passenger}`]["birth_date"],
        citizen_id: passenger_info[`Passenger${passenger}`]["citizen_id"],
        package: passenger_info[`Passenger${passenger}`]["weight"].toString()
      }

      await axios.post(`http://localhost:8000/${userId}/${response.data}/${flight_instance_no}/fill_info`, data)
    }

    navigate(route, {
      state: {
        booking_data: booking_data,
        passenger_data: PassengerInfo(),
        booking_id: response.data
      }
    })
  }

  const check_info = (route) => {
    const passenger_info = PassengerInfo()
    for (let passenger = 1; passenger <= total_passenger; passenger++) {
      const Passenger = passenger_info[`Passenger${passenger}`]
      for (const key in Passenger) {
        if (Passenger[key] === "") {
          alert(`Please fill infomation for all passenger!`);
          return;
        }
      }
    }
    fill_info(passenger_info, route)
  }

  const PassengerInfo = () => {

    for (let passenger = 1; passenger <= total_passenger; passenger++) {

      const seat = passenger_data[`Passenger${passenger}`].seat
      const weight = passenger_data[`Passenger${passenger}`].weight
      const full_name = firstname[passenger - 1] + " " + surname[passenger - 1]
      const citizen_id = citizenID[passenger - 1]
      const phone_number = phoneNumber[passenger - 1]
      const birth_date = birthDate[passenger - 1]
      const passenger_gender = gender[passenger - 1]

      passenger_data[`Passenger${passenger}`] = { seat, weight, full_name, citizen_id, phone_number, birth_date, passenger_gender };

    }

    return passenger_data;
  };

  const handleFirstnameChange = (firstname) => {
    setFirstname((prev) => {
      const newvalue = [...prev];
      newvalue[currentPassenger - 1] = firstname;
      return newvalue;
    });
  };

  const handleSurnameChange = (surname) => {
    setSurname((prev) => {
      const newvalue = [...prev];
      newvalue[currentPassenger - 1] = surname;
      return newvalue;
    });
  };

  const handleCitizenIDChange = (CitizenID) => {
    setCitizenID((prev) => {
      const newvalue = [...prev];
      newvalue[currentPassenger - 1] = CitizenID;
      return newvalue;
    });
  };

  const handlePhoneNumberChange = (PhoneNumber) => {
    setPhoneNumber((prev) => {
      const newvalue = [...prev];
      newvalue[currentPassenger - 1] = PhoneNumber;
      return newvalue;
    });
  };

  const handleBirthDateChange = (BirthDate) => {
    setBirthDate((prev) => {
      const newvalue = [...prev];
      newvalue[currentPassenger - 1] = BirthDate;
      return newvalue;
    });
  };

  const handleGenderChange = (Gender) => {
    setGender((prev) => {
      const newvalue = [...prev];
      newvalue[currentPassenger - 1] = Gender;
      return newvalue;
    });
  };

  const handlePassengerChange = (passenger) => {
    setCurrentPassenger(passenger);
  };

  return (
    <div>
      <div className="passenger-button -translate-x-36 translate-y-6 ">
        {Array.from({ length: total_passenger }, (_, index) => (
          <div className="mb-3">
            <button
              key={index + 1}
              onClick={() => handlePassengerChange(index + 1)}
              className={currentPassenger === index + 1 ? "selected-passenger" : ""}
            >
              <p className="font-bold">
                Passenger {index + 1}
              </p>
              <p>({passenger_data[`Passenger${index + 1}`].seat} , {passenger_data[`Passenger${index + 1}`].weight} kg)</p>
            </button>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 m-5">
        <div className="relative z-0 w-full group">
          <input type="text" placeholder="" value={firstname[currentPassenger - 1]} onChange={(e) => handleFirstnameChange(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
          <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
        </div>
        <div className="relative z-0 w-full group">
          <input type="text" placeholder="" value={surname[currentPassenger - 1]} onChange={(e) => handleSurnameChange(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
          <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
        </div>
      </div>
      <div className="relative z-0 w-full mb-5 group m-5">
        <input type="text" placeholder="" maxLength="13" value={citizenID[currentPassenger - 1]} onChange={(e) => handleCitizenIDChange(e.target.value)} className="block py-2.5 px-0 w-11/12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Citizen ID</label>
      </div>
      <div className="relative z-0 w-full mb-5 group m-5">
        <input type="text" placeholder="" maxLength="10" value={phoneNumber[currentPassenger - 1]} onChange={(e) => handlePhoneNumberChange(e.target.value)} className="block py-2.5 px-0 w-11/12 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 m-5">
        <div className="relative z-0 w-full mb-5 group py-4">
          <p className="text-gray-400">Birth Date</p>
          <input type="date" placeholder="Birth Date" value={birthDate[currentPassenger - 1]} onChange={(e) => handleBirthDateChange(e.target.value)} className="col-span-1 p-1 ps-4 bg-neutral-50 border-solid rounded-3xl pe-5 text-slate-800" required />
        </div>
        <div className="relative z-0 w-full mb-5 gap-10 py-2 mx-10">
          <div className="flex flex-col gap-6">
            <div>
              <input type="radio" name="gender" value="male" checked={gender[currentPassenger - 1] === 'male'} onChange={(e) => handleGenderChange(e.target.value)} />
              <label htmlFor="male" className="mx-2">Male</label>
            </div>
            <div>
              <input type="radio" name="gender" value="female" checked={gender[currentPassenger - 1] === 'female'} onChange={(e) => handleGenderChange(e.target.value)} />
              <label htmlFor="female" className="mx-2">Female</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className="transition-colors duration-200 bg-red-500 text-white w-full h-11 border-none outline-none rounded-3xl cursor-pointer font-medium mt-3 hover:bg-red-600 hover:text-neutral-50" onClick={() => check_info("/payment")}>Continue</button>
      </div>
    </div>
  )
}

export default PassengersInfo;