package entity

import (
    "time"
    "gorm.io/gorm"
)

type Student struct {
    gorm.Model
    S_ID        string
    Password    string
    First_Name  string
    Last_Name   string
    Year        uint
    Birthday    time.Time
    Gender      string
    Major       string

    // RoomID ทำหน้าที่เป็น FK
    Room_ID     uint
    Room        Room `gorm:"foreignKey:Room_ID"`

    // 1 นักศึกษาแจ้งซ่อมได้หลายรอบ
    Repairings  []Repairing `gorm:"foreignKey:Student_ID"`

    // 1 นักศึกษาผ่อนผันค่าหอพักได้หลายรอบ
    DelayedPaymentForms  []DelayedPaymentForm `gorm:"foreignKey:Student_ID"`

    // 1 นักศึกษาเข้า-ออกหอพักได้หลายรอบ
    En_ExitingForms  []En_ExitingForm `gorm:"foreignKey:Student_ID"`

    // 1 นักศึกษาลาออกจากหอพักได้ 1 รอบ
    ResigningForms  []ResigningForm `gorm:"foreignKey:Student_ID"`
}