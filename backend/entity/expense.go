package entity

import "gorm.io/gorm"

type Expense struct {
	gorm.Model
	ID		uint    `gorm:"primaryKey;autoIncrement"`
	Remark string `json:"remark"`
	Status string `json:"status"`

	RentFeeID uint     `json:"rent_id"`
	RentFee   *RentFee `gorm:"foreignKey: RentFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"rentfee"`

	ElectricityFeeID uint     `json:"elec_id"`
	ElectricityFee   *ElectricityFee `gorm:"foreignKey: ElectricityFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"electricityfee"`

	WaterFeeID uint     `json:"water_id"`
	WaterFee   *WaterFee `gorm:"foreignKey: WaterFeeID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"waterfee"`

	// One-to-one relationship
	SlipID 	uint         	`json:"reservation_id"`
	Slip   	*Slip 	`gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`
	
		
}
