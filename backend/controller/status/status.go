/*
	package status

import (

	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"

)

// GET /list-status

	func GetListStatus(c *gin.Context) {
		var sid entity.Students
		var reservation entity.Reservation
		var repairing []entity.Repairing
		var delayedpaymentforms []entity.DelayedPaymentForm
		var en_exitingform []entity.En_ExitingForm
		var resigningform []entity.ResigningForm

		studentID := c.MustGet("student_id").(string)
		if studentID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
			return
		}

		db := config.DB()

		// ตรวจสอบว่าตาราง Students มีข้อมูลของ studentID ที่ต้องการ
		results := db.Where("student_id = ?", studentID).First(&sid)
		if results.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
			return
		}

		// ตรวจสอบว่าตาราง Reservations มีข้อมูลของ sid.ID
		results = db.Where("student_id = ?", sid.ID).First(&reservation)
		if results.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
			return
		}

		// ตรวจสอบว่าตาราง Repairings มีข้อมูลของ reservation.ID
		db.Where("reservation_id = ?", reservation.ID).Find(&repairing)

		// ตรวจสอบว่าตาราง DelayedPaymentForms มีข้อมูลของ reservation.ID
		db.Where("reservation_id = ?", reservation.ID).Find(&delayedpaymentforms)

		// ตรวจสอบว่าตาราง EnExitingForms มีข้อมูลของ reservation.ID
		db.Where("reservation_id = ?", reservation.ID).Find(&en_exitingform)

		// ตรวจสอบว่าตาราง ResigningForms มีข้อมูลของ reservation.ID
		db.Where("reservation_id = ?", reservation.ID).Find(&resigningform)

		// สร้าง response
		response := gin.H{
			"repairing": gin.H{
				"title":  getRepairingTitle(repairing),
				"type":   "แจ้งซ่อม",
				"status": getRepairingStatus(repairing),
			},
			"delayed_payment": gin.H{
				"title":  getDelayedPaymentFormTitle(delayedpaymentforms),
				"type":   "ฟอร์มเอกสาร",
				"status": getDelayedPaymentStatus(delayedpaymentforms),
			},
			"en_exiting": gin.H{
				"title":  getEn_ExitingFormTitle(en_exitingform),
				"type":   "ฟอร์มเอกสาร",
				"status": getEnExitingStatus(en_exitingform),
			},
			"resigning": gin.H{
				"title":  getResigningFormTitle(resigningform),
				"type":   "ฟอร์มเอกสาร",
				"status": getResigningStatus(resigningform),
			},
		}

		c.JSON(http.StatusOK, response)
	}

// ฟังก์ชันสำหรับจัดการการแสดงสถานะต่างๆ

	func getRepairingTitle(repairing []entity.Repairing) string {
		if len(repairing) > 0 {
			return repairing[0].Title
		}
		return "ไม่มีข้อมูล"
	}

	func getRepairingStatus(repairing []entity.Repairing) string {
		if len(repairing) > 0 {
			return repairing[0].Status
		}
		return "ไม่มีข้อมูล"
	}

	func getDelayedPaymentFormTitle(delayedpaymentforms []entity.DelayedPaymentForm) string {
		if len(delayedpaymentforms) > 0 {
			return delayedpaymentforms[0].Title
		}
		return "ไม่มีข้อมูล"
	}

	func getDelayedPaymentStatus(delayedpaymentforms []entity.DelayedPaymentForm) string {
		if len(delayedpaymentforms) > 0 {
			return delayedpaymentforms[0].Status
		}
		return "ไม่มีข้อมูล"
	}

	func getEn_ExitingFormTitle(en_exitingform []entity.En_ExitingForm) string {
		if len(en_exitingform) > 0 {
			return en_exitingform[0].Title
		}
		return "ไม่มีข้อมูล"
	}

	func getEnExitingStatus(en_exitingform []entity.En_ExitingForm) string {
		if len(en_exitingform) > 0 {
			return en_exitingform[0].Status
		}
		return "ไม่มีข้อมูล"
	}

	func getResigningFormTitle(resigningform []entity.ResigningForm) string {
		if len(resigningform) > 0 {
			return resigningform[0].Title
		}
		return "ไม่มีข้อมูล"
	}

	func getResigningStatus(resigningform []entity.ResigningForm) string {
		if len(resigningform) > 0 {
			return resigningform[0].Status
		}
		return "ไม่มีข้อมูล"
	}
*/
package status

import (
	"fmt"
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-status
func GetListStatus(c *gin.Context) {

	var sid entity.Students
	var reservation entity.Reservation
	studentID := c.MustGet("student_id").(string)
	if studentID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
		return
	}

	// เชื่อมต่อกับฐานข้อมูล
	db := config.DB()

	// ตรวจสอบค่า studentID
	fmt.Println("Student ID:", studentID)

	results := db.Where("student_id = ?", studentID).First(&sid)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	

	// ดึงข้อมูล reservation จากฐานข้อมูล โดยค้นหาจากฟิลด์ student_id ที่ตรงกับค่า sid.ID
	db.Where("id = ?", sid.ID).First(&reservation)
	// ตรวจสอบค่า reservationID
	fmt.Println("Reservation ID:", reservation.ID)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	// สร้างตัวแปรสำหรับเก็บผลลัพธ์ของแต่ละฟอร์ม
	var delayedPaymentForms []entity.DelayedPaymentForm
	var enExitingForms []entity.En_ExitingForm
	var repairingForms []entity.Repairing
	var resigningForms []entity.ResigningForm

	// ดึงข้อมูลจากตาราง DelayedPaymentForm โดยใช้ student_id
	if err := db.Preload("Reservation.Student").Preload("Reservation.Dorm").Preload("Reservation.Room").Where("reservation_id = ?", reservation.ID).Find(&delayedPaymentForms).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get DelayedPaymentForm data"})
		return
	}

	// ดึงข้อมูลจากตาราง En_ExitingForm โดยใช้ student_id
	if err := db.Preload("Reservation.Student").Preload("Reservation.Dorm").Preload("Reservation.Room").Where("reservation_id = ?", reservation.ID).Find(&enExitingForms).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get EnExitingForm data"})
		return
	}

	// ดึงข้อมูลจากตาราง Repairing โดยใช้ student_id
	if err := db.Preload("Reservation.Student").Preload("Reservation.Dorm").Preload("Reservation.Room").Where("reservation_id = ?", reservation.ID).Find(&repairingForms).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get Repairing data"})
		return
	}

	// ดึงข้อมูลจากตาราง ResigningForm โดยใช้ student_id
	if err := db.Preload("Reservation.Student").Preload("Reservation.Dorm").Preload("Reservation.Room").Where("reservation_id = ?", reservation.ID).Find(&resigningForms).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get ResigningForm data"})
		return
	}

	// รวมข้อมูลทั้งหมดใน response
	response := gin.H{
		"delayed_payment_forms": delayedPaymentForms,
		"en_exiting_forms":      enExitingForms,
		"repairing_forms":       repairingForms,
		"resigning_forms":       resigningForms,
	}

	// ส่งข้อมูล response กลับในรูปแบบ JSON
	c.JSON(http.StatusOK, response)
}

/*
func GetStatusById(c *gin.Context) {

	var sid entity.Students
	var reservation entity.Reservation
	var repairing entity.Repairing
	var delayedpaymentform entity.DelayedPaymentForm
	var en_exitingform entity.En_ExitingForm
	var resigningform entity.ResigningForm

	studentID := c.MustGet("student_id").(string)
	if studentID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
		return
	}

	db := config.DB()

	// ตรวจสอบว่าตาราง Students มีข้อมูลของ studentID ที่ต้องการ
	results := db.Where("student_id = ?", studentID).First(&sid)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}
}
*/
