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

		&entity.Dorm{},
		&entity.Room{},
		&entity.Reservation{},
	
		&entity.Repairing{},
		&entity.DelayedPaymentForm{},
		&entity.En_ExitingForm{},
		&entity.ResigningForm{},

		&entity.RentFee{},
		&entity.WaterFee{},
		&entity.ElectricityFee{},
		&entity.Expense{},
		&entity.Slip{},
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

	DormMale1 := entity.Dorm{Type: "หอพักชาย 1", GenderID: GenderMale.ID}
	DormMale2 := entity.Dorm{Type: "หอพักชาย 2", GenderID: GenderMale.ID}
	DormFemale3 := entity.Dorm{Type: "หอพักหญิง 3", GenderID: GenderFemale.ID}
	DormFemale4 := entity.Dorm{Type: "หอพักหญิง 4", GenderID: GenderFemale.ID}
	db.FirstOrCreate(&DormMale1, &entity.Dorm{Type: "หอพักชาย 1"})
	db.FirstOrCreate(&DormMale2, &entity.Dorm{Type: "หอพักชาย 2"})
	db.FirstOrCreate(&DormFemale3, &entity.Dorm{Type: "หอพักหญิง 3"})
	db.FirstOrCreate(&DormFemale4, &entity.Dorm{Type: "หอพักหญิง 4"})

	for roomNumber := 1100; roomNumber <= 4109; roomNumber++ {
		// คำนวณ DormID จากหลักพันของ RoomNumber
		if (roomNumber >= 1100 && roomNumber <= 1109) ||
			(roomNumber >= 1200 && roomNumber <= 1209) ||
			(roomNumber >= 1300 && roomNumber <= 1309) ||
			(roomNumber >= 2100 && roomNumber <= 2109) ||
			(roomNumber >= 2200 && roomNumber <= 2209) ||
			(roomNumber >= 2300 && roomNumber <= 2309) ||
			(roomNumber >= 3100 && roomNumber <= 3109) ||
			(roomNumber >= 3200 && roomNumber <= 3209) ||
			(roomNumber >= 3300 && roomNumber <= 3309) ||
			(roomNumber >= 4100 && roomNumber <= 4109) ||
			(roomNumber >= 4200 && roomNumber <= 4209) ||
			(roomNumber >= 4300 && roomNumber <= 4309) {

			dormID := uint(roomNumber / 1000)

			// สร้าง Room และกำหนดค่า DormID
			room := entity.Room{
				RoomNumber: uint(roomNumber),
				DormID:     dormID, // DormID จะเป็น 1, 2, 3 หรือ 4 ตาม RoomNumber
			}
			// บันทึก Room ลงในฐานข้อมูล
			db.FirstOrCreate(&room, &entity.Room{RoomNumber: uint(roomNumber)})
		}
	}

	/*
		Status1 := entity.Repairing{Status: "รอดำเนินการ"}
		Status2 := entity.Repairing{Status: "กำลังดำเนินการ"}
		Status3 := entity.Repairing{Status: "เสร็จสิ้น"}
		db.FirstOrCreate(&Status1, &entity.Repairing{Status: "รอดำเนินการ"})
		db.FirstOrCreate(&Status2, &entity.Repairing{Status: "กำลังดำเนินการ"})
		db.FirstOrCreate(&Status3, &entity.Repairing{Status: "เสร็จสิ้น"})
	*/

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

	ReservationDate, _ := time.Parse("02-01-2006", "21-05-1997")
    reservation := &entity.Reservation{
        ReservationDate: ReservationDate,
        StudentID:       User.ID,
        DormID:          4,
        RoomID:          100,
    }
    db.FirstOrCreate(reservation, &entity.Reservation{StudentID: User.ID, DormID: 4, RoomID: 100})

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

	repairing := &entity.Repairing{
		ID: 				1,
        Subject:          	"อ่างล้างมือตัน",
        Detail:           	"ทำเศษอาหารตก",
        Image:            	"yes",
        Location_Details: 	"ห้องน้ำชั้น 1 หอ 4",
        Contact:          	"097-153-1219",
        Time_Slot:        	"09:00-16:00 น.",
        Status:           	"รอดำเนินการ",
		ReservationID:    	reservation.ID,
        AdminID:          	1,
    }
    db.FirstOrCreate(repairing, &entity.Repairing{ID: 1})
/*
	// Seed ข้อมูล RentFee
	rentFee1 := entity.RentFee{DormID: 1, Amount: 6500.00}
	rentFee2 := entity.RentFee{DormID: 2, Amount: 2900.00}
	rentFee3 := entity.RentFee{DormID: 3, Amount: 6500.00}
	rentFee4 := entity.RentFee{DormID: 4, Amount: 2900.00}
	db.FirstOrCreate(&rentFee1, entity.RentFee{DormID: 1})
	db.FirstOrCreate(&rentFee2, entity.RentFee{DormID: 2})
	db.FirstOrCreate(&rentFee3, entity.RentFee{DormID: 3})
	db.FirstOrCreate(&rentFee4, entity.RentFee{DormID: 4})

	// Seed ข้อมูล WaterFee
	waterFee := entity.WaterFee{Amount: 100.00}
	db.FirstOrCreate(&waterFee, entity.WaterFee)

	// Seed ข้อมูล ElectricityFee
	electricityFee := entity.ElectricityFee{Amount: 100.00}
	db.FirstOrCreate(&electricityFee2, entity.ElectricityFee)

	// Seed ข้อมูล Expense (รวม RentFee, WaterFee, ElectricityFee)
	expense1 := entity.Expense{
		Remark:           "ค่าใช้จ่ายสำหรับเดือนนี้",
		Status:           "Pending",
		RentFeeID:        rentFee1.ID,
		WaterFeeID:       waterFee1.ID,
		ElectricityFeeID: electricityFee1.ID,
	}
	db.FirstOrCreate(&expense1, entity.Expense{ID: 1})
	*/
	/*
		rentFee1 := entity.RentFee{DormID: 1, Amount: 6500.00}
		rentFee2 := entity.RentFee{DormID: 2, Amount: 2900.00}
		rentFee3 := entity.RentFee{DormID: 3, Amount: 6500.00}
		rentFee4 := entity.RentFee{DormID: 4, Amount: 2900.00}

		db.FirstOrCreate(&rentFee1, &entity.RentFee{DormID: 1})
		db.FirstOrCreate(&rentFee2, &entity.RentFee{DormID: 2})
		db.FirstOrCreate(&rentFee3, &entity.RentFee{DormID: 3})
		db.FirstOrCreate(&rentFee4, &entity.RentFee{DormID: 4})
	*/
}
