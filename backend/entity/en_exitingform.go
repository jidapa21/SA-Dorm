package entity

<<<<<<< HEAD
import (
<<<<<<< HEAD
	"time"
	"gorm.io/gorm"
)
=======
    "time"
    "gorm.io/gorm"
)

type En_ExitingForm struct {
    gorm.Model
	Date_Submission	time.Time `json:"ddate_submission"`
	Request			string `json:"request"`
    Because_Of		string `json:"because_of"`
	Date_Request	time.Time `json:"date_request"`
    Status			string `json:"status"`
>>>>>>> parent of 1c9936c (ad)

type En_ExitingForm struct {
	gorm.Model
<<<<<<< HEAD
	Title           string `json:"tital"`
	Type            string `json:"type"`
	Date_Submission time.Time `json:"date_submission"`
	Request         string `json:"request"`
	Because_Of      string `json:"because_of"`
	Date_Request    time.Time `json:"date_request"`
	Status          string `json:"Status"`
=======
import "gorm.io/gorm"
=======
    Subject             string  `json:"subject"`
    Detail              string  `json:"detail"`
	Image            string  `gorm:"type:longtext" json:"image"`
	Location_Details string  `json:"location_details"`
	Contact          string  `json:"contact"`
	Time_Slot        string  `json:"time_slot"`
	Remarks          *string `json:"remarks"`
	Due_Date        time.Time `json:"due_date"`
	Status           string  `json:"status"`


	// One-to-one relationship
	ReservationID uint        `json:"reservation_id"`
	Reservation   Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`
>>>>>>> parent of c387d97 (ad)

type Repairing struct {
    gorm.Model
    ID                  uint `gorm:"primaryKey;autoIncrement"`
    Subject             string  `json:"subject"`
    Detail              string  `json:"detail"`
	Image            string  `gorm:"type:longtext" json:"image"`
	Location_Details string  `json:"location_details"`
	Contact          string  `json:"contact"`
	Time_Slot        string  `json:"time_slot"`
	Remarks          *string `json:"remarks"`
	Status           string  `json:"status"`
    Status              string  `json:"status"`

>>>>>>> parent of c54501c (s)
	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

<<<<<<< HEAD
<<<<<<< HEAD
	// AdminID ทำหน้าที่เป็น FK
	AdminID uint    `json:"admin_id"`
	Admin   *Admins `gorm:"foreignKey:AdminID"`
}
=======
    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`

}
>>>>>>> parent of 1c9936c (ad)
=======
    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`
}
>>>>>>> parent of c54501c (s)
