package entity

import "gorm.io/gorm"

type Genders struct {
	gorm.Model
	Gender string `json:"gender"`

	Student []Students `gorm:"foreignKey:gender_id"`
	Dorms []Dorm `gorm:"foreignKey:GenderID"`
}