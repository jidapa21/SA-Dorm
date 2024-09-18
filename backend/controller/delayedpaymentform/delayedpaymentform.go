package delayedpaymentform

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateDelayedPaymentForm(c *gin.Context) {
	var delayedpaymentform entity.DelayedPaymentForm
	var sid entity.Students
	var reservation entity.Reservation
	var dorm entity.Dorm
	var room entity.Room

	studentID := c.MustGet("student_id").(string)
	if studentID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
		return
	}

	db := config.DB()
	results := db.Where("student_id = ?", studentID).First(&sid)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	// ดึงข้อมูล reservation โดยใช้ StudentsID
	db.Where("students_id = ?", sid.ID).First(&reservation)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	if err := c.ShouldBindJSON(&delayedpaymentform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.First(&dorm, reservation.DormID)
	if dorm.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Dorm not found"})
		return
	}

	db.First(&room, reservation.RoomID)
	if room.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room not found"})
		return
	}

	// สร้าง DelayedPaymentForm
	d := entity.DelayedPaymentForm{
		Title:           "ฟอร์มขอผ่อนผันการชำระค่าหอพัก",
		Type:            "ฟอร์มเอกสาร",
		Date_Submission: delayedpaymentform.Date_Submission,
		Dorm_Payment:    delayedpaymentform.Dorm_Payment,
		Electricly_Bill: delayedpaymentform.Electricly_Bill,
		Water_Bill:      delayedpaymentform.Water_Bill,
		Because_Of:      delayedpaymentform.Because_Of,
		Due_Date:        delayedpaymentform.Due_Date,
		Status:          "รอดำเนินการ",
		ReservationID:   reservation.ID,
		Reservation:     reservation,
	}

	// บันทึก
	if err := db.Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": d})
}

// GET /Repairing/:id
func GetDelayedPaymentForm(c *gin.Context) {
	ID := c.Param("id")
	var delayedpaymentform entity.DelayedPaymentForm

	db := config.DB()
	if err := db.Preload("Reservation").First(&delayedpaymentform, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, delayedpaymentform)
}

// GET /Repairings
func ListDelayedPaymentForms(c *gin.Context) {
	var delayedpaymentform []entity.DelayedPaymentForm

	db := config.DB()
	if err := db.Preload("Reservation").Find(&delayedpaymentform).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, delayedpaymentform)
}

// PATCH /repairings
func UpdateDelayedPaymentForm(c *gin.Context) {
	id := c.Param("id")
	var payload struct {
		Status string `json:"status"` // รับเฉพาะ status จาก JSON payload
	}

	db := config.DB()
	adminID, exists := c.Get("admin_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin ID not found in context"})
		return
	}

	// Find the existing repair record
	var existingDelayedPaymentForm entity.DelayedPaymentForm
	result := db.First(&existingDelayedPaymentForm, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}

	// Bind the JSON payload to the `payload` object
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// Update only the 'Status' field
	if err := db.Model(&existingDelayedPaymentForm).Updates(map[string]interface{}{
		"Status":  payload.Status,
		"AdminID": adminID, // บันทึก adminID ที่อัปเดตสถานะ
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}