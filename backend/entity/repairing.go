package entity

import (
	"gorm.io/gorm"
	"time"
)

type Repairing struct {
	gorm.Model
	ID               uint `gorm:"primaryKey;autoIncrement"`
	Title            string
	Type             string
	Date_Submission  time.Time
	Detail           string
	Image            string `gorm:"type:longtext" json:"image"`
	Location_Details string
	Contact          string
	Time_Slot        string
	Remarks          *string
	Status           string

	// One-to-one relationship
	ReservationID uint        `json:"reservation_id"`
	Reservation   Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

	// AdminID ทำหน้าที่เป็น FK
	AdminID uint    `json:"admin_id"`
	Admin   *Admins `gorm:"foreignKey:AdminID"`
}
