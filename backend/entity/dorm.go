package entity

import "gorm.io/gorm"

type Dorm struct {
    gorm.Model
    Type            string
    Dorm_Gender     string

    // 1 หอพัก มีได้หลายห้อง
    Rooms       []Room `gorm:"foreignKey:DormID"`
}