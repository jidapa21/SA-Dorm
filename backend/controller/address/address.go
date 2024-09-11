package address

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-personal
func ListAddress(c *gin.Context) {

	var address []entity.Address

	db := config.DB()
	results := db.Find(&address)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, address)
}

// GET /get-address/:id
func GetAddress(c *gin.Context) {
	ID := c.Param("id")
	var address entity.Address

	db := config.DB()

	results := db.First(&address, ID)

	// ถ้าผลการค้นหามีข้อผิดพลาด หรือไม่พบข้อมูล
	if results.Error != nil {
		// คืนค่าฟิลด์ว่างโดยไม่แสดงข้อผิดพลาดหรือสถานะ 404
		address = entity.Address{
			// กำหนดค่าฟิลด์ว่างตามที่ต้องการ เช่น สตริงว่าง หรือค่าเริ่มต้นของชนิดข้อมูล
			HouseNo:     "", // ตัวอย่างการกำหนดค่าเป็นว่าง
			VillageNo:   "",
			Village:     "",
			Alley:       "",
			Road:        "",
			SubDistrict: "",
			District:    "",
			Province:    "",
			PostCode:    "",

			// กำหนดฟิลด์อื่น ๆ ตามโครงสร้างของ entity.Other
		}
		// คืนฟิลด์ว่างกลับไปพร้อมสถานะ 200
		c.JSON(http.StatusOK, address)
		return
	}
	c.JSON(http.StatusOK, address)
}