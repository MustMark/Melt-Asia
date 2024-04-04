import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import FirstPage from './pages/FirstPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchFlights from './pages/SearchFlights';
import SearchResult from './pages/SearchResult';
import AddOn from './pages/AddOn';
import Payment from './pages/Payment';
import PayByCard from './pages/PayByCard';
import PayByMobile from './pages/PayByMobile';
import ViewBoardingPass from './pages/ViewBoardingPass';
import Account from './pages/Account';
import FillInfo from './pages/FillInfo';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<FirstPage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/search/flights"
          element={<SearchFlights />}
        />
        <Route
          path="/search/flights_results"
          element={<SearchResult />}
        />
        <Route
          path="add_on"
          element={<AddOn />}
        />
        <Route
          path="fill_info"
          element={<FillInfo />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/payment"
          element={<Payment />}
        />
        <Route
          path="/payment/card"
          element={<PayByCard />}
        />
        <Route
          path="/payment/mobile"
          element={<PayByMobile />}
        />
        <Route
          path="/account"
          element={<Account />}
        />
        <Route
          path="/view_boarding_pass"
          element={<ViewBoardingPass />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App