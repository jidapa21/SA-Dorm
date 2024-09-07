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
    Student_ID	uint
    Student		Student `gorm:"foreignKey:StudentID"`

    // AdminID ทำหน้าที่เป็น FK
    Admin_ID	uint
    Admin		Admin `gorm:"foreignKey:AdminID"`

}