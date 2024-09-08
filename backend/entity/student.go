package entity

import (
    "time"
    "gorm.io/gorm"
)

type Student struct {
    gorm.Model
    SID      string    `json:"s_id"`
	Password  string    `json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday"`
	Year      uint      `json:"year"`
	Major     string    `json:"major"`

	GenderID uint     `json:"gender_id"`
	Gender   *Gender `gorm:"foreignKey: gender_id" json:"gender"`

    // RoomID ทำหน้าที่เป็น FK
    RoomID     uint
    Room        Room `gorm:"foreignKey:RoomID"`

    // 1 นักศึกษาแจ้งซ่อมได้หลายรอบ
    Repairings  []Repairing `gorm:"foreignKey:StudentID"`

    // 1 นักศึกษาผ่อนผันค่าหอพักได้หลายรอบ
    DelayedPaymentForms  []DelayedPaymentForm `gorm:"foreignKey:StudentID"`

    // 1 นักศึกษาเข้า-ออกหอพักได้หลายรอบ
    En_ExitingForms  []En_ExitingForm `gorm:"foreignKey:StudentID"`

    // 1 นักศึกษาลาออกจากหอพักได้ 1 รอบ
    ResigningForms  []ResigningForm `gorm:"foreignKey:StudentID"`
}