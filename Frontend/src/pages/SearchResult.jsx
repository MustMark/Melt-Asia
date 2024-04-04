import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';
import FlightDetails from '../components/FlightDetails';
import Sorting from '../components/Sorting'
import axios from 'axios';

function SearchResult() {
  const location = useLocation();

  const [flightList, setflightList] = useState([]);
  const [selectedSort, setSelectedSort] = useState('Cheapest');

  useEffect(() => {
    const fetchData = async () => {
      const sort = selectedSort;
      const response = await axios.get(
        `http://localhost:8000/sort_flight?sort_by=${sort}`
      );
      setflightList(response.data);
    };

    fetchData();
  }, [selectedSort]);

  const handleSortChange = (newSort) => {
    setSelectedSort(newSort);
  };

  return (
    <div className="h-screen relative">
      <img src="/src/assets/MeltPlane.svg" className="z-[-1] bg-cover fixed" style={{ objectFit: 'cover' }} />
      <Nav />
      <div className="scrollable-container overflow-y-auto translate-y-20 d-flex">
        <div className="flex justify-center">
          <Sorting onSortChange={handleSortChange} />
        </div>
        {Object.keys(flightList).map(flightKey => (
          <div className="flex justify-center items-center" key={flightKey}>
            <FlightDetails flight_info={flightList[flightKey]} total_passenger={location.state.total_passenger} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult