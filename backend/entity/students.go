package entity

import (
    "time"
    "gorm.io/gorm"
)

type Students struct {
    gorm.Model
    StudentID string    `json:"student_id"`
	Password  string    `json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday"`
	Year      uint      `json:"year"`
	Major     string    `json:"major"`

	GenderID uint     `json:"gender_id"`
	Gender   *Genders `gorm:"foreignKey: gender_id" json:"gender"`

    // RoomID ทำหน้าที่เป็น FK
    RoomID     uint
    Room        Room `gorm:"foreignKey:RoomID"`

    // 1 นักศึกษาแจ้งซ่อมได้หลายรอบ
    Repairings  []Repairing `gorm:"foreignKey:StudentsID"`

    // 1 นักศึกษาผ่อนผันค่าหอพักได้หลายรอบ
    DelayedPaymentForms  []DelayedPaymentForm `gorm:"foreignKey:StudentsID"`

    // 1 นักศึกษาเข้า-ออกหอพักได้หลายรอบ
    En_ExitingForms  []En_ExitingForm `gorm:"foreignKey:StudentsID"`

    // 1 นักศึกษาลาออกจากหอพักได้ 1 รอบ
    ResigningForms  []ResigningForm `gorm:"foreignKey:StudentsID"`
}