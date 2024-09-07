package main

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/controller/admin"
	familystatuses "dormitory.com/dormitory/controller/familyStatuses"
	"dormitory.com/dormitory/controller/genders"
	"dormitory.com/dormitory/controller/guardians"
	"dormitory.com/dormitory/controller/license"
	"dormitory.com/dormitory/controller/personal"
	personaldetails "dormitory.com/dormitory/controller/personalDetails"
	"dormitory.com/dormitory/controller/student"
	"dormitory.com/dormitory/middlewares"
	"github.com/gin-gonic/gin"
)

// สำหรับสร้าง Server
const PORT = "8000"

func main() {
	// open connection database
	config.ConnectionDB()
	// Generate databases
	config.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())
	// Auth Route
	r.POST("/signin", student.SignInStudent)
	r.POST("/signin-admin", admin.SignInAdmin)
	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		// Student Route
		router.POST("/create-student", student.CreateStudent)
		router.PUT("/update-student/:id", student.UpdateStudent)
		router.GET("/list-student", student.ListStudent)
		router.GET("/get-student/:id", student.GetStudent)
		router.DELETE("/delete-student/:id", student.DeleteStudent)
		router.GET("/get-personal/:id", personal.GetPersonal)
		router.PUT("/update-personal/:id", personal.UpdatePersonal)
		router.POST("/create-personal-detail", personaldetails.CreatePersonalDetails)
		router.GET("/list-personal", personal.ListPersonal)

	}
	r.GET("/genders", genders.GetAll)
	r.GET("/familyStatuses", familystatuses.GetAll)
	r.GET("/guardians", guardians.GetAll)
	r.GET("/license", license.GetAll)

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	// Run the server
	r.Run("localhost:" + PORT)
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

/*
import (
	"github.com/jidapa21/SA_Dormitory/ReportProblem/backend/entity"
	"gorm.io/gorm"
	"gorm.io/driver/sqlite"
)
func main() {

	db, err := gorm.Open(sqlite.Open("dorm-entity.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&entity.Student{}, &entity.Dorm{}, &entity.Room{},
                 &entity.Admin{}, &entity.Repairing{}, &entity.DelayedPaymentForm{},
                 &entity.En_ExitingForm{}, &entity.ResigningForm{}, &entity.CurrentAddress{}, )
}
*/
