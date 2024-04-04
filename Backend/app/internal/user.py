from .booking import Booking

class User():
    user_number = 1
    def __init__(self, full_name, email, password, phone_number, address, birth_date):
        self.__full_name = full_name
        self.__email = email
        self.__user_id = f"U{User.user_number:05d}"
        self.__booking_list = []
        self.__password = password
        self.__phone_number = phone_number
        self.__address = address
        self.__birth_date = birth_date
        User.user_number += 1
    
    def view_personal_info(self):
        personal_details = {
            "full_name" : self.__full_name,
            "email" : self.__email,
            "phone_number" : self.__phone_number
        }
        return personal_details
        
    def view_my_bookings(self):
        booking_details_list = {}
        for booking in self.__booking_list:
            if booking.booking_status == "Pending":
                passengers = booking.passenger
                for cur_passenger in passengers:
                    if cur_passenger.boarding_pass.seat.is_reserved == True:
                        booking.set_booking_status("Cancel")
            booking_details_list[booking.booking_no] = {}
            booking_details_list[booking.booking_no]["departure"] = booking.departure
            booking_details_list[booking.booking_no]["destination"] = booking.destination
            booking_details_list[booking.booking_no]["departure_time"] = booking.departure_time.strftime("%Y-%m-%d %H:%M")
            booking_details_list[booking.booking_no]["destination_time"] = booking.destination_time.strftime("%Y-%m-%d %H:%M")
            booking_details_list[booking.booking_no]["booking_status"] = booking.booking_status
        return booking_details_list

    def add_booking(self, booking):
        if isinstance(booking, Booking):
            self.__booking_list.append(booking)

    def search_booking_by_number(self, booking_number):
        for booking in self.__booking_list:
            if isinstance(booking, Booking) and booking_number == booking.booking_no:
                return booking

    @property
    def email(self):
        return self.__email
    
    @property
    def full_name(self):
        return self.__full_name

    @property
    def phone_number(self):
        return self.__phone_number

    @property
    def password(self):
        return self.__password

    @property
    def user_id(self):
        return self.__user_id