class BoardingPass:
    def __init__(self, destination, departure, departure_time, destination_time, flight_no):
        self.__flight_no = flight_no
        self.__destination = destination
        self.__departure = departure
        self.__departure_time = departure_time
        self.__destination_time = destination_time
        self.__luggage = None
        self.__seat = None

    @property
    def flight_no(self):
        return self.__flight_no
    
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

    @property
    def seat(self):
        return self.__seat
        
    @property
    def luggage(self):
        return self.__luggage

    def set_luggage(self, selected_luggage):
        self.__luggage = selected_luggage

    def set_seat(self, target_seat):
        self.__seat = target_seat