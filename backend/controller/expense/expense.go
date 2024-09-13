package expense

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /get-expense/:id
func CreateExpense(c *gin.Context) {
	var expense entity.Expense
    var sid entity.Students
	var reservation entity.Reservation
	var rentfee entity.RentFee
	var waterfee entity.WaterFee
	var electricityfee entity.ElectricityFee

	db := config.DB()
	studentID := c.MustGet("student_id").(string)
	if studentID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student_id cannot be empty"})
		return
	}

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

    db.Where("reservation_id = ?", reservation.ID).First(&waterfee)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

    db.Where("reservation_id = ?", reservation.ID).First(&rentfee)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

    db.Where("reservation_id = ?", reservation.ID).First(&electricityfee)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
/*
	db.First(&rentfee, reservation.RoomID)
	if rentfee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Dorm not found"})
		return
	}

	db.First(&waterfee, reservation.RoomID)
	if rentfee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Dorm not found"})
		return
	}

    db.First(&electricityfee, reservation.ElectricityFeeID)
	if rentfee.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Dorm not found"})
		return
	}
*/
	

	rp := entity.Expense{
        Remark:            expense.Remark,
        Status:            expense.Status,
        RentFeeID:         rentfee.ID,
        RentFee:          &rentfee,
        WaterFeeID:        waterfee.ID,
        WaterFee:         &waterfee,
        ElectricityFeeID: electricityfee.ID,
        ElectricityFee:  &electricityfee,
    }
    c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})
    c.JSON(http.StatusOK, rp)
}
/*
	// ดึงข้อมูล RentFee
	if err := db.First(&rentFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "RentFee not found"})
		return
	}

	// ดึงข้อมูล WaterFee
	if err := db.First(&waterFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "WaterFee not found"})
		return
	}

	// ดึงข้อมูล ElectricityFee
	if err := db.First(&electricityFee, "id = ?", ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ElectricityFee not found"})
		return
	}

	rp := entity.Expense{
        Remark:			expense.Remark,
        Status:			expense.Status,
        RentID:	  		rentfee.ID,
        RentFee:		rentfee,
		WaterID:		waterfee.ID,
        WaterFee:		waterfee,
		ElecID:			electricityfee.ID,
        ElectricityFee:	electricityfee,
    }
	if err := db.Create(&rp).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": rp})
}
	*/