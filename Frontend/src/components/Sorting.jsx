import React from 'react'

function Sorting({ onSortChange }) {

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        onSortChange(selectedSort);
    };

    return (
        <select className='overflow-y-auto text-white bg-red-500 h-10 w-50 rounded-xl hover:bg-red-600 focus:outline-none focus:ring-red-700 px-5 py-2.5 text-center inline-flex items-center' onChange={handleSortChange} required>
            <option value="Cheapest">Sort by : Cheapest</option>
            <option value="Fastest">Sort by : Fastest</option>
            <option value="Earliest">Sort by : Earliest</option>
        </select>
    )
}

export default Sorting;