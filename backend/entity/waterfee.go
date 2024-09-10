package entity

import "gorm.io/gorm"

type WaterFee struct {
	gorm.Model
	amount    float64 `json:"amount"`

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		*Reservations `gorm:"foreignKey: reservation_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`
}