package entity

import (

	"gorm.io/gorm"
)

type RentFee struct {
	gorm.Model
	Amount	float64


	// DormID ทำหน้าที่เป็น FK
	ReservationID *uint
	Reservations   Reservation `gorm:"foreignKey:ReservationID"`
	
	// 1 RentFee เป็นเจ้าของได้หลาย Expenses
	Expenses []Expense `gorm:"foreignKey:RentFeeID"`
}