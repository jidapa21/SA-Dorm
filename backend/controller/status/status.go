/* package status

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
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-status
func GetListStatus(c *gin.Context) {
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

	// ตรวจสอบว่าตาราง Reservations มีข้อมูลของ sid.ID
	db.Where("student_id = ?", sid.ID).First(&reservation)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	// ตรวจสอบว่าตาราง Repairings มีข้อมูลของ reservation.ID
	db.Where("reservation_id = ?", reservation.ID).First(&repairing)
	if repairing.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Repairing not found"})
		return
	}

	// ตรวจสอบว่าตาราง DelayedPaymentForms มีข้อมูลของ reservation.ID
	db.Where("reservation_id = ?", reservation.ID).First(&delayedpaymentform)
	if delayedpaymentform.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "DelayedPaymentForm not found"})
		return
	}

	// ตรวจสอบว่าตาราง EnExitingForms มีข้อมูลของ reservation.ID
	db.Where("reservation_id = ?", reservation.ID).First(&en_exitingform)
	if en_exitingform.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "En_ExitingForm not found"})
		return
	}

	// ตรวจสอบว่าตาราง ResigningForms มีข้อมูลของ reservation.ID
	db.Where("reservation_id = ?", reservation.ID).First(&resigningform)
	if resigningform.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "ResigningForm not found"})
		return
	}

	response := gin.H{
		"repairing": gin.H{
			"title":  repairing.Title,
			"type":   "แจ้งซ่อม",
			"status": repairing.Status,
		},
		"delayed_payment": gin.H{
			"title":  "แบบฟอร์มขอผ่อนผันการชำระค่าหอพักนักศึกษา/ค่าไฟฟ้า/ค่าน้ำประปา",
			"type":   "ฟอร์มเอกสาร",
			"status": delayedpaymentform.Status,
		},
		"en_exiting": gin.H{
			"title":  en_exitingform.Request,
			"type":   "ฟอร์มเอกสาร",
			"status": en_exitingform.Status,
		},
		"resigning": gin.H{
			"title":  "แบบฟอร์มลาออกหอพัก",
			"type":   "ฟอร์มเอกสาร",
			"status": resigningform.Status,
		},
	}

	c.JSON(http.StatusOK, response)
}
