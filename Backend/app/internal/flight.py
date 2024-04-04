class Flight:
    def __init__(self, departure, destination, flight_no):
        self.__departure = departure
        self.__destination = destination
        self.__flight_no = flight_no

    @property
    def departure(self):
        return self.__departure
        
    @property
    def destination(self):
        return self.__destination

    @property
    def flight_no(self):
        return self.__flight_no