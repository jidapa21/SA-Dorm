package entity

import (
	"time"

	"gorm.io/gorm"
)

type Announcement struct {
	gorm.Model
	Title   string    `json:"title"`
	Content string    `json:"content"`
	Date    time.Time `json:"date"`
	AdminID uint      `json:"admin_id"`
	Admin   *Admins   `gorm:"foreignKey:AdminID"`
}
