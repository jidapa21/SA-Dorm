package entity

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model
	ID              uint `gorm:"primaryKey;autoIncrement"`
	ReservationDate time.Time

	StudentsID uint     `json:"student_id"`
	Student    Students `gorm:"foreignKey: StudentsID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`

	DormID uint
	Dorm   Dorm `gorm:"foreignKey:DormID"`

	RoomID uint
	Room   Room `gorm:"foreignKey:RoomID"`

	Repairings          []Repairing          `gorm:"foreignKey:ReservationID"`
	DelayedPaymentForms []DelayedPaymentForm `gorm:"foreignKey:ReservationID"`
	En_ExitingForms     []En_ExitingForm     `gorm:"foreignKey:ReservationID"`
	ResigningForms      []ResigningForm      `gorm:"foreignKey:ReservationID"`
}
