package entity

import (
    "time"
    "gorm.io/gorm"
)

type En_ExitingForm struct {
    gorm.Model
	Date_Submission	time.Time
	Request			string
    Because_Of		string
	Date_Request	time.Time
    Status			string

    // StudentID ทำหน้าที่เป็น FK
    ReservationID	string
    Reservation		Reservation `gorm:"foreignKey:ReservationID"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID	string
    Admin		Admins `gorm:"foreignKey:AdminID"`

}