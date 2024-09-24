package reservation

import (
	"fmt"
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /student-create
func CreateReservation(c *gin.Context) {
	var reservation entity.Reservation

	// Bind เข้าตัวแปร reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	db := config.DB()

	// ฟังก์ชันช่วยเพื่อตรวจสอบการมีอยู่ของ Dorm, Room, และ Student
	checkExists := func(table string, column string, value interface{}) error {
		var count int64
		if err := db.Table(table).Where(fmt.Sprintf("%s = ?", column), value).Count(&count).Error; err != nil {
			return err
		}
		if count == 0 {
			return fmt.Errorf("%s not found", table)
		}
		return nil
	}

	// ตรวจสอบ Dorm, Room และ Student
	if err := checkExists("dorms", "id", reservation.DormID); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	if err := checkExists("rooms", "id", reservation.RoomID); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบ Student โดยใช้ student_id ที่เป็น string
	if err := checkExists("students", "student_id", reservation.StudentID); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// สร้างการจอง
	if err := db.Create(&reservation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create reservation"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Reservation created successfully", "data": reservation})
}

// DELETE /delete-student/:id
func DeleteReservation(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// PATCH /update-student
func UpdateReservation(c *gin.Context) {
	var reservation entity.Reservation
	id := c.Param("id")

	db := config.DB()
	result := db.First(&reservation, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&reservation)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}

func GetReservationsByRoomID(c *gin.Context) {
	roomID := c.Param("roomID")
	db := config.DB()
	var reservations []entity.Reservation
	if err := db.Where("room_id = ?", roomID).Preload("Student").Preload("Dorm").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservations not found"})
		return
	}

	c.JSON(http.StatusOK, reservations)
}

func CheckUserRoom(c *gin.Context) {
	userID := c.Param("userID") // รับ userID จาก URL
	db := config.DB()

	var reservations []entity.Reservation
	if err := db.Where("student_id = ?", userID).Preload("Room").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservations not found"})
		return
	}

	// สร้างผลลัพธ์ที่ต้องการ
	var result []gin.H
	for _, reservation := range reservations {
		result = append(result, gin.H{
			"room_id":     reservation.RoomID,
			"room_number": reservation.Room.RoomNumber,
			"dorm_id":     reservation.DormID,
		})
	}

	c.JSON(http.StatusOK, result)
}
func GetReservation(c *gin.Context) {
	var reservations []entity.Reservation

	db := config.DB()
	if err := db.Preload("Student").Preload("Dorm").Preload("Room").Find(&reservations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, reservations)
}

// function Get โดยในตัวอย่างเป็นการตั้งใจใช้คำสั่ง SELECT … WHERE id =... เพื่อดึงข้อมูล student ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
// GET /get-student/:id
func GetStudent(c *gin.Context) {
	ID := c.Param("id")
	var student entity.Students

	db := config.DB()
	results := db.Preload("Gender").First(&student, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if student.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, student)
}

// GET /list-student
func ListStudent(c *gin.Context) {

	var students []entity.Students

	db := config.DB()
	results := db.Preload("Gender").Find(&students)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, students)
}

// DELETE /delete-student/:id
func DeleteStudent(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// PATCH /update-student
func UpdateStudent(c *gin.Context) {
	var student entity.Students
	StudentID := c.Param("id")
	db := config.DB()
	result := db.First(&student, StudentID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&student)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}
