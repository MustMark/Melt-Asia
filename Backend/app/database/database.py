from datetime import datetime

from ..internal.controller import Controller
from ..internal.flight import Flight
from ..internal.airport import Airport
from ..internal.airplane import Airplane
from ..internal.promocode import PromoCode
from ..internal.creditcard import CreditCard
from ..internal.mobilebanking import MobileBanking
from ..internal.user import User


controller = Controller("MeltAsia")

controller.add_airport(Airport("Suvarnabhumi", "BKK"))
controller.add_airport(Airport("Chiang Mai", "CNX"))
controller.add_airport(Airport("Hat Yai", "HDY"))
controller.add_airport(Airport("Khon Kaen", "KKC"))

controller.add_airplane(Airplane(60)) #A00001
controller.add_airplane(Airplane(60)) #A00002
controller.add_airplane(Airplane(60)) #A00003
controller.add_airplane(Airplane(60)) #A00004
controller.add_airplane(Airplane(60)) #A00005
controller.add_airplane(Airplane(60)) #A00006
controller.add_airplane(Airplane(60)) #A00007
controller.add_airplane(Airplane(60)) #A00008
controller.add_airplane(Airplane(60)) #A00009
controller.add_airplane(Airplane(60)) #A00010
controller.add_airplane(Airplane(60)) #A00011
controller.add_airplane(Airplane(60)) #A00012
controller.add_airplane(Airplane(60)) #A00013
controller.add_airplane(Airplane(60)) #A00014
controller.add_airplane(Airplane(60)) #A00015

PromoCode("A1000", 10, datetime(2020, 1, 1)) #Expired PromoCode
PromoCode("A2000", 10, datetime(2029, 1, 1)) #10% discount
PromoCode("B3000", 20, datetime(2029, 1, 1)) #20% discount
PromoCode("C4000", 30, datetime(2029, 1, 1)) #30% discount

controller.add_flight_list(Flight("Suvarnabhumi", "Chiang Mai", "F00001"))
controller.add_flight_list(Flight("Chiang Mai", "Suvarnabhumi", "F00002"))
controller.add_flight_list(Flight("Suvarnabhumi", "Hat Yai", "F00003"))
controller.add_flight_list(Flight("Hat Yai", "Suvarnabhumi", "F00004"))
controller.add_flight_list(Flight("Suvarnabhumi", "Khon Kaen", "F00005"))
controller.add_flight_list(Flight("Khon Kaen", "Suvarnabhumi", "F00006"))

controller.add_payment_list(CreditCard())
controller.add_payment_list(MobileBanking())

#Flight data on 1 April 2024 - 30 Apirl 2024 (Suvarnabhumi - Chiang Mai, Chiang Mai - Suvarnabhumi)
for day in range(1,31):
    flight_instance_no = controller.add_flight_instance_list("F00001",datetime(2024, 4, day, 6, 40, 0), datetime(2024, 4, day, 8, 5, 0), "A00001")
    controller.set_seat_price(flight_instance_no, 1200)
    flight_instance_no = controller.add_flight_instance_list("F00001",datetime(2024, 4, day, 9, 0, 0), datetime(2024, 4, day, 10, 20, 0), "A00002")
    controller.set_seat_price(flight_instance_no, 1400)
    flight_instance_no = controller.add_flight_instance_list("F00001",datetime(2024, 4, day, 11, 35, 0), datetime(2024, 4, day, 12, 50, 0), "A00003")
    controller.set_seat_price(flight_instance_no, 1600)
    flight_instance_no = controller.add_flight_instance_list("F00001",datetime(2024, 4, day, 14, 45, 0), datetime(2024, 4, day, 16, 5, 0), "A00004")
    controller.set_seat_price(flight_instance_no, 1500)
    flight_instance_no = controller.add_flight_instance_list("F00001",datetime(2024, 4, day, 19, 35, 0), datetime(2024, 4, day, 21, 00, 0), "A00005")
    controller.set_seat_price(flight_instance_no, 1300)

    flight_instance_no = controller.add_flight_instance_list("F00002",datetime(2024, 4, day, 9, 35, 0), datetime(2024, 4, day, 11, 0, 0), "A00001")
    controller.set_seat_price(flight_instance_no, 1200)
    flight_instance_no = controller.add_flight_instance_list("F00002",datetime(2024, 4, day, 11, 50, 0), datetime(2024, 4, day, 13, 10, 0), "A00002")
    controller.set_seat_price(flight_instance_no, 1400)
    flight_instance_no = controller.add_flight_instance_list("F00002",datetime(2024, 4, day, 14, 20, 0), datetime(2024, 4, day, 15, 35, 0), "A00003")
    controller.set_seat_price(flight_instance_no, 1600)
    flight_instance_no = controller.add_flight_instance_list("F00002",datetime(2024, 4, day, 17, 35, 0), datetime(2024, 4, day, 18, 55, 0), "A00004")
    controller.set_seat_price(flight_instance_no, 1500)
    flight_instance_no = controller.add_flight_instance_list("F00002",datetime(2024, 4, day, 22, 30, 0), datetime(2024, 4, day, 23, 55, 0), "A00005")
    controller.set_seat_price(flight_instance_no, 1300)

#Flight data on 1 April 2024 - 30 Apirl 2024 (Suvarnabhumi - Hat Yai, Hat Yai - Suvarnabhumi)
for day in range(1,31):
    flight_instance_no = controller.add_flight_instance_list("F00003",datetime(2024, 4, day, 5, 40, 0), datetime(2024, 4, day, 7, 20, 0), "A00006")
    controller.set_seat_price(flight_instance_no, 1300)
    flight_instance_no = controller.add_flight_instance_list("F00003",datetime(2024, 4, day, 8, 0, 0), datetime(2024, 4, day, 9, 35, 0), "A00007")
    controller.set_seat_price(flight_instance_no, 1500)
    flight_instance_no = controller.add_flight_instance_list("F00003",datetime(2024, 4, day, 10, 35, 0), datetime(2024, 4, day, 12, 5, 0), "A00008")
    controller.set_seat_price(flight_instance_no, 1700)
    flight_instance_no = controller.add_flight_instance_list("F00003",datetime(2024, 4, day, 13, 45, 0), datetime(2024, 4, day, 15, 35, 0), "A00009")
    controller.set_seat_price(flight_instance_no, 1600)
    flight_instance_no = controller.add_flight_instance_list("F00003",datetime(2024, 4, day, 18, 35, 0), datetime(2024, 4, day, 20, 15, 0), "A00010")
    controller.set_seat_price(flight_instance_no, 1400)

    flight_instance_no = controller.add_flight_instance_list("F00004",datetime(2024, 4, day, 8, 50, 0), datetime(2024, 4, day, 10, 30, 0), "A00006")
    controller.set_seat_price(flight_instance_no, 1300)
    flight_instance_no = controller.add_flight_instance_list("F00004",datetime(2024, 4, day, 11, 5, 0), datetime(2024, 4, day, 12, 40, 0), "A00007")
    controller.set_seat_price(flight_instance_no, 1500)
    flight_instance_no = controller.add_flight_instance_list("F00004",datetime(2024, 4, day, 13, 35, 0), datetime(2024, 4, day, 15, 5, 0), "A00008")
    controller.set_seat_price(flight_instance_no, 1700)
    flight_instance_no = controller.add_flight_instance_list("F00004",datetime(2024, 4, day, 17, 5, 0), datetime(2024, 4, day, 18, 40, 0), "A00009")
    controller.set_seat_price(flight_instance_no, 1600)
    flight_instance_no = controller.add_flight_instance_list("F00004",datetime(2024, 4, day, 21, 45, 0), datetime(2024, 4, day, 23, 25, 0), "A00010")
    controller.set_seat_price(flight_instance_no, 1400)

#Flight data on 1 April 2024 - 30 Apirl 2024 (Suvarnabhumi - Khon Kaen, Khon Kaen - Suvarnabhumi)
for day in range(1,31):
    flight_instance_no = controller.add_flight_instance_list("F00005",datetime(2024, 4, day, 6, 50, 0), datetime(2024, 4, day, 8, 0, 0), "A00011")
    controller.set_seat_price(flight_instance_no, 1100)
    flight_instance_no = controller.add_flight_instance_list("F00005",datetime(2024, 4, day, 9, 10, 0), datetime(2024, 4, day, 10, 15, 0), "A00012")
    controller.set_seat_price(flight_instance_no, 1300)
    flight_instance_no = controller.add_flight_instance_list("F00005",datetime(2024, 4, day, 11, 45, 0), datetime(2024, 4, day, 12, 45, 0), "A00013")
    controller.set_seat_price(flight_instance_no, 1500)
    flight_instance_no = controller.add_flight_instance_list("F00005",datetime(2024, 4, day, 14, 55, 0), datetime(2024, 4, day, 16, 0, 0), "A00014")
    controller.set_seat_price(flight_instance_no, 1400)
    flight_instance_no = controller.add_flight_instance_list("F00005",datetime(2024, 4, day, 19, 45, 0), datetime(2024, 4, day, 20, 55, 0), "A00015")
    controller.set_seat_price(flight_instance_no, 1200)

    flight_instance_no = controller.add_flight_instance_list("F00006",datetime(2024, 4, day, 9, 30, 0), datetime(2024, 4, day, 10, 40, 0), "A00011")
    controller.set_seat_price(flight_instance_no, 1100)
    flight_instance_no = controller.add_flight_instance_list("F00006",datetime(2024, 4, day, 11, 45, 0), datetime(2024, 4, day, 12, 50, 0), "A00012")
    controller.set_seat_price(flight_instance_no, 1300)
    flight_instance_no = controller.add_flight_instance_list("F00006",datetime(2024, 4, day, 14, 15, 0), datetime(2024, 4, day, 15, 15, 0), "A00013")
    controller.set_seat_price(flight_instance_no, 1500)
    flight_instance_no = controller.add_flight_instance_list("F00006",datetime(2024, 4, day, 17, 30, 0), datetime(2024, 4, day, 18, 35, 0), "A00014")
    controller.set_seat_price(flight_instance_no, 1400)
    flight_instance_no = controller.add_flight_instance_list("F00006",datetime(2024, 4, day, 22, 25, 0), datetime(2024, 4, day, 23, 35, 0), "A00015")
    controller.set_seat_price(flight_instance_no, 1200)