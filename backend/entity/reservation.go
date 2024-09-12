package entity

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model
	ReservationDate	time.Time	`json:"reservation_date"`
	
	StudentID	uint      	`json:"student_id"`
	Student   	Students	`gorm:"foreignKey: student_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`

	DormID 		uint	`json:"dorm_id"`
	Dorm		Dorm  	`gorm:"foriegnKey:DormID"`

	RoomID 		uint	`json:"room_id"`
	Room		Room  	`gorm:"foriegnKey:RoomID"`

	Repairings  			[]Repairing 			`gorm:"foreignKey:ReservationID"`
	DelayedPaymentForms  	[]DelayedPaymentForm 	`gorm:"foreignKey:ReservationID"`
	En_ExitingForms  		[]En_ExitingForm 		`gorm:"foreignKey:ReservationID"`
	ResigningForms  		[]ResigningForm 		`gorm:"foreignKey:ReservationID"`
}