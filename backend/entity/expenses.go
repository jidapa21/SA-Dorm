package entity

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	gorm.Model
	Date  	time.Time
	Remark	string

	// RentFeeID ทำหน้าที่เป็น FK
	RentFeeID *uint
	RentFees   RentFee `gorm:"foreignKey:RentFeeID"`

	// One-to-one relationship with Student
	RentFeeID uint      `json:"rent_id"`
	RentFees   *Students `gorm:"foreignKey: rent_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"rentfee"`

	

	// ElecFeeID ทำหน้าที่เป็น FK
	ElecFeeID *uint
	ElectricityFees   ElectricityFee `gorm:"foreignKey:ElecFeeID"`

	// 	WaterID ทำหน้าที่เป็น FK
	WaterID *uint
	WaterFees   WaterFee `gorm:"foreignKey:WaterID"`
}