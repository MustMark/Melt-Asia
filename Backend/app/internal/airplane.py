from .seat import Seat

class Airplane:
    airplane_number = 1
    def __init__(self, total_seat):
        self.__airplane_id = f"A{Airplane.airplane_number:05d}"
        self.__total_seat = total_seat
        self.__seat_list = [Seat("1", "A", "hot_seat"),
                            Seat("1", "B", "hot_seat"),
                            Seat("1", "C", "hot_seat"),
                            Seat("1", "D", "hot_seat"),
                            Seat("1", "E", "hot_seat"),
                            Seat("1", "F", "hot_seat"),
                            Seat("2", "A", "standard_seat"),
                            Seat("2", "B", "standard_seat"),
                            Seat("2", "C", "standard_seat"),
                            Seat("2", "D", "standard_seat"),
                            Seat("2", "E", "standard_seat"),
                            Seat("2", "F", "standard_seat"),                                   
                            Seat("3", "A", "standard_seat"),
                            Seat("3", "B", "standard_seat"),
                            Seat("3", "C", "standard_seat"),
                            Seat("3", "D", "standard_seat"),
                            Seat("3", "E", "standard_seat"),
                            Seat("3", "F", "standard_seat"),
                            Seat("4", "A", "standard_seat"),
                            Seat("4", "B", "standard_seat"),
                            Seat("4", "C", "standard_seat"),
                            Seat("4", "D", "standard_seat"),
                            Seat("4", "E", "standard_seat"),
                            Seat("4", "F", "standard_seat"),
                            Seat("5", "A", "standard_seat"),
                            Seat("5", "B", "standard_seat"),
                            Seat("5", "C", "standard_seat"),
                            Seat("5", "D", "standard_seat"),
                            Seat("5", "E", "standard_seat"),
                            Seat("5", "F", "standard_seat"),
                            Seat("6", "A", "standard_seat"),
                            Seat("6", "B", "standard_seat"),
                            Seat("6", "C", "standard_seat"),
                            Seat("6", "D", "standard_seat"),
                            Seat("6", "E", "standard_seat"),
                            Seat("6", "F", "standard_seat"),
                            Seat("7", "A", "standard_seat"),
                            Seat("7", "B", "standard_seat"),
                            Seat("7", "C", "standard_seat"),
                            Seat("7", "D", "standard_seat"),
                            Seat("7", "E", "standard_seat"),
                            Seat("7", "F", "standard_seat"),
                            Seat("8", "A", "standard_seat"),
                            Seat("8", "B", "standard_seat"),
                            Seat("8", "C", "standard_seat"),
                            Seat("8", "D", "standard_seat"),
                            Seat("8", "E", "standard_seat"),
                            Seat("8", "F", "standard_seat"),
                            Seat("9", "A", "standard_seat"),
                            Seat("9", "B", "standard_seat"),
                            Seat("9", "C", "standard_seat"),
                            Seat("9", "D", "standard_seat"),
                            Seat("9", "E", "standard_seat"),
                            Seat("9", "F", "standard_seat"),
                            Seat("10", "A", "standard_seat"),
                            Seat("10", "B", "standard_seat"),
                            Seat("10", "C", "standard_seat"),
                            Seat("10", "D", "standard_seat"),
                            Seat("10", "E", "standard_seat"),
                            Seat("10", "F", "standard_seat")]
        Airplane.airplane_number += 1

    def count_seat_type(self, seat_type):
        return len(self.__seat_list[seat_type])

    @property
    def seat_list(self):
        return self.__seat_list
        
    @property
    def total_seat(self):
        return self.__total_seat

    @property
    def airplane_id(self):
        return self.__airplane_id