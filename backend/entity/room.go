package entity

import "gorm.io/gorm"

type Room struct {
	gorm.Model
	RoomNumber 		uint
	Available 		uint
	DormStatus 	string

	// DormID ทำหน้าที่เป็น FK
	DormID 	uint
	Dorm	Dorm `gorm:"foreignKey:DormID"`

	Reservations []Reservation `gorm:"foreignKey:RoomID"`
}