export interface AadminInterface {
    id?: number;         // Primary Key, generated by GORM (gorm.Model includes ID)
    username?: string;   // Username of the admin
    firstName?: string;  // First name of the admin
    lastName?: string;   // Last name of the admin
    phone?: string;      // Phone number of the admin
    password?: string;        
}