package entity

import "gorm.io/gorm"

type Personal struct {
	gorm.Model
	Nickname    string
	CitizenID   string
	Phone       string
	Nationality string
	Race        string
	Religion    string
	BloodGroup  string
	UD          *string

	// One-to-one relationship with Student
	//StudentID string
	StudentID uint      `json:"student_id"`
	Student   *Students `gorm:"foreignKey: student_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}