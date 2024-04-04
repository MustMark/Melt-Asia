from datetime import datetime
from copy import deepcopy

from .user import User
from .promocode import PromoCode
from .booking import Booking
from .passenger import Passenger
from .boardingpass import BoardingPass
from .luggage import Luggage
from .seat import Seat
from .flightinstance import FlightInstance
from .transaction import Transaction
from .creditcard import CreditCard
from .mobilebanking import MobileBanking

class Controller:
    def __init__(self, name):
        self.__name = name
        self.__user_list = []
        self.__guest_list = []
        self.__flight_list = []
        self.__flight_instance_list = []
        self.__admin_list = []
        self.__airplane_list = []
        self.__airport_list = []
        self.__payment_list = []
    
    def get_available_seat(self, flight_instance_no):
        available_seat = []
        flight_instance = self.search_flight_instance_by_flight_instance_no(flight_instance_no)
        for show_seat in flight_instance.show_seat_list:
            if show_seat.is_reserved == False:
                available_seat.append(show_seat.row + show_seat.column)
        return available_seat

    def search_flight(self, departure_name, destination_name, departure_time, total_passenger, promocode = ""):
        flight_list = {}
        departure = self.search_airport_by_airport_name(departure_name)
        destination = self.search_airport_by_airport_name(destination_name)
        for flight_instance in self.__flight_instance_list:
            airplane = self.search_airplane_by_airplane_id(flight_instance.airplane)
            if flight_instance.departure == departure_name and flight_instance.destination == destination_name and str(flight_instance.departure_time.date()) == departure_time:
                available_seat = self.get_available_seat(flight_instance.flight_instance_no)
                if len(available_seat) >= total_passenger:
                    lowest_price_seat = min(available_seat, key=lambda seat_no: flight_instance.search_show_seat_by_seat_no(seat_no).price)
                    lowest_price = flight_instance.search_show_seat_by_seat_no(lowest_price_seat).price
                    
                    flight_departure_time = flight_instance.departure_time
                    flight_destination_time = flight_instance.destination_time
                    duration = flight_destination_time - flight_departure_time
                    discount_price = lowest_price

                    if promocode != "":
                        if self.check_expire_date(promocode) == True:
                            for cur_promocode in PromoCode.promo_code_list:
                                if cur_promocode.code == promocode:
                                    discount_price =  lowest_price - (lowest_price * (cur_promocode.discount/100))
                                    break
                            flight_list[flight_instance.flight_instance_no] = [departure.airport_code, flight_departure_time, destination.airport_code, flight_destination_time, int(duration.total_seconds()), float(lowest_price), float(discount_price)]
                        elif self.check_expire_date(promocode) == False:
                            return "Promo code is expired"
                        else: 
                            return "Promo code is invalid"

                    else:
                        flight_list[flight_instance.flight_instance_no] = [departure.airport_code, flight_departure_time, destination.airport_code, flight_destination_time, int(duration.total_seconds()), float(lowest_price), float(discount_price)]
        if flight_list == {}:
            return "Flight not found"
        return flight_list
    
    def sort_flight(self, flight_list, sort_by):
        if sort_by == "Cheapest":
            flight_order = dict(sorted(flight_list.items(), key = lambda item:item[1][6]))
            return self.show_flight_format(flight_order)
        elif sort_by == "Fastest":
            flight_order = dict(sorted(flight_list.items(), key = lambda item:item[1][4]))
            return self.show_flight_format(flight_order)
        elif sort_by == "Earliest":
            flight_order = dict(sorted(flight_list.items(), key = lambda item:item[1][1]))
            return self.show_flight_format(flight_order)
    
    def get_seat_data(self, flight_instance_no):
        flight_instance = self.search_flight_instance_by_flight_instance_no(flight_instance_no)
        seat_data = {}
        for show_seat in flight_instance.show_seat_list:
            seat_data[show_seat.row + show_seat.column] = {"seat_type" : show_seat.seat_type,
                                                 "price" : show_seat.price,
                                                 "is_reserved" : show_seat.is_reserved
                                                 }
        return seat_data

    def create_booking(self, user_id, flight_instance_no):
        user = self.search_user_by_user_id(user_id)
        flight_instance = self.search_flight_instance_by_flight_instance_no(flight_instance_no)
        booking = Booking(flight_instance.destination, flight_instance.departure, flight_instance.departure_time, flight_instance.destination_time)
        user.add_booking(booking)
        return booking.booking_no

    def fill_info(self, user_id, flight_instance_no, booking_no, seat_no, weight, gender, phone_number, full_name, birth_date, citizen_id):
            flight_instance = self.search_flight_instance_by_flight_instance_no(flight_instance_no)
            airplane = self.search_airplane_by_airplane_id(flight_instance.airplane)
            temporary_seat = flight_instance.search_show_seat_by_seat_no(seat_no)
            user = self.search_user_by_user_id(user_id)
            booking = user.search_booking_by_number(booking_no)
            if booking:
                if booking.booking_status == "Pending":
                    passenger = Passenger(gender, phone_number, full_name, birth_date, citizen_id)
                    boardingpass = BoardingPass(flight_instance.destination, flight_instance.departure, flight_instance.departure_time, flight_instance.destination_time, flight_instance.flight_no)
            
                    boardingpass.set_luggage(Luggage(weight))
                    boardingpass.set_seat(temporary_seat)
                    passenger.set_boarding_pass(boardingpass)
                    booking.add_passenger(passenger)
                    return "Done"

    def cancel_booking(self, user_id, booking_no):
        user = self.search_user_by_user_id(user_id)
        booking = user.search_booking_by_number(booking_no)
        if booking:
            passengers = booking.passenger
            if booking.booking_status == "Confirm":
                for passenger in passengers:
                    boardingpass = passenger.boarding_pass
                    seat = boardingpass.seat
                    seat.cancel_seat()
                    booking.set_booking_status("Cancel")
                return "Cancel booking succesfully"
            elif booking.booking_status == "Pending":
                booking.set_booking_status("Cancel")
                return "Cancel booking succesfully"
            else:
                return "Could not cancel this booking"
        else:
            return "Could not find booking"

    def booking_details(self, user_id, booking_no):
        booking_details = {}
        user = self.search_user_by_user_id(user_id)
        booking = user.search_booking_by_number(booking_no)
        passengers = booking.passenger
        total_passenser = 0
        seat_price = 0
        total_luggages = 0
        luggage_price = 0
        price_summary = 0

        for passenger in passengers:    
            boarding_pass = passenger.boarding_pass
            luggage = boarding_pass.luggage

            luggage_price += self.get_luggage_price(luggage.weight)
            total_luggages += 1

            seat = boarding_pass.seat
            seat_price += seat.price
            total_passenser += 1

        booking_details = {
            "departure" : booking.departure,
            "destination" : booking.destination,
            "departure_time" : booking.departure_time,
            "price" : {
                        "seat price" : seat_price,
                        "luggages price" : luggage_price,
                        "Summary price" : seat_price + luggage_price
            },
            "status" : booking.booking_status
        }
        return booking_details

    def pay(self, user_id, booking_no, booking_details, payment_method, info):
        user = self.search_user_by_user_id(user_id)
        booking = user.search_booking_by_number(booking_no)
        passengers = booking.passenger
        summary_price = booking_details["price"]["Summary price"]
        payment = deepcopy(self.__payment_list[payment_method])
        transaction = Transaction(booking_no, summary_price, payment)
        if payment.processing_payment(summary_price, info) == "Payment successful":

            for passenger in passengers:
                seat = passenger.boarding_pass.seat
                seat.reserve_seat()
    
            booking.set_payment(transaction)
            booking.set_booking_status("Confirm")
            return "Done"
        else:
            return "Insufficient funds"

    def register(self, full_name, email, password, phone_number, address, birth_date):
        if self.search_user_by_full_name(full_name) != None:
            return "Name already used"
        if self.search_user_by_email(email) != None:
            return "Email already used"
        if self.search_user_by_phone_number(phone_number) != None:
            return "Phone number already used"
        
        new_user = User(full_name, email, password, phone_number, address, birth_date)
        self.add_user(new_user)
        return new_user

    def check_expire_date(self, promocode):
        for cur_promocode in PromoCode.promo_code_list:
            if cur_promocode.code == promocode:
                if cur_promocode.expire_date > datetime.now():
                    return True
                else: 
                    return False
        return "Not Found"

    def hash_password(self, password):
        return hash(password)   

    def verify_username(self, email):
        for user in self.__user_list:
            if user.email == email:
                return False
        return True
    
    def verify_login(self, user_data):
        for user in self.__user_list:
            if user.email == user_data.email: 
                hashed = self.hash_password(user_data.password)
                if user.password == hashed :
                    return user
        return False  

    def show_flight_format(self, flight_instance_list):
        format_flight_instance_list = {}
        for flight_instance_no in flight_instance_list.keys():
            flight_no = self.search_flight_no_by_flight_instance_no(flight_instance_no)
            format_flight_instance_list[flight_instance_no] = {}
            format_flight_instance_list[flight_instance_no]["flight_no"] = flight_no
            format_flight_instance_list[flight_instance_no]["flight_instance_no"] = flight_instance_no
            format_flight_instance_list[flight_instance_no]["departure"] = flight_instance_list[flight_instance_no][0]
            format_flight_instance_list[flight_instance_no]["departure_time"] = flight_instance_list[flight_instance_no][1].strftime("%Y-%m-%d %H:%M")
            format_flight_instance_list[flight_instance_no]["destination"] = flight_instance_list[flight_instance_no][2]
            format_flight_instance_list[flight_instance_no]["destination_time"] = flight_instance_list[flight_instance_no][3].strftime("%Y-%m-%d %H:%M")
            hours, remainder = divmod(flight_instance_list[flight_instance_no][4], 3600)
            minutes, _ = divmod(remainder, 60)
            format_flight_instance_list[flight_instance_no]["duration"] = f"{hours}h {minutes}m"
            format_flight_instance_list[flight_instance_no]["price"] = flight_instance_list[flight_instance_no][5]
            format_flight_instance_list[flight_instance_no]["discount"] = flight_instance_list[flight_instance_no][6]
        return format_flight_instance_list
    
    def view_boarding_pass(self, user_id, booking_id):
        user = self.search_user_by_user_id(user_id)
        booking = user.search_booking_by_number(booking_id)
        return booking.view_passenger_boarding_pass()

    def set_seat_price(self, flight_instance_no, base_price):
        flight_instance = self.search_flight_instance_by_flight_instance_no(flight_instance_no)
        airplane = self.search_airplane_by_airplane_id(flight_instance.airplane)
        flight_instance.apply_seat_price(airplane, base_price)

    def search_user_by_user_id(self, user_id):
        for user in self.__user_list:
            if user.user_id == user_id:
                return user

    def search_user_by_phone_number(self, phone_number):
        for user in self.__user_list:
            if user.phone_number == phone_number:
                return user 

    def search_user_by_full_name(self, full_name):
        for user in self.__user_list:
            if user.full_name == full_name:
                return user       
    
    def search_user_by_email(self, email):
        for user in self.__user_list:
            if user.email == email:
                return user

    def search_flight_instance_by_flight_instance_no(self, flight_instance_no):
        for flight_instance in self.__flight_instance_list:
            if flight_instance.flight_instance_no == flight_instance_no:
                return flight_instance
    
    def search_airport_by_airport_name(self, airport_name):
        for airport in self.__airport_list:
            if airport.airport_name == airport_name:
                return airport
    
    def search_airplane_by_airplane_id(self, airplane_id):
        for airplane in self.__airplane_list:
            if airplane.airplane_id == airplane_id:
                return airplane
    
    def search_flight_by_flight_no(self, flight_no):
        for flight in self.__flight_list:
            if flight.flight_no == flight_no:
                return flight
    
    def search_flight_no_by_flight_instance_no(self, flight_instnace_no):
        flight_instnace = self.search_flight_instance_by_flight_instance_no(flight_instnace_no)
        for flight in self.__flight_list:
            if flight.departure == flight_instnace.departure and flight.destination == flight_instnace.destination:
                return flight.flight_no

    def get_luggage_price(self, weight):
        return int("".join(filter(str.isdigit, weight))) * 30
        
    def add_flight_list(self, flight):
        self.__flight_list.append(flight)

    def add_airplane(self, airplane):
        self.__airplane_list.append(airplane)
    
    @property
    def airplane_list(self):
        return self.__airplane_list

    def add_flight_instance_list(self, flight_no, departure_time, destination_time, airplane):
        flight = self.search_flight_by_flight_no(flight_no)
        flight_instance = FlightInstance(flight.departure, flight.destination, flight.flight_no, departure_time, destination_time, airplane)
        self.__flight_instance_list.append(flight_instance)
        return flight_instance.flight_instance_no
        
    def add_admin(self, admin):
        self.__admin_list.append(admin)

    def add_user(self, user):
        self.__user_list.append(user)

    def add_airport(self, airport):
        self.__airport_list.append(airport)

    def add_promocode(self, code):
        PromoCode.promocode_list.append(code)

    def add_payment_list(self, payment):
        self.__payment_list.append(payment)

    @property
    def flight_instance_list(self):
        return self.__flight_instance_list

    @property
    def user_list(self):
        return self.__user_list

    @property
    def guest_list(self):
        return self.__guest_list