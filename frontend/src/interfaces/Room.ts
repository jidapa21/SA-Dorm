export interface RoomInterface {
    ID?:                number;
    RoomNumber?:        number;
    Available?:         number;
    DormStatus?:        string;
    Floor?:             number;
    Dorm: {
        dorm_name?:  string;
        Gender: {
            Gender?: string;
        };
    };
}