package reservation

import (
	"errors"
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /student-create
func CreateReservation(c *gin.Context) {
	var reservation entity.Reservation

	// bind เข้าตัวแปร reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var studentCheck entity.Students
	var dormCheck entity.Dorm
	var roomCheck entity.Room

	// Check if the dorm with the provided DormID exists
	if result := db.Where("id = ?", reservation.DormID).First(&dormCheck); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Dorm not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Check if the room with the provided RoomID exists
	if result := db.Where("id = ?", reservation.RoomID).First(&roomCheck); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Room not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Check if the student with the provided StudentID exists
	if result := db.Where("student_id = ?", reservation.StudentsID).First(&studentCheck); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	if studentCheck.ID != 0 {
		// If the student with the provided StudentID already exists
		c.JSON(http.StatusConflict, gin.H{"error": "StudentID already exists"})
		return
	}

	// สร้างการจอง
	rs := entity.Reservation{
		ReservationDate: 	reservation.ReservationDate,
		StudentsID:   		reservation.StudentsID,
		DormID:      		reservation.DormID,
		RoomID:      		reservation.RoomID,
	}

	// บันทึก
	if err := db.Create(&rs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created successfully", "data": rs})
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