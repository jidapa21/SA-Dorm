package entity

import "gorm.io/gorm"

type Expense struct {
	gorm.Model
	Remark string `json:"remark"`
	Status string `json:"status"`

	RentFeeID uint     `json:"rent_id"`
	RentFees   *RentFee `gorm:"foreignKey: RentFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"expense"`

	ElectricityFeeID uint     `json:"elec_id"`
	ElectricityFees   *ElectricityFee `gorm:"foreignKey: ElectricityFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"expense"`

	WaterFeeID uint     `json:"water_id"`
	WaterFees   *WaterFee `gorm:"foreignKey: WaterFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"expense"`

	Slips []Slip `gorm:"foreignKey:ExpenseID"`
}
