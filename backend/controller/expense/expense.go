package expense

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func UpDateExpense(c *gin.Context) {
	id := c.Param("id")
	var payload struct {
		Status string `json:"status"` // รับเฉพาะ status จาก JSON payload
	}

	db := config.DB()

	// Find the existing Expense record
	var existingExpense entity.Expense
	result := db.First(&existingExpense, id)
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
	if err := db.Model(&existingExpense).Updates(map[string]interface{}{
		"Status": payload.Status,
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}
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
func ListExpense(c *gin.Context) {
	// ตรวจสอบโทเค็นการเข้าถึง
	token := c.GetHeader("Authorization")
	if token == "" {
	  c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
	  return
	}
  
	// ประมวลผลโทเค็นการเข้าถึงและตรวจสอบ
	// (โค้ดสำหรับการตรวจสอบโทเค็น)
  
	// ดึงรายการค่าใช้จ่าย
	var expenses []entity.Expense
	db := config.DB()
	if err := db.Preload("Dorm").Preload("ElectricityFee").Preload("WaterFee").Find(&expenses).Error; err != nil {
	  c.JSON(http.StatusNotFound, gin.H{"error": "No expenses found"})
	  return
	}
  
	c.JSON(http.StatusOK, gin.H{"data": expenses})

  }
  


