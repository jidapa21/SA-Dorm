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
		&entity.Announcement{},
		&entity.Genders{},
		&entity.FamilyStatuses{},
		&entity.Guardians{},
		&entity.Licenses{},
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

		// Seed ข้อมูลประเภท
		seedStudents()
		seedFamilyStatuses()
		seedGuardians()
		seedLicenses()
		seedPersonals()
		seedAddresses()
		seedFamilies()
		seedOthers()

	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	DormMale1 := entity.Dorm{Type: "หอพักชาย 1", GenderID: GenderMale.ID}
	DormMale2 := entity.Dorm{Type: "หอพักชาย 2", GenderID: GenderMale.ID}
	DormFemale3 := entity.Dorm{Type: "หอพักหญิง 3", GenderID: GenderFemale.ID}
	DormFemale4 := entity.Dorm{Type: "หอพักหญิง 4", GenderID: GenderFemale.ID}
	db.FirstOrCreate(&DormMale1, &entity.Dorm{Type: "หอพักชาย 1"})
	db.FirstOrCreate(&DormMale2, &entity.Dorm{Type: "หอพักชาย 2"})
	db.FirstOrCreate(&DormFemale3, &entity.Dorm{Type: "หอพักหญิง 3"})
	db.FirstOrCreate(&DormFemale4, &entity.Dorm{Type: "หอพักหญิง 4"})

	for roomNumber := 1100; roomNumber <= 4309; roomNumber++ {
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
		DormID:          1,
		RoomID:          100,
	}
	db.FirstOrCreate(reservation, &entity.Reservation{StudentID: User.ID, DormID: 1, RoomID: 100})

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
// ข้อมูลสำหรับ repairing1
repairing1 := &entity.Repairing{
	ID:               1,
	Subject:          "อ่างล้างมือตันจ้า",
	Detail:           "ทำเศษอาหารตก",
	Image:            "yes",
	Location_Details: "ห้องน้ำชั้น 1 หอ 4",
	Contact:          "097-153-1219",
	Time_Slot:        "09:00-16:00 น.",
	Status:           "รอดำเนินการ",
	ReservationID:    reservation.ID,
}
db.FirstOrCreate(&repairing1, entity.Repairing{ID: 1})

	// ข้อมูลสำหรับ repairing2 (ที่แตกต่างจาก repairing1)
	repairing2 := &entity.Repairing{
		ID:               2,
		Subject:          "ปัญหาไฟฟ้าขัดข้อง",
		Detail:           "ไฟฟ้าดับในห้องน้ำ",
		Image:            "no",
		Location_Details: "ห้องน้ำชั้น 2 หอ 3",
		Contact:          "097-153-1220",
		Time_Slot:        "10:00-17:00 น.",
		Status:           "กำลังดำเนินการ",
		ReservationID:    reservation.ID,
	}
	db.FirstOrCreate(&repairing2, entity.Repairing{ID: 2})

// ข้อมูล ค่าน้ำ ค่าไฟ
	electricityFee := entity.ElectricityFee{
		ID:           	1,
		Amount:         150,
		ReservationID:        reservation.ID,   
	}
	db.FirstOrCreate(&electricityFee, entity.Expense{ID:1})


	waterFee := entity.WaterFee{
		ID:           	1,
		Amount:         100,
		ReservationID:        reservation.ID,   
	}
	db.FirstOrCreate(&waterFee, entity.WaterFee{ID:1})

	// สร้างข้อมูล RentFee ตามประเภทหอพัก
rentFees := []struct {
	DormType    string
	Amount      float64
}{
	{"หอพักชาย 1", 6500.00},
	{"หอพักชาย 2", 2900.00},
	{"หอพักหญิง 3", 6500.00},
	{"หอพักหญิง 4", 2900.00},
}

// สร้าง RentFee สำหรับแต่ละประเภทหอพัก
for _, rf := range rentFees {
	// ตรวจสอบว่ามี RentFee สำหรับ DormType นี้อยู่แล้วหรือไม่
	var existingRentFee entity.RentFee
	result := db.Where("amount = ? AND reservation_id IN (?)", rf.Amount, db.Model(&entity.Dorm{}).Where("type = ?", rf.DormType).Select("id")).First(&existingRentFee)

	if result.Error != nil {
		// ถ้าไม่พบ RentFee ที่มีอยู่แล้ว ให้สร้างใหม่
		var dorm entity.Dorm
		db.Where("type = ?", rf.DormType).First(&dorm)
		if dorm.ID != 0 {
			rentFee := entity.RentFee{
				Amount:        rf.Amount,
				ReservationID: dorm.ID, // เชื่อมโยงกับ Dorm
			}
			db.Create(&rentFee)
		}
	} else {
		// ถ้าพบ RentFee ที่มีอยู่แล้ว สามารถอัปเดตข้อมูลได้ที่นี่
		db.Model(&existingRentFee).Updates(entity.RentFee{Amount: rf.Amount})
	}
}
	// ดึงข้อมูล Reservation พร้อมกับ Dorm ที่เกี่ยวข้อง
	var reservations1 []entity.Reservation
	db.Preload("Dorm").Find(&reservations1) // ใช้ Preload เพื่อดึงข้อมูล Dorm ด้วย

	var rentFee entity.RentFee
	for _, reservation := range reservations1 {
		var amount float64

		// ตรวจสอบประเภทของ Dorm ผ่าน Reservation
		switch reservation.Dorm.Type {
		case "หอพักชาย 1", "หอพักหญิง 3":
			amount = 6500.00
		case "หอพักชาย 2", "หอพักหญิง 4":
			amount = 2900.00
		}

		// สร้างข้อมูล RentFee
		rentFee = entity.RentFee{
			Amount:        	amount,
			ReservationID: 	reservation.ID, // เชื่อมโยงกับ Reservation
		}
		// ตรวจสอบว่ามี RentFee ที่มี ReservationID นี้อยู่แล้วหรือไม่
		db.Where("reservation_id = ?", reservation.ID).FirstOrCreate(&rentFee)
	}

	// ตรวจสอบว่ามี record นี้อยู่แล้วหรือไม่ ถ้าไม่มีให้สร้างใหม่
	result := db.Where("amount = ?", electricityFee.Amount).FirstOrCreate(&electricityFee)

	// หากพบ record อยู่แล้ว สามารถอัพเดตข้อมูลเพิ่มเติมได้ที่นี่
	if result.RowsAffected > 0 {
		// อัพเดตข้อมูลที่มีอยู่
		db.Model(&electricityFee).Updates(entity.ElectricityFee{Amount: 150.00})
	}

	// Seed ข้อมูล Expense (รวม RentFee, WaterFee, ElectricityFee)
	totalAmount := float64(rentFee.Amount) + float64(waterFee.Amount) + float64(electricityFee.Amount)
	
	expense := entity.Expense{
		Date:           time.Now(),
		Status:           "กำลังดำเนินการ",
		RentFeeID:        reservation.DormID,        // เชื่อมโยง RentFee
		WaterFeeID:       waterFee.ID,       // เชื่อมโยง WaterFee
		ElectricityFeeID: electricityFee.ID, // เชื่อมโยง ElectricityFee
		TotalAmount: 		totalAmount,
		StudentID:			reservation.StudentID,
		AdminID:        1,
	
	}
	db.FirstOrCreate(&expense, entity.Expense{Status:"กำลังดำเนินการ"})
	

	var expense1 entity.Expense
	db.Preload("RentFee").Preload("WaterFee").Preload("ElectricityFee").First(&expense1, expense.ID)

	// Seed ข้อมูล Slip 
	slip := entity.Slip{
		Path:           "1667801636944.jpg",
		AdminID:        1,       
		//ExpenseID:      expense.ID,      
	}
	db.FirstOrCreate(&slip, entity.Slip{Path:"รูปสลิป"})
}
	
func seedFamilyStatuses() {
	familyStatusTogether := entity.FamilyStatuses{FamilyStatus: "อยู่ด้วยกัน"}
	familyStatusSeparated := entity.FamilyStatuses{FamilyStatus: "แยกกันอยู่"}
	familyStatusOther := entity.FamilyStatuses{FamilyStatus: "อื่นๆ (พ่อหรือแม่เสียชีวิต)"}
	db.FirstOrCreate(&familyStatusTogether, entity.FamilyStatuses{FamilyStatus: "อยู่ด้วยกัน"})
	db.FirstOrCreate(&familyStatusSeparated, entity.FamilyStatuses{FamilyStatus: "แยกกันอยู่"})
	db.FirstOrCreate(&familyStatusOther, entity.FamilyStatuses{FamilyStatus: "อื่นๆ (พ่อหรือแม่เสียชีวิต)"})
}

func seedGuardians() {
	guardianMother := entity.Guardians{Guardian: "มารดา"}
	guardianFather := entity.Guardians{Guardian: "บิดา"}
	guardianOther := entity.Guardians{Guardian: "อื่นๆ (ระบุ)"}
	db.FirstOrCreate(&guardianMother, entity.Guardians{Guardian: "มารดา"})
	db.FirstOrCreate(&guardianFather, entity.Guardians{Guardian: "บิดา"})
	db.FirstOrCreate(&guardianOther, entity.Guardians{Guardian: "อื่นๆ (ระบุ)"})
}

func seedLicenses() {
	hasLicense := entity.Licenses{License: "มี"}
	noLicense := entity.Licenses{License: "ไม่มี"}
	db.FirstOrCreate(&hasLicense, entity.Licenses{License: "มี"})
	db.FirstOrCreate(&noLicense, entity.Licenses{License: "ไม่มี"})
}

// ฟังก์ชันสำหรับการแปลงวันที่จากสตริง
func parseDate(dateStr string) time.Time {
	date, _ := time.Parse("2006-01-02", dateStr)
	return date
}

func seedStudents() {
	//studentHashedPassword, _ := HashPassword("1234567890123")
	//birthday, _ := time.Parse("2006-01-02", "2003-11-12")
	// สร้างข้อมูลนักศึกษา
	students := []entity.Students{
		{FirstName: "Nicha", LastName: "Wandee", StudentID: "B6510001", Password: HashPasswordOrPanic("B6510001"), Birthday: parseDate("2003-11-12"), Year: 3, Major: "วิศวกรรมศาสตร์", GenderID: 2},
		{FirstName: "Somchai", LastName: "Sukprasert", StudentID: "B6510002", Password: HashPasswordOrPanic("B6510002"), Birthday: parseDate("2004-06-25"), Year: 2, Major: "วิทยาศาสตร์", GenderID: 1},
		{FirstName: "Anan", LastName: "Yutthapong", StudentID: "B6510003", Password: HashPasswordOrPanic("B6510003"), Birthday: parseDate("2005-01-15"), Year: 1, Major: "แพทยศาสตร์", GenderID: 1},
		{FirstName: "Siriwan", LastName: "Petchsri", StudentID: "B6510004", Password: HashPasswordOrPanic("B6510004"), Birthday: parseDate("2001-07-18"), Year: 4, Major: "สาธารณสุขศาสตร์", GenderID: 2},
		{FirstName: "Patchara", LastName: "Tantawan", StudentID: "B6510005", Password: HashPasswordOrPanic("B6510005"), Birthday: parseDate("2005-09-20"), Year: 1, Major: "ทันตแพทยศาสตร์", GenderID: 1},
	}
	// บันทึก Students ก่อน
	for _, student := range students {
		db.FirstOrCreate(&student, entity.Students{StudentID: student.StudentID})
	}
}

func seedPersonals() {
	for i := 1; i <= 5; i++ {
		personal := entity.Personal{
			StudentID:   uint(i),
			Nickname:    "",
			CitizenID:   "",
			Phone:       "",
			Nationality: "",
			Race:        "",
			Religion:    "",
			BloodGroup:  "",
		}
		db.FirstOrCreate(&personal, entity.Personal{StudentID: personal.StudentID})
	}
}

func seedAddresses() {
	for i := 1; i <= 5; i++ {
		address := entity.Address{
			StudentID:   uint(i),
			HouseNo:     "",
			VillageNo:   "",
			Village:     "",
			Alley:       "",
			Road:        "",
			SubDistrict: "",
			District:    "",
			Province:    "",
			ZipCode:     "",
		}
		db.FirstOrCreate(&address, entity.Address{StudentID: address.StudentID})
	}
}

func seedFamilies() {
	for i := 1; i <= 5; i++ {
		family := entity.Family{
			StudentID:        uint(i),
			FathersName:      "",
			MathersName:      "",
			OccupationFather: "",
			OccupationMather: "",
			PhoneFather:      "",
			PhoneMather:      "",
		}
		db.FirstOrCreate(&family, entity.Family{StudentID: family.StudentID})
	}
}

func seedOthers() {
	for i := 1; i <= 5; i++ {
		other := entity.Other{
			StudentID:            uint(i),
			LatestGraduationFrom: "",
		}
		db.FirstOrCreate(&other, entity.Other{StudentID: other.StudentID})
	}
}

func HashPasswordOrPanic(password string) string {
	hashedPassword, err := HashPassword(password)
	if err != nil {
		panic("Failed to hash password")
	}
	return hashedPassword
}
