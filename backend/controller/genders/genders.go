package genders

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func GetAll(c *gin.Context) {
	db := config.DB() // เชื่อมต่อฐานข้อมูล
	var genders []entity.Genders // สร้าง slice สำหรับเก็บข้อมูลเพศ
	if err := db.Find(&genders).Error; err != nil { // ตรวจสอบการดึงข้อมูล
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, genders) // ส่งข้อมูลเพศไปยัง client
}