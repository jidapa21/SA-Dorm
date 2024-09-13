package slip
import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// POST /users
func CreateSlip(c *gin.Context) {
	id := c.Param("id")
		if id == "" {
    		id = "1" // ตั้งค่าเริ่มต้นเป็น 1 หากไม่มีการระบุ id
}
	var slip entity.Slip
    var expense entity.Expense

	expenseID := c.MustGet("ex_id").(string)
    if expenseID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "ex_id cannot be empty"})
        return
    }
	if err := c.ShouldBindJSON(&slip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()

	    // ค้นหา expense ด้วย ExpenseID
    result := db.First(&expense, slip.ExpenseID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ex_id not found"})
        return
    }


	rp := entity.Slip{
		Path:           slip.Path,
		Date:         	slip.Date,
		ExpenseID:     	expense.ID,
		Expense:    	&expense, 
		
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

	db := config.DB()
	if err := db.Preload("Expense").First(&slip, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, slip)
}


// GET /Slip
func GetListSlips(c *gin.Context) {
	var slips []entity.Slip

	db := config.DB()
	if err := db.Preload("Expense").Find(&slips).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
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
	if err := c.ShouldBindJSON(&slip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	if err := db.Save(&slip).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}