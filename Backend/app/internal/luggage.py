class Luggage:
    luggage_number = 1
    def __init__(self, weight):
        self.__owner = None
        self.__weight = weight
        self.__luggage_id = f"L{Luggage.luggage_number:05d}"
        Luggage.luggage_number += 1

    @property
    def owner(self):
        return self.__owner

    @property
    def luggage_id(self):
        return self.__luggage_id

    @property
    def weight(self):
        return self.__weight

    def set_owner(self, person):
        self.__owner = person