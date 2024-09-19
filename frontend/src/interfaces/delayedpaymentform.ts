export interface DelayedPaymentFormInterface {
    status: string;
    ID?:                number;
    Title?:             string;
    Type?:              string;
    Date_Submission?:	Date;
    Dorm_Payment?:      number;
    Electricly_Bill?:   number;
    Water_Bill?:        number;
    Because_Of?:        string;
    Due_Date?:          Date;
    Status?:            string;
    AdminID?:           string;
    ReservationID?:     string;
}