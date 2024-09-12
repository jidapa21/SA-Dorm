package entity

import "gorm.io/gorm"

type Room struct {
	gorm.Model
	RoomNumber	uint	`json:"room_number"`
	Available 	uint	`json:"available"`
	DormStatus 	string	`json:"dorm_status"`

	// DormID ทำหน้าที่เป็น FK
	DormID 	uint	`json:"dorm_id"`
	Dorm	Dorm 	`gorm:"foriegnKey:DormID"`

	Reservations []Reservation	`gorm:"foreignKey:RoomID"`
}