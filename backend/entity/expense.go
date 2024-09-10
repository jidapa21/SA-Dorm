package entity

import "gorm.io/gorm"

type Expense struct {
	gorm.Model
	Remark	string    `json:"remark"`
	Status  string    `json:"status"`

	RentFees  			[]RentFee `gorm:"foreignKey:ExpenseID"`
	ElectricityFees  	[]ElectricityFee `gorm:"foreignKey:ExpenseID"`
	WaterFees  			[]WaterFee `gorm:"foreignKey:ExpenseID"`

}