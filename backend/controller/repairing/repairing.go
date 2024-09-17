package repairing

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

func CreateRepair(c *gin.Context) {
	var repairing entity.Repairing
	var sid entity.Students
	var reservation entity.Reservation
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

	// ดึงข้อมูล reservation โดยใช้ StudentsID
	db.Where("students_id = ?", sid.ID).First(&reservation)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	if err := c.ShouldBindJSON(&repairing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	rp := entity.Repairing{
		Title:            repairing.Title,
		Type:             "แจ้งซ่อม",
		Date_Submission:  repairing.Date_Submission,
		Detail:           repairing.Detail,
		Image:            repairing.Image,
		Location_Details: repairing.Location_Details,
		Contact:          repairing.Contact,
		Time_Slot:        repairing.Time_Slot,
		Remarks:          repairing.Remarks,
		Status:           "รอดำเนินการ",
		ReservationID:    reservation.ID,
		Reservation:      reservation,
	}

	if err := db.Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})
}

// GET /Repairings
func GetListRepairs(c *gin.Context) {
	var repairings []entity.Repairing
	var reservation entity.Reservation
	var sid entity.Students

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

	db.Where("id = ?", sid.ID).First(&reservation)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	if err := db.Preload("Reservation.Student").Preload("Reservation.Dorm").Preload("Reservation.Room").Where("id = ?", sid.ID).Find(&repairings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
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
