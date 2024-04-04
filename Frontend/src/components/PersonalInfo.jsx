import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

function PersonalInfo() {
    const [cookies, setCookie] = useCookies(['user']);
    const [personalInfo, setPersonalInfo] = useState(null);

    useEffect(() => {
        info();
    }, []);

    const info = async () => {
        try {
            const userId = cookies.user._User__user_id;
            const response = await axios.get(`http://localhost:8000/${userId}/view_personal_info`);
            setPersonalInfo(response.data)
        }
        catch (error) {
            alert("Failed")
            return null
        }

    }

    return (
        <div className="container mx-auto mt-8 p-4 ">
            <h1 className="text-3xl font-semibold mb-4">Personal Information</h1>
            <div className="bg-gray-100 rounded p-4 rounded-2xl">
                {personalInfo && (
                    <div>
                        <p className="mb-2">User ID: {cookies.user._User__user_id}</p>
                        <p className="mb-2">Full Name: {personalInfo.full_name}</p>
                        <p className="mb-2">Email: {personalInfo.email}</p>
                        <p className="mb-2">Phone Number: {personalInfo.phone_number}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalInfo