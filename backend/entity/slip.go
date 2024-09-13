package entity

import (
	"gorm.io/gorm"
	"time"
)

type Slip struct {
	gorm.Model
	ID   uint      `gorm:"primaryKey;autoIncrement"`
	Path string    `gorm:"type:longtext" json:"path"`
	Date time.Time `json:"date"`
	//เพิ่มราคารวมมาใหม่
	Totalamount float64 `json:"totalamount"`

	// AdminID ทำหน้าที่เป็น FK
	AdminID uint    `json:"admin_id"`
	Admin   *Admins `gorm:"foreignKey:AdminID"`

	ExpenseID uint     `json:"ex_id"`
	Expense   *Expense `gorm:"foreignKey: ExpenseID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"expense"`
}
