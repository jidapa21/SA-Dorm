package entity

import "gorm.io/gorm"

type Room struct {
    gorm.Model
    R_ID            string
    Room_Number     uint
    Available       string
    Confirmation    string

    // DormID ทำหน้าที่เป็น FK
    Dorm_ID     uint
    Dorm        Dorm `gorm:"foreignKey:Dorm_ID"`

    // 1 ห้อง มีนักศึกษาได้หลายคน
    Students    []Student `gorm:"foreignKey:Room_ID"`
}