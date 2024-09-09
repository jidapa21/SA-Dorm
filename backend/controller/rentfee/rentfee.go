package rentfee

import (
	"net/http"

	"dormitory.com/dormitory/entity"
	"dormitory.com/dormitory/config"
	"github.com/gin-gonic/gin"
)

// POST /create-rent-fee
func CreateRentFee(c *gin.Context) {
	var rentFee entity.RentFee

	if err := c.ShouldBindJSON(&rentFee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if err := db.Create(&rentFee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "RentFee created", "data": rentFee})
}

// GET /get-rent-fee/:id
func GetRentFee(c *gin.Context) {
	ID := c.Param("id")
	var rentFee entity.RentFee

	db := config.DB()
	if err := db.First(&rentFee, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "RentFee not found"})
		return
	}

	c.JSON(http.StatusOK, rentFee)
}

// GET /list-rent-fees
func ListRentFees(c *gin.Context) {
	var rentFees []entity.RentFee

	db := config.DB()
	if err := db.Find(&rentFees).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, rentFees)
}

// PUT /update-rent-fee/:id
func UpdateRentFee(c *gin.Context) {
	ID := c.Param("id")
	var rentFee entity.RentFee

	db := config.DB()
	if err := db.First(&rentFee, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "RentFee not found"})
		return
	}

	if err := c.ShouldBindJSON(&rentFee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Save(&rentFee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "RentFee updated", "data": rentFee})
}

// DELETE /delete-rent-fee/:id
func DeleteRentFee(c *gin.Context) {
	ID := c.Param("id")
	db := config.DB()

	if err := db.Delete(&entity.RentFee{}, ID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "RentFee deleted"})
}
