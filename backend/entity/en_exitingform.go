package entity

import (
	"gorm.io/gorm"
	"time"
)

type En_ExitingForm struct {
	gorm.Model
	ID              uint `gorm:"primaryKey;autoIncrement"`
	Date_Submission time.Time
	Request         string
	Because_Of      string
	Date_Request    time.Time
	Status          string

	// One-to-one relationship
	ReservationID uint        `json:"reservation_id"`
	Reservation   Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

	// AdminID ทำหน้าที่เป็น FK
	AdminID uint    `json:"admin_id"`
	Admin   *Admins `gorm:"foreignKey:AdminID"`
}
