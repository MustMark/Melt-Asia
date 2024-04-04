from .payment import Payment

class CreditCard(Payment):
    def __init__(self):
        self.__card_no = None
        self.__expiration_date = None
        self.__security_code = None
        self.__limit = None

    def processing_payment(self, price_summary, info):
        self.__owner_name = info.card_holder_name
        self.__card_no = info.card_no
        self.__expiration_date = info.expiration_date
        self.__security_code = info.security_code
        self.__limit = 200000

        if self.__limit >= price_summary:
            self.__limit - price_summary
            return "Payment successful"
        else:
            return "Not enough money"