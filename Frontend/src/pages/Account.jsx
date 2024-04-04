import React from 'react'
import PersonalInfo from '../components/PersonalInfo'
import { useCookies } from 'react-cookie'
import Nav from '../components/Nav'
import { Navigate, useNavigate } from 'react-router-dom'
import ViewBooking from '../components/ViewBooking'

function Account() {
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['user'])

  function logOut() {

    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      setCookie('user', null, { path: '/' })
      navigate("/")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Nav />
      <br></br>
      <PersonalInfo />
      <button onClick={logOut} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 my-10">Log out</button>
      <ViewBooking />
    </div>
  )
}

export default Account