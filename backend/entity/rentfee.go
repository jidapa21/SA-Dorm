package entity

import "gorm.io/gorm"

type RentFee struct {
	gorm.Model
	amount    float64 `json:"amount"`

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		*Reservations `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

<<<<<<< HEAD
=======
	// DormID ทำหน้าที่เป็น FK
	ReservationID *uint
	Reservations   Reservation `gorm:"foreignKey:ReservationID"`
	
	// 1 RentFee เป็นเจ้าของได้หลาย Expenses
>>>>>>> fc1a2ccd5fba07413e956c298f9ae51bf9e9842f
	Expenses []Expense `gorm:"foreignKey:RentFeeID"`
}