package status
import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)


// GET /Slip/:id
func GetStatusById(c *gin.Context) {

	var sid entity.Students
	var reservation entity.Reservation
	var repairing entity.Repairing
	var delayedpaymentform entity.DelayedPaymentForm
	var en_exitingform entity.En_ExitingForm
	var resigningform entity.ResigningForm

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

	db.Where("reservation_id = ?", reservation.ID).First(&repairing)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Repairing not found"})
		return
	}
	
	db.Where("delayedpaymentform_id = ?", reservation.ID).First(&delayedpaymentform)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "DelayedPaymentForm not found"})
		return
	}
	
	db.Where("en_exitingform_id = ?", reservation.ID).First(&en_exitingform)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "En_ExitingForm not found"})
		return
	}
	
	db.Where("resigningform_id = ?", reservation.ID).First(&resigningform)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "ResigningForm not found"})
		return
	}

	if err := db.Preload("repairing").First(&reservation, sid).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	response := gin.H{
		"repairing": gin.H{
			"title": repairing.Title,
			"type": repairing.Type,
			"status": repairing.Status,
		},
		"delayed_payment": gin.H{
			"title": delayedpaymentform.Title,
			"type": delayedpaymentform.Type,
			"status": delayedpaymentform.Status,
		},
		"en_exiting": gin.H{
			"title": en_exitingform.Title,
			"type": en_exitingform.Type,
			"status": en_exitingform.Status,
		},
		"resigning": gin.H{
			"title": resigningform.Title,
			"type": resigningform.Type,
			"status": resigningform.Status,
		},
	}

	c.JSON(http.StatusOK, response)
}
