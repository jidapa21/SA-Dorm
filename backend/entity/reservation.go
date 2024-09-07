package entity

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model
	ReserveDate  	time.Time

	
	StudentID *uint
	Student	Student `gorm:"foriegnKey:StudentID"`

	DormID *uint
	Dorm	Dorm  `gorm:"foriegnKey:DormID"`

	RoomID *uint
	Room	Room  `gorm:"foriegnKey:RoomID"`

}