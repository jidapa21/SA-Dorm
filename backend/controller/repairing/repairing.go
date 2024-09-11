package repairing

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateRepair(c *gin.Context) {
	var repairing entity.Repairing

	if err := c.ShouldBindJSON(&repairing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา reservation ด้วย id
	var reservation entity.Reservation
	db.First(&reservation, repairing.ReservationID)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation_ID not found"})
		return
	}

	// ค้นหา dorm ด้วย id
	var dorm entity.Dorm
	db.First(&dorm, repairing.Reservation.DormID)
	if dorm.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "dorm_ID not found"})
		return
	}

	// ค้นหา room ด้วย id
	var room entity.Room
	db.First(&room, repairing.Reservation.RoomID)
	if room.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "room_ID not found"})
		return
	}

	rp := entity.Repairing{
		Subject:           	repairing.Subject,
		Detail:            	repairing.Detail,
		Image:             	repairing.Image,
		Location_Details:  	repairing.Location_Details,
		Contact:           	repairing.Contact,
		Time_Slot:         	repairing.Time_Slot,
		Remarks:           	repairing.Remarks,
		Status:            	"รอดำเนินการ",
		ReservationID:     	repairing.ReservationID,
		Reservation:    	reservation, // โยงความสัมพันธ์กับ Entity Reservation
		
	}

	if err := db.Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})
}


// GET /Repairing/:id
func GetRepair(c *gin.Context) {
	ID := c.Param("id")
	var repairing entity.Repairing

	db := config.DB()
	if err := db.Preload("Reservation").First(&repairing, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Repairing not found or related data error"})
		return
	}

	c.JSON(http.StatusOK, repairing)
}

func GetListRepairs(c *gin.Context) {
	var repairings []entity.Repairing

	db := config.DB()
	if err := db.Preload("Reservation").Find(&repairings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No repairings found or related data error"})
		return
	}

	c.JSON(http.StatusOK, repairings)
}


func UpdateRepair(c *gin.Context) {
    id := c.Param("id")
    var payload struct {
        Status string `json:"status"`  // รับเฉพาะ status จาก JSON payload
    }

    db := config.DB()

    // Find the existing repair record
    var existingRepair entity.Repairing
    result := db.First(&existingRepair, id)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
        return
    }

    // Bind the JSON payload to the `payload` object
    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
        return
    }

    // Update only the 'Status' field
    if err := db.Model(&existingRepair).Update("Status", payload.Status).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to update status"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}

