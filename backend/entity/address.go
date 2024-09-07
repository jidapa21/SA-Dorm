package entity

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	HouseNo     string
	VillageNo   string
	Village     string
	Alley       string
	Road        string
	SubDistrict string
	District    string
	Province    string
	PostCode    string

	// One-to-one relationship with Student
	//StudentID string
	StudentID uint
	Student   *Students `gorm:"foreignKey:StudentID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}