package entity

import "gorm.io/gorm"

type ElectricityFee struct {
	gorm.Model
	amount    float64 `json:"amount"`

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		*Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

	ExpenseID	uint      `json:"ex_id"`
	Expense		*Expense `gorm:"foreignKey: ExpenseID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"expense"`
}