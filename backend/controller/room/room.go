package room

import (
	"log"
	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

// PATCH /rooms/:id
func UpdateRoom(c *gin.Context) {
	var room entity.Room

	RoomID := c.Param("id")

	db := config.DB()
	result := db.First(&room, RoomID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room id not found"})
		return
	}

	if err := c.ShouldBindJSON(&room); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// ตรวจสอบว่าข้อมูลถูกส่งมาจากฝั่ง client หรือไม่
	log.Println("Received room data:", room)


	// บันทึกการเปลี่ยนแปลงของ room
	result = db.Save(&room)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update room"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}

func GetRoomsByFloorAndDorm(c *gin.Context) {
	floorID := c.Param("floor_id") // รับ floor ID จาก URL parameter
	dormID := c.Param("dorm_id")    // รับ dorm ID จาก URL parameter
	var rooms []entity.Room

	db := config.DB()
	results := db.Preload("Dorm").Preload("Dorm.Gender").Preload("Dorm.Gender.Student").Preload("Dorm.Gender.Dorms").
		Where("floor = ? AND dorm_id = ?", floorID, dormID).Find(&rooms) // กรองห้องที่มี floor และ dorm ID ตรงกัน

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}
	if len(rooms) == 0 {
		c.JSON(http.StatusNoContent, gin.H{}) // ไม่มีห้องที่พบ
		return
	}

	c.JSON(http.StatusOK, rooms) // คืนค่าห้องที่พบ
}