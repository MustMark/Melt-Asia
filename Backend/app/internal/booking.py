class Booking:

    booking_number = 1
    
    def __init__(self, departure, destination, departure_time, destination_time):
        self.__booking_no = f"B{Booking.booking_number:05d}"
        self.__passenger_list = []
        self.__departure = departure
        self.__destination = destination
        self.__departure_time = departure_time
        self.__destination_time = destination_time
        self.__booking_status = "Pending"
        self.__payment = None 
        Booking.booking_number += 1
    
    def view_passenger_boarding_pass(self):
        boarding_pass_list = {}
        number = 1
        for passenger in self.__passenger_list:
            boarding_pass = passenger.boarding_pass
            boarding_pass_list[f"Passenger {number}"] = {}
            boarding_pass_list[f"Passenger {number}"]["name"] = passenger.name
            boarding_pass_list[f"Passenger {number}"]["flight_no"] = boarding_pass.flight_no
            boarding_pass_list[f"Passenger {number}"]["departure"] = boarding_pass.departure
            boarding_pass_list[f"Passenger {number}"]["destination"] = boarding_pass.destination
            boarding_pass_list[f"Passenger {number}"]["departure_time"] = boarding_pass.departure_time.strftime("%Y-%m-%d %H:%M")
            boarding_pass_list[f"Passenger {number}"]["destination_time"] = boarding_pass.destination_time.strftime("%Y-%m-%d %H:%M")
            boarding_pass_list[f"Passenger {number}"]["luggage"] = boarding_pass.luggage.weight
            boarding_pass_list[f"Passenger {number}"]["seat"] = boarding_pass.seat.row + boarding_pass.seat.column
            number += 1
        return boarding_pass_list

    def add_passenger(self, passenger):
        self.__passenger_list.append(passenger)

    @property
    def payment(self):
        return self.__payment

    @property
    def booking_status(self):
        return self.__booking_status    

    @property
    def passenger(self):
        return self.__passenger_list

    @property
    def booking_no(self):
        return self.__booking_no

    @property
    def destination(self):
        return self.__destination

    @property
    def departure(self):
        return self.__departure

    @property
    def departure_time(self):
        return self.__departure_time
    
    @property
    def destination_time(self):
        return self.__destination_time

    def set_payment(self, transaction):
        self.__payment = transaction

    def set_booking_status(self, status):
        self.__booking_status = status