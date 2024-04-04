class Passenger:
    def __init__(self, gender, tel_no, name, birth_date, citizen_id):
        self.__gender = gender
        self.__tel_no = tel_no
        self.__name = name
        self.__birth_date = birth_date
        self.__citizen_id = citizen_id
        self.__boarding_pass = None
        
    @property
    def name(self):
        return self.__name
    
    @property
    def citizen_id(self):
        return self.__citizen_id

    @property
    def boarding_pass(self):
        return self.__boarding_pass

    def set_boarding_pass(self, boardingpass):
        self.__boarding_pass = boardingpass
    