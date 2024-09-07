package entity

import "gorm.io/gorm"

type Family struct {
	gorm.Model
	FathersName        string
	MathersName        string
	OccupationFather   string
	OccupationMather   string
	PhoneFather        string
	PhoneMather        string
	OrGuardiansName    *string
	Relationship       *string
	OccupationGuardian *string
	PhoneGuardian      *string

	GuardiansID uint
	Guardian    *Guardians `gorm:"foreignKey: GuardiansID" json:"guardian"`

	FamilyStatusID uint
	FamilyStatus   *FamilyStatuses `gorm:"foreignKey: FamilyStatusID" json:"family_status"`

	// One-to-one relationship with Student
	//StudentID string
	StudentID uint
	Student   *Students `gorm:"foreignKey:StudentID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}