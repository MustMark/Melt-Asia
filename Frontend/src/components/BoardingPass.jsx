import React from "react"

function BoardingPass({ passenger_info }) {

    return (
        <div>
            <div>
                    <img src="/src/assets/BoardingPass.png" className="w-1/2 h-1/2" />
                </div>
                <div className="boardingPass-name">
                    <p>
                        {passenger_info.name}<br />
                    </p>
                </div>
                <div className="boardingPass-departure">
                    <p>
                        {passenger_info.departure}<br />
                    </p>
                </div>
                <div className="boardingPass-destination">
                    <p>
                        {passenger_info.destination}<br />
                    </p>
                </div>
                <div className="boardingPass-flight_no">
                    <p>
                        {passenger_info.flight_no}<br />
                    </p>
                </div>
                <div className="boardingPass-date">
                    <p>
                        {new Date(passenger_info.departure_time)
                            .toLocaleDateString('en-UK', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                    </p>
                </div>
                <div className="boardingPass-time">
                    <p>
                        {new Date(new Date(passenger_info.departure_time)
                            .setHours(new Date(passenger_info.departure_time).getHours() - 1))
                            .toLocaleTimeString('en-UK', {
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                    </p>
                </div>
                <div className="boardingPass-seat">
                    <p>
                        {passenger_info?.seat}
                    </p>
                </div>
            </div>
    )
}

export default BoardingPass