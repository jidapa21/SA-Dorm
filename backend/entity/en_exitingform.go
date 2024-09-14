package entity

import (
	"time"

	"gorm.io/gorm"
)

type En_ExitingForm struct {
	gorm.Model
	Title           string `json:"tital"`
	Type            string `json:"type"`
	Date_Submission time.Time `json:"date_submission"`
	Request         string `json:"request"`
	Because_Of      string `json:"because_of"`
	Date_Request    time.Time `json:"date_request"`
	Status          string `json:"Status"`
	// One-to-one relationship
	ReservationID uint        `json:"reservation_id"`
	Reservation   Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

	// AdminID ทำหน้าที่เป็น FK
	AdminID uint    `json:"admin_id"`
	Admin   *Admins `gorm:"foreignKey:AdminID"`
}
