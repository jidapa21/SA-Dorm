package entity

import "gorm.io/gorm"

type Repairing struct {
    gorm.Model
    RepairingID      uint `gorm:"primaryKey;autoIncrement"`
    Subject          string
    Detail           string
    Image            string `gorm:"type:longtext"`
    Location_Details string
    Contact          string
    Time_Slot        string
    Remarks          *string
    Status           string

    // StudentID ทำหน้าที่เป็น FK
    ReservationID   uint
    Reservation     Reservation `gorm:"foreignKey:ReservationID"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint
    Admin       Admins `gorm:"foreignKey:AdminID"`
}