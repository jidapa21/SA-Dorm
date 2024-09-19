package entity

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model

	ReservationDate time.Time `json:"reservation_date"`
	StudentID      uint    `json:"student_id"`
	Student         Students  `gorm:"foreignKey:StudentID;references:StudentID" json:"student"`

	DormID          uint      `json:"dorm_id"`
	Dorm            Dorm      `gorm:"foreignKey:DormID" json:"dorm"`

	RoomID uint `json:"room_id"`
	Room   Room `gorm:"foreignKey:RoomID" json:"room"`

	Repairings          []Repairing          `gorm:"foreignKey:ReservationID" json:"repairings"`
	DelayedPaymentForms []DelayedPaymentForm `gorm:"foreignKey:ReservationID" json:"delayed_payment_forms"`
	En_ExitingForms     []En_ExitingForm     `gorm:"foreignKey:ReservationID" json:"en_exiting_forms"`
	ResigningForms      []ResigningForm      `gorm:"foreignKey:ReservationID" json:"resigning_forms"`
}
