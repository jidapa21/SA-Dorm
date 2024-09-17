package en_exitingform

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func CreateEn_ExitingForm(c *gin.Context) {
	var en_exitingform entity.En_ExitingForm
	var sid entity.Students
	var reservation entity.Reservation
	var dorm entity.Dorm
	var room entity.Room

	studentID := c.MustGet("student_id").(string)
	if studentID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
		return
	}

	db := config.DB()
	results := db.Where("student_id = ?", studentID).First(&sid)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	db.Where("student_id = ?", sid.ID).First(&reservation)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	if err := c.ShouldBindJSON(&en_exitingform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.First(&dorm, reservation.DormID)
	if dorm.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Dorm not found"})
		return
	}

	db.First(&room, reservation.RoomID)
	if room.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Room not found"})
		return
	}

	ee := entity.En_ExitingForm{
		Title:           "ฟอร์มขออนุญาติเข้า-ออกหอพัก",
		Type:            "ฟอร์มเอกสาร",
		Date_Submission: en_exitingform.Date_Submission,
		Request:         en_exitingform.Request,
		Because_Of:      en_exitingform.Because_Of,
		Date_Request:    en_exitingform.Date_Request,
		Status:          "รอดำเนินการ",
		ReservationID:   reservation.ID,
		Reservation:     reservation,
	}
	if err := db.Create(&ee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": ee})
}

// GET /Repairing/:id
func GetRepair(c *gin.Context) {
	ID := c.Param("id")
	var repairing entity.Repairing
	var reservation entity.Reservation

	db := config.DB()
	if err := db.Preload("Reservation").First(&repairing, ID).Error; err != nil {
		if err := db.Preload("Students").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error: Repairing.Reservation.StudentsID not found": err.Error()})
			return
		}
		if err := db.Preload("Dorm").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error: Repairing.Reservation.DormID not found": err.Error()})
			return
		}
		if err := db.Preload("Room").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error: Repairing.Reservation.RoomID not found": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, repairing)
}

// GET /Repairings
func GetListRepairs(c *gin.Context) {
	var repairings []entity.Repairing
	var reservation []entity.Reservation

	db := config.DB()
	if err := db.Preload("Reservation").Find(&repairings).Error; err != nil {
		if err := db.Preload("Students").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error: Repairing.Reservation.Students not found": err.Error()})
			return
		}
		if err := db.Preload("Dorm").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error: Repairing.Reservation.Dorm not found": err.Error()})
			return
		}
		if err := db.Preload("Room").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error: Repairing.Reservation.Room not found": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, repairings)
}

// PATCH /repairings/:id
func UpdateRepair(c *gin.Context) {
	var repairing entity.Repairing
	id := c.Param("id")

	db := config.DB()
	if err := db.First(&repairing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
		return
	}
	if err := c.ShouldBindJSON(&repairing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	if err := db.Save(&repairing).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error updating data"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}
