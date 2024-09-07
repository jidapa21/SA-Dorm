export interface FamilyInterface{
    ID?: number;
    FathersName?: string;
    MathersName?: string;
    OccupationFather?: string;
    OccupationMather?: string;
    PhoneFather?: string;
    PhoneMather?: string;
    OrGuardiansName?: string;
    Relationship?: string;
    OccupationGuardian?: string;
    PhoneGuardian?: string;
    GuardiansID?: number;
    FamilyStatusID?: number;
    StudentID?: string; // เชื่อมโยงกับ Student
  }