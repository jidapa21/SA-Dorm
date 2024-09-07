package entity

import "gorm.io/gorm"

type Repairing struct {
    gorm.Model
    Subject          string
    Detail           string
    Image            []byte // ใช้ []byte แทน blob
    Location_Details string
    Contact          string
    Time_Slot        string
    Remarks          *string
    Status           string

    // StudentID ทำหน้าที่เป็น FK
    Student_ID  uint
    Student     Student `gorm:"foreignKey:StudentID"`

    // AdminID ทำหน้าที่เป็น FK
    Admin_ID    uint
    Admin       Admin `gorm:"foreignKey:AdminID"`
}