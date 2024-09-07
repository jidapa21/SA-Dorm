package entity

import "gorm.io/gorm"

type Admin struct {
    gorm.Model
    Username    string
    Full_Name   string
    Phone       string
    Password    string

    // 1 แอดมินอนุมัติการซ่อมได้หลายรอบ
    Repairings  []Repairing `gorm:"foreignKey:Admin_ID"`

    // 1 แอดมินอนุมัติฟอร์มผ่อนผันค่าหอพักได้หลายรอบ
    DelayedPaymentForms  []DelayedPaymentForm `gorm:"foreignKey:Admin_ID"`

    // 1 นักศึกษาเข้า-ออกหอพักได้หลายรอบ
    En_ExitingForms  []En_ExitingForm `gorm:"foreignKey:Admin_ID"`

    // 1 นักศึกษาลาออกจากหอพักได้ 1 รอบ
    ResigningForms  []ResigningForm `gorm:"foreignKey:Admin_ID"`
}