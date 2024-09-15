package entity

import "gorm.io/gorm"

type Repairing struct {
<<<<<<< HEAD
<<<<<<< HEAD
	gorm.Model
	ID               uint    `gorm:"primaryKey;autoIncrement"`
	Title            string  `json:"title"`
	Type             string  `json:"type"`
	Detail           string  `json:"detail"`
	Image            string  `gorm:"type:longtext" json:"image"`
	Location_Details string  `json:"location_details"`
	Contact          string  `json:"contact"`
	Time_Slot        string  `json:"time_slot"`
	Remarks          *string `json:"remarks"`
	Status           string  `json:"status"`
=======
    gorm.Model
    ID                  uint `gorm:"primaryKey;autoIncrement"`
=======
	gorm.Model
>>>>>>> parent of 4c348b8 (ad)
    Subject             string  `json:"subject"`
    Detail              string  `json:"detail"`
    Image               string  `gorm:"type:longtext"; json:"image"`
    Location_Details    string  `json:"location_details"`
    Contact             string  `json:"contact"`
    Time_Slot           string  `json:"time_slot"`
    Remarks             *string `json:"remarks"`
    Status              string  `json:"status"`
<<<<<<< HEAD
>>>>>>> parent of c54501c (s)

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`
}
=======

	// One-to-one relationship
	ReservationID uint        `json:"reservation_id"`
	Reservation   Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

	// AdminID ทำหน้าที่เป็น FK
	AdminID uint    `json:"admin_id"`
	Admin   *Admins `gorm:"foreignKey:AdminID"`
}
>>>>>>> parent of 4c348b8 (ad)
