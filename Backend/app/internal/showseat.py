from .seat import Seat

class ShowSeat(Seat):
    def __init__(self, row, column, seat_type, price):
        super().__init__(row, column, seat_type)
        self.__price = price
        self.__is_reserved = False

    @property
    def price(self):
        return self.__price
    
    @property
    def is_reserved(self):
        return self.__is_reserved
    
    def reserve_seat(self):
        self.__is_reserved = True

    def cancel_seat(self):
        self.__is_reserved = False
