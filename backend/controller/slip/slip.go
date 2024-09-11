package slip
import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateSlip(c *gin.Context) {
	var slip entity.Slip

	if err := c.ShouldBindJSON(&slip); err != nil {
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

	rp := entity.Slip{
		Path:           slip.Path,
		Date:         	slip.date,
		ExpenseID:     	slip.ReservationID,
		Expense:    	slip, 
		
	}

	if err := db.Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})
}


// GET /Slip/:id
func GetSlip(c *gin.Context) {
	ID := c.Param("id")
	var slip entity.Slip
	var reservation entity.Reservation

	db := config.DB()
	if err := db.Preload("Reservation").First(&repairing, ID).Error; err != nil {
		if err := db.Preload("Students").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		if err := db.Preload("Dorm").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		if err := db.Preload("Room").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, slip)
}

// GET /Slip
func GetListSlips(c *gin.Context) {
	var slips []entity.Slip
	var reservation []entity.Reservation

	db := config.DB()
	if err := db.Preload("Reservation").Find(&repairings).Error; err != nil {
		if err := db.Preload("Students").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		if err := db.Preload("Dorm").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		if err := db.Preload("Room").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, slips)
}


// PATCH /slip
func UpdateSlip(c *gin.Context) {
	var slip entity.Slip
	id := c.Param("id")

	db := config.DB()
	result := db.First(&slip, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(slip.Status); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	if err := db.Save(slip.Status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}