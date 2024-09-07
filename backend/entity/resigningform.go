package entity

import (
    "time"
    "gorm.io/gorm"
)

type ResigningForm struct {
    gorm.Model
	Date			time.Time
    Because_Of		string
	Accommodation	string
    Status			string

    // StudentID ทำหน้าที่เป็น FK
    ReservationID	uint
    Reservation		Student `gorm:"foreignKey:ReservationID"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID	uint
    Admin		Admin `gorm:"foreignKey:AdminID"`

}