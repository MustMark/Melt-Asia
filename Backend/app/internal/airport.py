class Airport:
    def __init__(self, airport_name, airport_code):
        self.__airport_name = airport_name
        self.__airport_code = airport_code
        self.__current_airplane_list = []

    @property
    def current_airplane(self):
        return self.__current_airplane_list
    
    @property
    def airport_name(self):
        return self.__airport_name
    
    @property
    def airport_code(self):
        return self.__airport_code