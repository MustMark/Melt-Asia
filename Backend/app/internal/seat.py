class Seat:
    def __init__(self, row, column, seat_type):
        self.__row = row
        self.__column = column
        self.__seat_type = seat_type

    @property
    def row(self):
        return self.__row
        
    @property
    def column(self):
        return self.__column

    @property
    def seat_type(self):
        return self.__seat_type