package entity

import "gorm.io/gorm"

type Dorm struct {
	gorm.Model
	DormName	string	`json:"dorm_name"`
	Type		string	`json:"type"`

	GenderID	uint	`json:"gender_id"`
	Gender		Genders `gorm:"foriegnKey:GenderID"`
	
	Rooms []Room 				`gorm:"foreignKey:DormID"`
	Reservations []Reservation 	`gorm:"foreignKey:DormID"`
}