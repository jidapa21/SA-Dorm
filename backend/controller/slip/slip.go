package slip
import (/*
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"*/
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateSlip(c *gin.Context) {/*
	var slip entity.Slip
	var sid entity.Students
    var reservation entity.Reservation
    var dorm entity.Dorm
    var room entity.Room
	var Expense entity.Expense

	studentID := c.MustGet("student_id").(string)
    if studentID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
        return
    }
	/*studentID := c.MustGet("student_id").(string)
	if err := c.ShouldBindJSON(&slip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา reservation ด้วย id
	var reservations entity.Reservation
	db.First(&reservations, slip.ReservationID)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation_ID not found"})
		return
	}


	rp := entity.Slip{
		Path:           slip.Path,
		Date:         	slip.date,
		ExpenseID:     	expense.ID,
		Expense:    	expense, 
		
	}

	if err := db.Create(&rp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})*/
}


// GET /Slip/:id
func GetSlip(c *gin.Context) {/*
	ID := c.Param("id")
	var slip entity.Slip
	var reservation entity.Reservation

	db := config.DB()
	if err := db.Preload("Reservation").First(&repairing, ID).Error; err != nil {
		if err := db.Preload("id").First(&reservation, ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
	}
	c.JSON(http.StatusOK, slip)
	}*/
}

// GET /Slip
func GetListSlips(c *gin.Context) {/*
	var slips []entity.Slip
	var reservation []entity.Reservation

	db := config.DB()
	if err := db.Preload("Reservation").Find(&slips).Error; err != nil {
		if err := db.Preload("id").Find(&reservation).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusOK, slips)*/
}


// PATCH /slip
func UpdateSlip(c *gin.Context) {/*
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
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})*/
}
