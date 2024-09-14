package delayedpaymentform

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func DelayedPaymentFormUI(c *gin.Context) {
	var delayedpaymentform entity.DelayedPaymentForm

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&delayedpaymentform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()
	}
	
	var reservation entity.Reservation
	if err := db.First(&reservation, delayedpaymentform.ReservationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	// สร้าง repairing
	d := entity.DelayedPaymentForm{
		Electricly_Bill: delayedpaymentform.Electricly_Bill,
		Water_Bill:      delayedpaymentform.Water_Bill,
		Because_Of:      delayedpaymentform.Because_Of,
		Due_Date:        delayedpaymentform.Due_Date,
		Status:          "รอดำเนินการ",
		ReservationID:   delayedpaymentform.ReservationID,
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
