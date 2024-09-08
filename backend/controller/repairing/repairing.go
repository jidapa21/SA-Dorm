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

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&repairing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา studentid ด้วย reservationid จาก repairing
	var reservation entity.Reservation
	//var students entity.Students
	db.First(&reservation, repairing.ReservationID)
	if reservation.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "reservation_id not found"})
		return
	}

	// สร้าง repairing
	rp := entity.Repairing{
		Subject: 			repairing.Subject, // ตั้งค่าฟิลด์ Subject
		Detail:  			repairing.Detail,  // ตั้งค่าฟิลด์ Detail
		Image:     			repairing.Image,     // ตั้งค่าฟิลด์ Image
		Location_Details:  	repairing.Location_Details,
		Contact:   			repairing.Contact,
		Time_Slot:   		repairing.Time_Slot,
		Remarks:   			repairing.Remarks,
		Status:   			repairing.Status,
		ReservationID:  	repairing.ReservationID,
		//Gender:    			gender, // โยงความสัมพันธ์กับ Entity Gender
	}

	// บันทึก
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
	results := db.Preload("Reservation").First(&repairing, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if repairing.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, repairing)
}

// GET /Repairings
func ListRepairings(c *gin.Context) {

	var repairings []entity.Repairing

	db := config.DB()
	results := db.Preload("Reservation").Find(&repairings)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, repairings)
}

// DELETE /Repairings/:id
func DeleteRepairings(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM Repairings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /repairings
func UpdateRepairing(c *gin.Context) {
	var repairing entity.Repairing

	RepairingID := c.Param("id")

	db := config.DB()
	result := db.First(&repairing, RepairingID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&repairing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&repairing)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}