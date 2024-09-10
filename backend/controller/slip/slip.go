package controller

import (
	"net/http"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tanapon395/sa-67-example/config"
	"github.com/tanapon395/sa-67-example/entity"
)

// PATCH /slip/:id
func UpdateSlip(c *gin.Context) {
	var slip entity.Slip

	// รับ ID ของ slip จาก URL parameter
	SlipID := c.Param("id")

	// ค้นหา slip ในฐานข้อมูลโดยใช้ ID
	db := config.DB()
	result := db.First(&slip, SlipID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Slip ID not found"})
		return
	}

	// รับไฟล์ที่ถูกอัปโหลด
	file, err := c.FormFile("slip_file")
	if err != nil && err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to upload file"})
		return
	}

	// ถ้ามีการอัปโหลดไฟล์ใหม่ ให้บันทึกไฟล์ลงโฟลเดอร์
	if file != nil {
		filename := filepath.Base(file.Filename)
		if err := c.SaveUploadedFile(file, "uploads/"+filename); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save file"})
			return
		}
		// อัปเดต path ของไฟล์ในฐานข้อมูล
		slip.Path = "uploads/" + filename
	}

	// รับข้อมูลวันที่ (date) จาก form และแปลงเป็นเวลา
	date := c.PostForm("date")
	if date != "" {
		parsedDate, err := time.Parse("2006-01-02", date) // ตัวอย่าง format: "2023-09-08"
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
			return
		}
		slip.Date = parsedDate
	}

	// รับ AdminID จาก form-data และแปลงเป็นตัวเลข
	adminID := c.PostForm("admin_id")
	if adminID != "" {
		adminIDValue, _ := strconv.ParseUint(adminID, 10, 64)
		slip.AdminID = uint(adminIDValue)
	}

	// รับ ExpenseID จาก form-data และแปลงเป็นตัวเลข
	expenseID := c.PostForm("expense_id")
	if expenseID != "" {
		expenseIDValue, _ := strconv.ParseUint(expenseID, 10, 64)
		slip.ExpenseID = uint(expenseIDValue)
	}

	// บันทึกข้อมูล slip ที่ถูกแก้ไข
	result = db.Save(&slip)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update slip"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Slip updated successfully"})
}
