export interface DelayedPaymentFormInterface {
    ID?:                number;
    Dorm_Payment?:      number | null;
    Electricly_Bill?:   number | null;
    Water_Bill?:        number | null;
    Because_Of?:        string;
    Due_Date?:          Date;
    Status?:            string;
    AdminID?:           string;
    ReservationID?:     string;
}