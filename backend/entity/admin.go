package entity

import "gorm.io/gorm"

type Admin struct {
    gorm.Model
    Username    string  `json:"username"`
    Full_Name   string
    Phone       string
    Password    string  `json:"password"`

    
	PhonNumber          string
	Repairings          []Repairing          `gorm:"foreignKey:AdminID"`
	DelayedPaymentForms []DelayedPaymentForm `gorm:"foreignKey:AdminID"`
	En_ExitingForms     []En_ExitingForm     `gorm:"foreignKey:AdminID"`
	ResigningForms      []ResigningForm      `gorm:"foreignKey:AdminID"`
	Slips               []Slip               `gorm:"foreignKey:AdminID"`
	Announcement        []Announcement       `gorm:"foreignKey:AdminID"`
}