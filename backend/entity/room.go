package entity

import "gorm.io/gorm"

type Room struct {
	gorm.Model
	RoomNumber 		uint
	Available 		uint
	DormStatus 	string

	// DormID ทำหน้าที่เป็น FK
	DormID uint `json:"dorm_id"`
    Dorm   Dorm `gorm:"foreignKey:DormID" json:"dorm"`

	Reservations []Reservation `gorm:"foreignKey:RoomID"`
}