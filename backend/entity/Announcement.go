package entity

import (
	"time"

	"gorm.io/gorm"
)

type Announcement struct {
	gorm.Model
	Title   string
	Date    time.Time
	Admin_ID uint
	Admin   Admin `gorm:"foriengKey:Admin_ID"`
}