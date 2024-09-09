package repairing

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func RepairingUI(c *gin.Context) {
	var repairing entity.Repairing

	if err := c.ShouldBindJSON(&repairing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var reservation entity.Reservation
	if err := db.First(&reservation, repairing.ReservationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	rp := entity.Repairing{
		Subject:           repairing.Subject,
		Detail:            repairing.Detail,
		Image:             repairing.Image,
		Location_Details:  repairing.Location_Details,
		Contact:           repairing.Contact,
		Time_Slot:         repairing.Time_Slot,
		Remarks:           repairing.Remarks,
		Status:            "รอดำเนินการ",
		ReservationID:     repairing.ReservationID,
	}

	if err := db.Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})
}


// GET /Repairing/:id
func GetRepairing(c *gin.Context) {
	ID := c.Param("id")
	var repairing entity.Repairing

	db := config.DB()
	if err := db.Preload("Reservation").First(&repairing, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, repairing)
}

// GET /Repairings
func ListRepairings(c *gin.Context) {
	var repairings []entity.Repairing

	db := config.DB()
	if err := db.Preload("Reservation").Find(&repairings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, repairings)
}


// PATCH /repairings
func UpdateRepairing(c *gin.Context) {
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}