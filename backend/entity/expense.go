package entity

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	gorm.Model
	ID		uint    `gorm:"primaryKey;autoIncrement"`
	Date	time.Time `json:"date"`
	Remark string `json:"remark"`
	Status string `json:"status"`
	TotalAmount	float64 `json:"totalamount"`

	RentFeeID uint     `json:"rent_id"`
	RentFee   *RentFee `gorm:"foreignKey: RentFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"rentfee"`

	ElectricityFeeID uint     `json:"elec_id"`
	ElectricityFee   *ElectricityFee `gorm:"foreignKey: ElectricityFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"electricityfee"`

	WaterFeeID uint     `json:"water_id"`
	WaterFee   *WaterFee `gorm:"foreignKey: WaterFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"waterfee"`

	StudentID uint            `json:"student_id"`
	Student   *Students `gorm:"foreignKey: StudentID" json:"student"`
		
}
