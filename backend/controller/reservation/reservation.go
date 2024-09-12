package reservation

import (
	"errors"
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /CreateReservation
func CreateReservation(c *gin.Context) {
	var reservation entity.Reservation
	var studentCheck entity.Students
	var dormCheck entity.Dorm
	var roomCheck entity.Room

	// bind เข้าตัวแปร reservation
	if err := c.ShouldBindJSON(&reservation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

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

	/**********************************************************/
	studentID := c.MustGet("student_id").(string)
    if studentID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
        return
    }
	/**********************************************************/

	// Check if the student with the provided StudentID exists
	if result := db.Where("student_id = ?", reservation.StudentID).First(&studentCheck); result.Error != nil {
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
		StudentID:   		reservation.StudentID,
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
