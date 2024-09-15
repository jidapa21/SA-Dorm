package entity

import (
<<<<<<< HEAD
<<<<<<< HEAD
	"time"

=======
>>>>>>> parent of c54501c (s)
	"gorm.io/gorm"
    "time"
)

type DelayedPaymentForm struct {
    gorm.Model
	Title           string
	Type            string    `json:"type"`
	Dorm_Payment    *float64  `json:"dorm_payment"`
	Electricly_Bill *float64  `json:"electricly_bill"`
	Water_Bill      *float64  `json:"water_bill"`
<<<<<<< HEAD
	Because_Of      string    `json:"because_of"`
	Due_Date        time.Time `json:"due_date"`
=======
    "time"
    "gorm.io/gorm"
)

type DelayedPaymentForm struct {
    gorm.Model
    Dorm_Payment     *float64  `json:"dorm_payment"`
    Electricly_Bill  *float64  `json:"electricly_bill"`
    Water_Bill       *float64  `json:"water_bill"`
    Because_Of      string    `json:"because_of"`
    Due_Date        time.Time `json:"due_date"`
>>>>>>> parent of 1c9936c (ad)
=======
    Because_Of      string    `json:"because_of"`
    Due_Date        time.Time `json:"due_date"`
>>>>>>> parent of c54501c (s)
    Status           string    `json:"status"`

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`
}