package delayedpaymentform

import (
	"net/http"

<<<<<<< HEAD
type Repairing struct {
<<<<<<< HEAD
<<<<<<< HEAD
	gorm.Model
	ID               uint    `gorm:"primaryKey;autoIncrement"`
	Title            string  `json:"title"`
	Type             string  `json:"type"`
	Detail           string  `json:"detail"`
	Image            string  `gorm:"type:longtext" json:"image"`
	Location_Details string  `json:"location_details"`
	Contact          string  `json:"contact"`
	Time_Slot        string  `json:"time_slot"`
	Remarks          *string `json:"remarks"`
	Status           string  `json:"status"`
=======
    gorm.Model
    ID                  uint `gorm:"primaryKey;autoIncrement"`
=======
	gorm.Model
>>>>>>> parent of 4c348b8 (ad)
    Subject             string  `json:"subject"`
    Detail              string  `json:"detail"`
    Image               string  `gorm:"type:longtext"; json:"image"`
    Location_Details    string  `json:"location_details"`
    Contact             string  `json:"contact"`
    Time_Slot           string  `json:"time_slot"`
    Remarks             *string `json:"remarks"`
    Status              string  `json:"status"`
<<<<<<< HEAD
>>>>>>> parent of c54501c (s)

	// One-to-one relationship
	ReservationID	uint      `json:"reservation_id"`
	Reservation		Reservation `gorm:"foreignKey: ReservationID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"reservation"`

    // AdminID ทำหน้าที่เป็น FK
    AdminID     uint    `json:"admin_id"`
    Admin       *Admins `gorm:"foreignKey:AdminID"`
}
=======
=======
	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)
>>>>>>> parent of c387d97 (ad)

// POST /users
func DelayedPaymentFormUI(c *gin.Context) {
	var delayedpaymentform entity.DelayedPaymentForm

	// bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&delayedpaymentform); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()
	}
	
	var reservation entity.Reservation
	if err := db.First(&reservation, delayedpaymentform.ReservationID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Reservation not found"})
		return
	}

	// สร้าง repairing
	d := entity.DelayedPaymentForm{
		Electricly_Bill: delayedpaymentform.Electricly_Bill,
		Water_Bill:      delayedpaymentform.Water_Bill,
		Because_Of:      delayedpaymentform.Because_Of,
		Due_Date:        delayedpaymentform.Due_Date,
		Status:          "รอดำเนินการ",
		ReservationID:   delayedpaymentform.ReservationID,
	}

	// บันทึก
	if err := db.Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": d})
}

// GET /Repairing/:id
func GetDelayedPaymentForm(c *gin.Context) {
	ID := c.Param("id")
	var delayedpaymentform entity.DelayedPaymentForm

	db := config.DB()
	if err := db.Preload("Reservation").First(&delayedpaymentform, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, delayedpaymentform)
}

// GET /Repairings
func ListDelayedPaymentForms(c *gin.Context) {
	var delayedpaymentform []entity.DelayedPaymentForm

	db := config.DB()
	if err := db.Preload("Reservation").Find(&delayedpaymentform).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, delayedpaymentform)
}

// PATCH /repairings
func UpdateDelayedPaymentForm(c *gin.Context) {
	id := c.Param("id")
	var payload struct {
		Status string `json:"status"` // รับเฉพาะ status จาก JSON payload
	}

	db := config.DB()
	adminID, exists := c.Get("admin_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Admin ID not found in context"})
		return
	}

	// Find the existing repair record
	var existingDelayedPaymentForm entity.DelayedPaymentForm
	result := db.First(&existingDelayedPaymentForm, id)
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
	if err := db.Model(&existingDelayedPaymentForm).Updates(map[string]interface{}{
		"Status":  payload.Status,
		"AdminID": adminID, // บันทึก adminID ที่อัปเดตสถานะ
	}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Status updated successfully"})
}
>>>>>>> parent of 4c348b8 (ad)
