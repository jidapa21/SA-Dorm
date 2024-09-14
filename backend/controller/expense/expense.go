package expense

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /get-expense/:id
func GetExpense(c *gin.Context) {
	ID := c.Param("id")
	var rentFee entity.RentFee
	var waterFee entity.WaterFee
	var electricityFee entity.ElectricityFee

	db := config.DB()

	// ดึงข้อมูล RentFee
	if err := db.First(&rentFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "RentFee not found"})
		return
	}

	// ดึงข้อมูล WaterFee
	if err := db.First(&waterFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "WaterFee not found"})
		return
	}

	// ดึงข้อมูล ElectricityFee
	if err := db.First(&electricityFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ElectricityFee not found"})
		return
	}

	/*
		// สร้างโครงสร้าง Expense
		expense := entity.Expense{
			RentFee:        rentFee,
			WaterFee:       waterFee,
			ElectricityFee: electricityFee,
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Expense fetched successfully",
			"data":    expense,
		})
	*/
	
}
func UpDateExpense(c *gin.Context) {
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

	// Find the existing En_ExitingForm record
	var existingexistingExpense entity.Expense
	result := db.First(&existingexistingExpense, id)
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
	if err := db.Model(&existingexistingExpense).Updates(map[string]interface{}{
		"Status":  payload.Status,
		"AdminID": adminID, // บันทึก adminID ที่อัปเดตสถานะ
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}
