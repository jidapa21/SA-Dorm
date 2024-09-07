package entity

import "gorm.io/gorm"

type Dorm struct {
	gorm.Model
	Type 		string

	GenderID *uint
	Gender   Gender `gorm:"foriegnKey:GenderID"`
	
	Rooms []Room `gorm:"foreignKey:DormID"`
	Reservations []Reservation `gorm:"foreignKey:DormID"`
}