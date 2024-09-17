package entity

import "gorm.io/gorm"

type WaterFee struct {
	gorm.Model
	ID		uint    	`gorm:"primaryKey;autoIncrement"`
	Amount float64 		`json:"amount"`

	// One-to-one relationship
	ReservationID 	uint         	`json:"reservation_id"`
	Reservation   	*Reservation 	`gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`
}
