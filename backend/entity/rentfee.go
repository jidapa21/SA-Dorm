package entity

import "gorm.io/gorm"

type RentFee struct {
	gorm.Model
	amount    float64 `json:"amount"`

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		*Reservations `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

	Expenses []Expense `gorm:"foreignKey:RentFeeID"`
}