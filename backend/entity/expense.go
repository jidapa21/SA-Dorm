package entity

import "gorm.io/gorm"

type Expense struct {
	gorm.Model
	Remark	string    `json:"remark"`
	Status  string    `json:"status"`

	// One-to-one relationship
	RentFeeID	uint      `json:"rent_id"`
	RentFee		*RentFees `gorm:"foreignKey: rent_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"rentfee"`

	ElectricityFeeID	uint      `json:"elec_id"`
	ElectricityFee		*ElectricityFees `gorm:"foreignKey: elec_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"electricityfee"`

	WaterFeeID	uint      `json:"water_id"`
	WaterFee	*WaterFees `gorm:"foreignKey: water_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"waterfee"`
}