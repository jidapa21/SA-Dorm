export interface DelayedPaymentFormInterface {
    status: string;
    ID?:                number;
    Title?:             string;
    title?: string;
    type?: string;
    date_submission?: Date;
    Dorm_Payment?:      number;
    Electricly_Bill?:   number;
    Water_Bill?:        number;
    Because_Of?:        string;
    Due_Date?:          Date;
    Status?:            string;
    AdminID?:           string;
    ReservationID?:     string;
}