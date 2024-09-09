// ใช้สำหรับการสร้างฐานข้อมูล (Database)
package config

import (
	"fmt"
	"time"

	"dormitory.com/dormitory/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}
func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa1.db?cache=shared"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}
func SetupDatabase() {
	db.AutoMigrate(
		&entity.Students{},
		&entity.Admins{},
		&entity.Genders{},
		&entity.FamilyStatuses{},
		&entity.Guardians{},
		&entity.License{},
		&entity.Address{},
		&entity.Family{},
		&entity.Other{},
		&entity.Personal{},
<<<<<<< HEAD
		&entity.RentFee{}, // เพิ่มตาราง RentFee
		&entity.Expense{}, // เพิ่มตาราง Expense
=======

		&entity.Repairing{},
		&entity.DelayedPaymentForm{},
		&entity.En_ExitingForm{},
		&entity.ResigningForm{},
>>>>>>> e0969658cdc456b61c5aad6fadead021d59532de
	)
	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	FamilyStatusTogether := entity.FamilyStatuses{FamilyStatus: "อยู่ด้วยกัน"}
	FamilyStatusSeparated := entity.FamilyStatuses{FamilyStatus: "แยกกันอยู่"}
	FamilyStatusOther := entity.FamilyStatuses{FamilyStatus: "อื่นๆ (พ่อหรือแม่เสียชีวิต)"}
	db.FirstOrCreate(&FamilyStatusTogether, &entity.FamilyStatuses{FamilyStatus: "อยู่ด้วยกัน"})
	db.FirstOrCreate(&FamilyStatusSeparated, &entity.FamilyStatuses{FamilyStatus: "แยกกันอยู่"})
	db.FirstOrCreate(&FamilyStatusOther, &entity.FamilyStatuses{FamilyStatus: "อื่นๆ (พ่อหรือแม่เสียชีวิต)"})

	GuardianMather := entity.Guardians{Guardian: "มารดา"}
	GuardianFather := entity.Guardians{Guardian: "บิดา"}
	GuardianOther := entity.Guardians{Guardian: "อื่นๆ (ระบุ)"}
	db.FirstOrCreate(&GuardianMather, &entity.Guardians{Guardian: "มารดา"})
	db.FirstOrCreate(&GuardianFather, &entity.Guardians{Guardian: "บิดา"})
	db.FirstOrCreate(&GuardianOther, &entity.Guardians{Guardian: "อื่นๆ (ระบุ)"})

	hasLicense := entity.License{License: "มี"}
	noLicense := entity.License{License: "ไม่มี"}
	db.FirstOrCreate(&hasLicense, &entity.License{License: "มี"})
	db.FirstOrCreate(&noLicense, &entity.License{License: "ไม่มี"})


	DormFemale1 := entity.Dorm{Type: "หอพักหญิง 1"}
	DormFemale2 := entity.Dorm{Type: "หอพักหญิง 2"}
	DorMale1 := entity.Dorm{Type: "หอพักชาย 1"}
	DorMale2 := entity.Dorm{Type: "หอพักชาย 2"}
	db.FirstOrCreate(&DormFemale1, &entity.Dorm{Type: "หอพักหญิง 1"})
	db.FirstOrCreate(&DormFemale2, &entity.Dorm{Type: "หอพักหญิง 2"})
	db.FirstOrCreate(&DorMale1, &entity.Dorm{Type: "หอพักชาย 1"})
	db.FirstOrCreate(&DorMale2, &entity.Dorm{Type: "หอพักชาย 2"})

	Room4101 := entity.Room{RoomNumber: 4101}
	Room4102 := entity.Room{RoomNumber: 4102}
	db.FirstOrCreate(&Room4101, &entity.Room{RoomNumber: 4101})
	db.FirstOrCreate(&Room4102, &entity.Room{RoomNumber: 4102})

	// Seed ข้อมูล student
	studentHashedPassword, _ := HashPassword("1234567890123")
	Birthday, _ := time.Parse("2006-01-02", "1988-11-12")
	User := &entity.Students{
		FirstName: "Nicha",
		LastName:  "Wandee",
		StudentID: "B6510001",
		Password:  studentHashedPassword,
		Birthday:  Birthday,
		Year:      3,
		Major:     "วิศวกรรมศาสตร์",
		GenderID:  2,
	}
	db.FirstOrCreate(User, &entity.Students{StudentID: "B6510001"})

	dorm := &entity.Dorm{
		Type:     "Female",
		GenderID: 1,
	}
	db.FirstOrCreate(dorm, &entity.Dorm{Type: "Female",})

	room := &entity.Room{
		RoomNumber:   4102,
		Available:    "yes",
		Confirmation: "yes",
		DormID:       4,
	}
	db.FirstOrCreate(room, &entity.Room{RoomNumber: 4102})

	reserveDate, _ := time.Parse("02-01-2006", "21-05-1997")
	reservation := &entity.Reservation{

		ReserveDate: 	reserveDate,
		StudentID: 		1,
		DormID:      	4,
		RoomID:      	4102,
	}
	db.FirstOrCreate(reservation, &entity.Reservation{StudentID: 1, DormID: 4, RoomID: 4102})


	// Seed ข้อมูล admin
	adminhashedPassword, _ := HashPassword("Ad01")
	AdminUser := &entity.Admins{
		Username:  "jetnipat",
		FirstName: "Jetnipat ",
		LastName:  "kunjai",
		Phone:     "061xxxxxxx",
		Password:  adminhashedPassword,
	}

	db.FirstOrCreate(AdminUser, &entity.Admins{
		Username: "jetnipat",
	})
	// Seed ข้อมูล RentFee
	rentFee1 := entity.RentFee{DormID: 1, Amount: 6500.00}
	rentFee2 := entity.RentFee{DormID: 2, Amount: 2900.00}
	rentFee3 := entity.RentFee{DormID: 3, Amount: 6500.00}
	rentFee4 := entity.RentFee{DormID: 4, Amount: 2900.00}

	db.FirstOrCreate(&rentFee1, &entity.RentFee{DormID: 1})
	db.FirstOrCreate(&rentFee2, &entity.RentFee{DormID: 2})
	db.FirstOrCreate(&rentFee3, &entity.RentFee{DormID: 3})
	db.FirstOrCreate(&rentFee4, &entity.RentFee{DormID: 4})

}
