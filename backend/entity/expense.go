package entity

import "gorm.io/gorm"

type Expense struct {
	gorm.Model
	ID		uint    `gorm:"primaryKey;autoIncrement"`
	Remark string `json:"remark"`
	Status string `json:"status"`
	TotalAmount	float64 `json:"totalamount"`

	RentFeeID uint     `json:"rent_id"`
	RentFee   *RentFee `gorm:"foreignKey: RentFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"rentfee"`

	ElectricityFeeID uint     `json:"elec_id"`
	ElectricityFee   *ElectricityFee `gorm:"foreignKey: ElectricityFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"electricityfee"`

	WaterFeeID uint     `json:"water_id"`
	WaterFee   *WaterFee `gorm:"foreignKey: WaterFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"waterfee"`

	StudentsID uint            `json:"student_id"`
	Student   *Students `gorm:"foreignKey: StudentsID" json:"student"`
		
}