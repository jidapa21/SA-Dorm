package entity

import "gorm.io/gorm"

type Gender struct {
	gorm.Model
	Gender_type string

	Students []Student `gorm:"foreignKey:GenderID"`
	Dorms []Dorm `gorm:"foreignKey:GenderID"`
}