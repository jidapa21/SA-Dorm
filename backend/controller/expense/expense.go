package expense

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /get-expense/:id
func GetExpense(c *gin.Context) {
	ID := c.Param("id")
	var remark entity.Remark,
    var status entity.Status,
	var rentFee entity.RentFee
	var waterFee entity.WaterFee
	var electricityFee entity.ElectricityFee

	db := config.DB()

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
        RentID:			rentfee.ID,
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