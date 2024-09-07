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
    Student_ID	string
    Student		Student `gorm:"foreignKey:StudentID"`

    // AdminID ทำหน้าที่เป็น FK
    Admin_ID	string
    Admin		Admin `gorm:"foreignKey:AdminID"`

}