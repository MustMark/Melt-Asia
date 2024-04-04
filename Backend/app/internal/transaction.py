class Transaction:
    transaction_number = 1
    def __init__(self, booking_no, summary_price, payment_method):
        self.__booking_no = booking_no
        self.__summary_price = summary_price
        self.__payment_method = payment_method
        self.__transaction_id = f"T{Transaction.transaction_number:05d}"