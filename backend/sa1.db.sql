BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"gender"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "dorms" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"type"	text,
	"gender_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_genders_dorms" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	CONSTRAINT "fk_reservations_dorm" FOREIGN KEY("id") REFERENCES "reservations"("id")
);
CREATE TABLE IF NOT EXISTS "rooms" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"room_number"	integer,
	"available"	integer,
	"dorm_status"	text,
	"dorm_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_dorms_rooms" FOREIGN KEY("dorm_id") REFERENCES "dorms"("id")
);
CREATE TABLE IF NOT EXISTS "students" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"student_id"	integer,
	"password"	text,
	"first_name"	text,
	"last_name"	text,
	"birthday"	datetime,
	"year"	integer,
	"major"	text,
	"gender_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_addresses_student" FOREIGN KEY("student_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_genders_student" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	CONSTRAINT "fk_reservations_student" FOREIGN KEY("student_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_families_student" FOREIGN KEY("student_id") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_others_student" FOREIGN KEY("student_id") REFERENCES "others"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_personals_student" FOREIGN KEY("student_id") REFERENCES "personals"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "announcements" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"title"	text,
	"content"	text,
	"date"	datetime,
	"admin_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_admins_announcement" FOREIGN KEY("admin_id") REFERENCES "admins"("id")
);
CREATE TABLE IF NOT EXISTS "family_statuses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"family_status"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "guardians" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"guardian"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "licenses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"license"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "addresses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"house_no"	text,
	"village_no"	text,
	"village"	text,
	"alley"	text,
	"road"	text,
	"sub_district"	text,
	"district"	text,
	"province"	text,
	"post_code"	text,
	"student_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "families" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"fathers_name"	text,
	"mathers_name"	text,
	"occupation_father"	text,
	"occupation_mather"	text,
	"phone_father"	text,
	"phone_mather"	text,
	"or_guardians_name"	text,
	"relationship"	text,
	"occupation_guardian"	text,
	"phone_guardian"	text,
	"guardians_id"	integer,
	"family_status_id"	integer,
	"student_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "fk_families_guardian" FOREIGN KEY("guardians_id") REFERENCES "guardians"("id"),
	CONSTRAINT "fk_families_family_status" FOREIGN KEY("family_status_id") REFERENCES "family_statuses"("id")
);
CREATE TABLE IF NOT EXISTS "others" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"latest_graduation_from"	text,
	"graduated_year"	integer,
	"gpax"	real,
	"personal_vehicles"	text,
	"color"	text,
	"plate_no"	text,
	"tax_date"	datetime,
	"province_vehicle"	text,
	"type"	text,
	"expired_card"	datetime,
	"license_id"	integer,
	"student_id"	integer,
	CONSTRAINT "fk_others_license" FOREIGN KEY("license_id") REFERENCES "family_statuses"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "personals" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"nickname"	text,
	"citizen_id"	text,
	"phone"	text,
	"nationality"	text,
	"race"	text,
	"religion"	text,
	"blood_group"	text,
	"ud"	text,
	"student_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "repairings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"subject"	text,
	"detail"	text,
	"image"	longtext,
	"location_details"	text,
	"contact"	text,
	"time_slot"	text,
	"remarks"	text,
	"status"	text,
	"reservation_id"	integer,
	"admin_id"	integer,
	CONSTRAINT "fk_admins_repairings" FOREIGN KEY("admin_id") REFERENCES "admins"("id"),
	CONSTRAINT "fk_reservations_repairings" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "delayed_payment_forms" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"dorm_payment"	real,
	"electricly_bill"	real,
	"water_bill"	real,
	"because_of"	text,
	"due_date"	datetime,
	"status"	text,
	"reservation_id"	integer,
	"admin_id"	integer,
	CONSTRAINT "fk_admins_delayed_payment_forms" FOREIGN KEY("admin_id") REFERENCES "admins"("id"),
	CONSTRAINT "fk_reservations_delayed_payment_forms" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "en_exiting_forms" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date_submission"	datetime,
	"request"	text,
	"because_of"	text,
	"date_request"	datetime,
	"status"	text,
	"reservation_id"	integer,
	"admin_id"	integer,
	CONSTRAINT "fk_reservations_en_exiting_forms" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id"),
	CONSTRAINT "fk_admins_en_exiting_forms" FOREIGN KEY("admin_id") REFERENCES "admins"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "resigning_forms" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date"	datetime,
	"because_of"	text,
	"accommodation"	text,
	"status"	text,
	"reservation_id"	integer,
	"admin_id"	integer,
	CONSTRAINT "fk_admins_resigning_forms" FOREIGN KEY("admin_id") REFERENCES "admins"("id"),
	CONSTRAINT "fk_reservations_resigning_forms" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "rent_fees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"amount"	real,
	"reservation_id"	integer,
	CONSTRAINT "fk_rent_fees_reservation" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "water_fees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"amount"	real,
	"reservation_id"	integer,
	CONSTRAINT "fk_water_fees_reservation" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "electricity_fees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"amount"	real,
	"reservation_id"	integer,
	CONSTRAINT "fk_electricity_fees_reservation" FOREIGN KEY("reservation_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "expenses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"remark"	text,
	"status"	text,
	"rent_fee_id"	integer,
	"electricity_fee_id"	integer,
	"water_fee_id"	integer,
	CONSTRAINT "fk_expenses_rent_fees" FOREIGN KEY("rent_fee_id") REFERENCES "rent_fees"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_expenses_water_fees" FOREIGN KEY("water_fee_id") REFERENCES "water_fees"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_expenses_electricity_fees" FOREIGN KEY("electricity_fee_id") REFERENCES "electricity_fees"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "slips" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"path"	text,
	"date"	datetime,
	"admin_id"	integer,
	"expense_id"	integer,
	CONSTRAINT "fk_slips_expense" FOREIGN KEY("expense_id") REFERENCES "expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT "fk_slips_admin" FOREIGN KEY("admin_id") REFERENCES "admins"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "reservations" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"reservation_date"	datetime,
	"student_id"	text,
	"dorm_id"	integer,
	"room_id"	integer,
	CONSTRAINT "fk_dorms_reservations" FOREIGN KEY("id") REFERENCES "dorms"("id"),
	CONSTRAINT "fk_rooms_reservations" FOREIGN KEY("room_id") REFERENCES "rooms"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "admins" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"username"	text,
	"first_name"	text,
	"last_name"	text,
	"phone"	text,
	"password"	text,
	CONSTRAINT "fk_repairings_admin" FOREIGN KEY("id") REFERENCES "repairings"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "genders" VALUES (1,'2024-09-13 03:49:10.0971984+07:00','2024-09-13 03:49:10.0971984+07:00',NULL,'Male');
INSERT INTO "genders" VALUES (2,'2024-09-13 03:49:10.1024212+07:00','2024-09-13 03:49:10.1024212+07:00',NULL,'Female');
INSERT INTO "dorms" VALUES (1,'2024-09-13 03:49:10.1449922+07:00','2024-09-13 03:49:10.1449922+07:00',NULL,'หอพักชาย 1',1);
INSERT INTO "dorms" VALUES (2,'2024-09-13 03:49:10.1504344+07:00','2024-09-13 03:49:10.1504344+07:00',NULL,'หอพักชาย 2',1);
INSERT INTO "dorms" VALUES (3,'2024-09-13 03:49:10.1551539+07:00','2024-09-13 03:49:10.1551539+07:00',NULL,'หอพักหญิง 3',2);
INSERT INTO "dorms" VALUES (4,'2024-09-13 03:49:10.1587901+07:00','2024-09-13 03:49:10.1587901+07:00',NULL,'หอพักหญิง 4',2);
INSERT INTO "rooms" VALUES (1,'2024-09-13 03:49:10.164165+07:00','2024-09-13 03:49:10.164165+07:00',NULL,1100,0,'',1);
INSERT INTO "rooms" VALUES (2,'2024-09-13 03:49:10.1694583+07:00','2024-09-13 03:49:10.1694583+07:00',NULL,1101,0,'',1);
INSERT INTO "rooms" VALUES (3,'2024-09-13 03:49:10.1736457+07:00','2024-09-13 03:49:10.1736457+07:00',NULL,1102,0,'',1);
INSERT INTO "rooms" VALUES (4,'2024-09-13 03:49:10.178947+07:00','2024-09-13 03:49:10.178947+07:00',NULL,1103,0,'',1);
INSERT INTO "rooms" VALUES (5,'2024-09-13 03:49:10.1831116+07:00','2024-09-13 03:49:10.1831116+07:00',NULL,1104,0,'',1);
INSERT INTO "rooms" VALUES (6,'2024-09-13 03:49:10.1879587+07:00','2024-09-13 03:49:10.1879587+07:00',NULL,1105,0,'',1);
INSERT INTO "rooms" VALUES (7,'2024-09-13 03:49:10.1931846+07:00','2024-09-13 03:49:10.1931846+07:00',NULL,1106,0,'',1);
INSERT INTO "rooms" VALUES (8,'2024-09-13 03:49:10.197378+07:00','2024-09-13 03:49:10.197378+07:00',NULL,1107,0,'',1);
INSERT INTO "rooms" VALUES (9,'2024-09-13 03:49:10.2022558+07:00','2024-09-13 03:49:10.2022558+07:00',NULL,1108,0,'',1);
INSERT INTO "rooms" VALUES (10,'2024-09-13 03:49:10.2071918+07:00','2024-09-13 03:49:10.2071918+07:00',NULL,1109,0,'',1);
INSERT INTO "rooms" VALUES (11,'2024-09-13 03:49:10.2119207+07:00','2024-09-13 03:49:10.2119207+07:00',NULL,1200,0,'',1);
INSERT INTO "rooms" VALUES (12,'2024-09-13 03:49:10.2173255+07:00','2024-09-13 03:49:10.2173255+07:00',NULL,1201,0,'',1);
INSERT INTO "rooms" VALUES (13,'2024-09-13 03:49:10.2225131+07:00','2024-09-13 03:49:10.2225131+07:00',NULL,1202,0,'',1);
INSERT INTO "rooms" VALUES (14,'2024-09-13 03:49:10.2266784+07:00','2024-09-13 03:49:10.2266784+07:00',NULL,1203,0,'',1);
INSERT INTO "rooms" VALUES (15,'2024-09-13 03:49:10.2325858+07:00','2024-09-13 03:49:10.2325858+07:00',NULL,1204,0,'',1);
INSERT INTO "rooms" VALUES (16,'2024-09-13 03:49:10.2388902+07:00','2024-09-13 03:49:10.2388902+07:00',NULL,1205,0,'',1);
INSERT INTO "rooms" VALUES (17,'2024-09-13 03:49:10.2440644+07:00','2024-09-13 03:49:10.2440644+07:00',NULL,1206,0,'',1);
INSERT INTO "rooms" VALUES (18,'2024-09-13 03:49:10.2493464+07:00','2024-09-13 03:49:10.2493464+07:00',NULL,1207,0,'',1);
INSERT INTO "rooms" VALUES (19,'2024-09-13 03:49:10.2551523+07:00','2024-09-13 03:49:10.2551523+07:00',NULL,1208,0,'',1);
INSERT INTO "rooms" VALUES (20,'2024-09-13 03:49:10.2611498+07:00','2024-09-13 03:49:10.2611498+07:00',NULL,1209,0,'',1);
INSERT INTO "rooms" VALUES (21,'2024-09-13 03:49:10.2673985+07:00','2024-09-13 03:49:10.2673985+07:00',NULL,1300,0,'',1);
INSERT INTO "rooms" VALUES (22,'2024-09-13 03:49:10.2733235+07:00','2024-09-13 03:49:10.2733235+07:00',NULL,1301,0,'',1);
INSERT INTO "rooms" VALUES (23,'2024-09-13 03:49:10.2773948+07:00','2024-09-13 03:49:10.2773948+07:00',NULL,1302,0,'',1);
INSERT INTO "rooms" VALUES (24,'2024-09-13 03:49:10.2828988+07:00','2024-09-13 03:49:10.2828988+07:00',NULL,1303,0,'',1);
INSERT INTO "rooms" VALUES (25,'2024-09-13 03:49:10.2892121+07:00','2024-09-13 03:49:10.2892121+07:00',NULL,1304,0,'',1);
INSERT INTO "rooms" VALUES (26,'2024-09-13 03:49:10.2941784+07:00','2024-09-13 03:49:10.2941784+07:00',NULL,1305,0,'',1);
INSERT INTO "rooms" VALUES (27,'2024-09-13 03:49:10.3011925+07:00','2024-09-13 03:49:10.3011925+07:00',NULL,1306,0,'',1);
INSERT INTO "rooms" VALUES (28,'2024-09-13 03:49:10.3058953+07:00','2024-09-13 03:49:10.3058953+07:00',NULL,1307,0,'',1);
INSERT INTO "rooms" VALUES (29,'2024-09-13 03:49:10.3112798+07:00','2024-09-13 03:49:10.3112798+07:00',NULL,1308,0,'',1);
INSERT INTO "rooms" VALUES (30,'2024-09-13 03:49:10.3154996+07:00','2024-09-13 03:49:10.3154996+07:00',NULL,1309,0,'',1);
INSERT INTO "rooms" VALUES (31,'2024-09-13 03:49:10.3216656+07:00','2024-09-13 03:49:10.3216656+07:00',NULL,2100,0,'',2);
INSERT INTO "rooms" VALUES (32,'2024-09-13 03:49:10.3272097+07:00','2024-09-13 03:49:10.3272097+07:00',NULL,2101,0,'',2);
INSERT INTO "rooms" VALUES (33,'2024-09-13 03:49:10.332465+07:00','2024-09-13 03:49:10.332465+07:00',NULL,2102,0,'',2);
INSERT INTO "rooms" VALUES (34,'2024-09-13 03:49:10.337921+07:00','2024-09-13 03:49:10.337921+07:00',NULL,2103,0,'',2);
INSERT INTO "rooms" VALUES (35,'2024-09-13 03:49:10.3431907+07:00','2024-09-13 03:49:10.3431907+07:00',NULL,2104,0,'',2);
INSERT INTO "rooms" VALUES (36,'2024-09-13 03:49:10.3479151+07:00','2024-09-13 03:49:10.3479151+07:00',NULL,2105,0,'',2);
INSERT INTO "rooms" VALUES (37,'2024-09-13 03:49:10.3532827+07:00','2024-09-13 03:49:10.3532827+07:00',NULL,2106,0,'',2);
INSERT INTO "rooms" VALUES (38,'2024-09-13 03:49:10.3574152+07:00','2024-09-13 03:49:10.3574152+07:00',NULL,2107,0,'',2);
INSERT INTO "rooms" VALUES (39,'2024-09-13 03:49:10.3616396+07:00','2024-09-13 03:49:10.3616396+07:00',NULL,2108,0,'',2);
INSERT INTO "rooms" VALUES (40,'2024-09-13 03:49:10.3668829+07:00','2024-09-13 03:49:10.3668829+07:00',NULL,2109,0,'',2);
INSERT INTO "rooms" VALUES (41,'2024-09-13 03:49:10.3711511+07:00','2024-09-13 03:49:10.3711511+07:00',NULL,2200,0,'',2);
INSERT INTO "rooms" VALUES (42,'2024-09-13 03:49:10.3758837+07:00','2024-09-13 03:49:10.3758837+07:00',NULL,2201,0,'',2);
INSERT INTO "rooms" VALUES (43,'2024-09-13 03:49:10.3811647+07:00','2024-09-13 03:49:10.3811647+07:00',NULL,2202,0,'',2);
INSERT INTO "rooms" VALUES (44,'2024-09-13 03:49:10.3854256+07:00','2024-09-13 03:49:10.3854256+07:00',NULL,2203,0,'',2);
INSERT INTO "rooms" VALUES (45,'2024-09-13 03:49:10.3901806+07:00','2024-09-13 03:49:10.3901806+07:00',NULL,2204,0,'',2);
INSERT INTO "rooms" VALUES (46,'2024-09-13 03:49:10.394873+07:00','2024-09-13 03:49:10.394873+07:00',NULL,2205,0,'',2);
INSERT INTO "rooms" VALUES (47,'2024-09-13 03:49:10.3997584+07:00','2024-09-13 03:49:10.3997584+07:00',NULL,2206,0,'',2);
INSERT INTO "rooms" VALUES (48,'2024-09-13 03:49:10.405574+07:00','2024-09-13 03:49:10.405574+07:00',NULL,2207,0,'',2);
INSERT INTO "rooms" VALUES (49,'2024-09-13 03:49:10.4097686+07:00','2024-09-13 03:49:10.4097686+07:00',NULL,2208,0,'',2);
INSERT INTO "rooms" VALUES (50,'2024-09-13 03:49:10.4152975+07:00','2024-09-13 03:49:10.4152975+07:00',NULL,2209,0,'',2);
INSERT INTO "rooms" VALUES (51,'2024-09-13 03:49:10.4203555+07:00','2024-09-13 03:49:10.4203555+07:00',NULL,2300,0,'',2);
INSERT INTO "rooms" VALUES (52,'2024-09-13 03:49:10.4240478+07:00','2024-09-13 03:49:10.4240478+07:00',NULL,2301,0,'',2);
INSERT INTO "rooms" VALUES (53,'2024-09-13 03:49:10.4271506+07:00','2024-09-13 03:49:10.4271506+07:00',NULL,2302,0,'',2);
INSERT INTO "rooms" VALUES (54,'2024-09-13 03:49:10.431888+07:00','2024-09-13 03:49:10.431888+07:00',NULL,2303,0,'',2);
INSERT INTO "rooms" VALUES (55,'2024-09-13 03:49:10.4360749+07:00','2024-09-13 03:49:10.4360749+07:00',NULL,2304,0,'',2);
INSERT INTO "rooms" VALUES (56,'2024-09-13 03:49:10.4408007+07:00','2024-09-13 03:49:10.4408007+07:00',NULL,2305,0,'',2);
INSERT INTO "rooms" VALUES (57,'2024-09-13 03:49:10.4461644+07:00','2024-09-13 03:49:10.4461644+07:00',NULL,2306,0,'',2);
INSERT INTO "rooms" VALUES (58,'2024-09-13 03:49:10.4503728+07:00','2024-09-13 03:49:10.4503728+07:00',NULL,2307,0,'',2);
INSERT INTO "rooms" VALUES (59,'2024-09-13 03:49:10.4550731+07:00','2024-09-13 03:49:10.4550731+07:00',NULL,2308,0,'',2);
INSERT INTO "rooms" VALUES (60,'2024-09-13 03:49:10.4596777+07:00','2024-09-13 03:49:10.4596777+07:00',NULL,2309,0,'',2);
INSERT INTO "rooms" VALUES (61,'2024-09-13 03:49:10.4642044+07:00','2024-09-13 03:49:10.4642044+07:00',NULL,3100,0,'',3);
INSERT INTO "rooms" VALUES (62,'2024-09-13 03:49:10.4692428+07:00','2024-09-13 03:49:10.4692428+07:00',NULL,3101,0,'',3);
INSERT INTO "rooms" VALUES (63,'2024-09-13 03:49:10.4752804+07:00','2024-09-13 03:49:10.4752804+07:00',NULL,3102,0,'',3);
INSERT INTO "rooms" VALUES (64,'2024-09-13 03:49:10.4811123+07:00','2024-09-13 03:49:10.4811123+07:00',NULL,3103,0,'',3);
INSERT INTO "rooms" VALUES (65,'2024-09-13 03:49:10.4869461+07:00','2024-09-13 03:49:10.4869461+07:00',NULL,3104,0,'',3);
INSERT INTO "rooms" VALUES (66,'2024-09-13 03:49:10.4923982+07:00','2024-09-13 03:49:10.4923982+07:00',NULL,3105,0,'',3);
INSERT INTO "rooms" VALUES (67,'2024-09-13 03:49:10.4976629+07:00','2024-09-13 03:49:10.4976629+07:00',NULL,3106,0,'',3);
INSERT INTO "rooms" VALUES (68,'2024-09-13 03:49:10.5018343+07:00','2024-09-13 03:49:10.5018343+07:00',NULL,3107,0,'',3);
INSERT INTO "rooms" VALUES (69,'2024-09-13 03:49:10.5064586+07:00','2024-09-13 03:49:10.5064586+07:00',NULL,3108,0,'',3);
INSERT INTO "rooms" VALUES (70,'2024-09-13 03:49:10.5105866+07:00','2024-09-13 03:49:10.5105866+07:00',NULL,3109,0,'',3);
INSERT INTO "rooms" VALUES (71,'2024-09-13 03:49:10.5152895+07:00','2024-09-13 03:49:10.5152895+07:00',NULL,3200,0,'',3);
INSERT INTO "rooms" VALUES (72,'2024-09-13 03:49:10.5199864+07:00','2024-09-13 03:49:10.5199864+07:00',NULL,3201,0,'',3);
INSERT INTO "rooms" VALUES (73,'2024-09-13 03:49:10.5253427+07:00','2024-09-13 03:49:10.5253427+07:00',NULL,3202,0,'',3);
INSERT INTO "rooms" VALUES (74,'2024-09-13 03:49:10.5300707+07:00','2024-09-13 03:49:10.5300707+07:00',NULL,3203,0,'',3);
INSERT INTO "rooms" VALUES (75,'2024-09-13 03:49:10.5342667+07:00','2024-09-13 03:49:10.5342667+07:00',NULL,3204,0,'',3);
INSERT INTO "rooms" VALUES (76,'2024-09-13 03:49:10.5390732+07:00','2024-09-13 03:49:10.5390732+07:00',NULL,3205,0,'',3);
INSERT INTO "rooms" VALUES (77,'2024-09-13 03:49:10.5436159+07:00','2024-09-13 03:49:10.5436159+07:00',NULL,3206,0,'',3);
INSERT INTO "rooms" VALUES (78,'2024-09-13 03:49:10.54861+07:00','2024-09-13 03:49:10.54861+07:00',NULL,3207,0,'',3);
INSERT INTO "rooms" VALUES (79,'2024-09-13 03:49:10.5550295+07:00','2024-09-13 03:49:10.5550295+07:00',NULL,3208,0,'',3);
INSERT INTO "rooms" VALUES (80,'2024-09-13 03:49:10.5603285+07:00','2024-09-13 03:49:10.5603285+07:00',NULL,3209,0,'',3);
INSERT INTO "rooms" VALUES (81,'2024-09-13 03:49:10.5656254+07:00','2024-09-13 03:49:10.5656254+07:00',NULL,3300,0,'',3);
INSERT INTO "rooms" VALUES (82,'2024-09-13 03:49:10.5709246+07:00','2024-09-13 03:49:10.5709246+07:00',NULL,3301,0,'',3);
INSERT INTO "rooms" VALUES (83,'2024-09-13 03:49:10.5762914+07:00','2024-09-13 03:49:10.5762914+07:00',NULL,3302,0,'',3);
INSERT INTO "rooms" VALUES (84,'2024-09-13 03:49:10.581538+07:00','2024-09-13 03:49:10.581538+07:00',NULL,3303,0,'',3);
INSERT INTO "rooms" VALUES (85,'2024-09-13 03:49:10.5868569+07:00','2024-09-13 03:49:10.5868569+07:00',NULL,3304,0,'',3);
INSERT INTO "rooms" VALUES (86,'2024-09-13 03:49:10.5916358+07:00','2024-09-13 03:49:10.5916358+07:00',NULL,3305,0,'',3);
INSERT INTO "rooms" VALUES (87,'2024-09-13 03:49:10.5968982+07:00','2024-09-13 03:49:10.5968982+07:00',NULL,3306,0,'',3);
INSERT INTO "rooms" VALUES (88,'2024-09-13 03:49:10.6016934+07:00','2024-09-13 03:49:10.6016934+07:00',NULL,3307,0,'',3);
INSERT INTO "rooms" VALUES (89,'2024-09-13 03:49:10.6073853+07:00','2024-09-13 03:49:10.6073853+07:00',NULL,3308,0,'',3);
INSERT INTO "rooms" VALUES (90,'2024-09-13 03:49:10.611968+07:00','2024-09-13 03:49:10.611968+07:00',NULL,3309,0,'',3);
INSERT INTO "rooms" VALUES (91,'2024-09-13 03:49:10.6165253+07:00','2024-09-13 03:49:10.6165253+07:00',NULL,4100,0,'',4);
INSERT INTO "rooms" VALUES (92,'2024-09-13 03:49:10.6221731+07:00','2024-09-13 03:49:10.6221731+07:00',NULL,4101,0,'',4);
INSERT INTO "rooms" VALUES (93,'2024-09-13 03:49:10.6252013+07:00','2024-09-13 03:49:10.6252013+07:00',NULL,4102,0,'',4);
INSERT INTO "rooms" VALUES (94,'2024-09-13 03:49:10.6292215+07:00','2024-09-13 03:49:10.6292215+07:00',NULL,4103,0,'',4);
INSERT INTO "rooms" VALUES (95,'2024-09-13 03:49:10.6338436+07:00','2024-09-13 03:49:10.6338436+07:00',NULL,4104,0,'',4);
INSERT INTO "rooms" VALUES (96,'2024-09-13 03:49:10.6380039+07:00','2024-09-13 03:49:10.6380039+07:00',NULL,4105,0,'',4);
INSERT INTO "rooms" VALUES (97,'2024-09-13 03:49:10.6427509+07:00','2024-09-13 03:49:10.6427509+07:00',NULL,4106,0,'',4);
INSERT INTO "rooms" VALUES (98,'2024-09-13 03:49:10.6475367+07:00','2024-09-13 03:49:10.6475367+07:00',NULL,4107,0,'',4);
INSERT INTO "rooms" VALUES (99,'2024-09-13 03:49:10.6517151+07:00','2024-09-13 03:49:10.6517151+07:00',NULL,4108,0,'',4);
INSERT INTO "rooms" VALUES (100,'2024-09-13 03:49:10.6569578+07:00','2024-09-13 03:49:10.6569578+07:00',NULL,4109,0,'',4);
INSERT INTO "students" VALUES (1,'2024-09-13 03:49:11.4644967+07:00','2024-09-13 03:49:11.4644967+07:00',NULL,'B6510001','$2a$14$/unrduWCzRn2YDLb84dfZ.2M3SurpOlCE9gfH7xMVu1n9.GC8K7Va','Nicha','Wandee','1988-11-12 00:00:00+00:00',3,'วิศวกรรมศาสตร์',2);
INSERT INTO "announcements" VALUES (1,'2024-09-13 03:51:14.8228417+07:00','2024-09-13 03:51:14.8228417+07:00',NULL,'d','d','2024-09-13 03:51:14.8228417+07:00',2);
INSERT INTO "family_statuses" VALUES (1,'2024-09-13 03:49:10.1067568+07:00','2024-09-13 03:49:10.1067568+07:00',NULL,'อยู่ด้วยกัน');
INSERT INTO "family_statuses" VALUES (2,'2024-09-13 03:49:10.1121265+07:00','2024-09-13 03:49:10.1121265+07:00',NULL,'แยกกันอยู่');
INSERT INTO "family_statuses" VALUES (3,'2024-09-13 03:49:10.1173494+07:00','2024-09-13 03:49:10.1173494+07:00',NULL,'อื่นๆ (พ่อหรือแม่เสียชีวิต)');
INSERT INTO "guardians" VALUES (1,'2024-09-13 03:49:10.1227963+07:00','2024-09-13 03:49:10.1227963+07:00',NULL,'มารดา');
INSERT INTO "guardians" VALUES (2,'2024-09-13 03:49:10.1269383+07:00','2024-09-13 03:49:10.1269383+07:00',NULL,'บิดา');
INSERT INTO "guardians" VALUES (3,'2024-09-13 03:49:10.1324733+07:00','2024-09-13 03:49:10.1324733+07:00',NULL,'อื่นๆ (ระบุ)');
INSERT INTO "licenses" VALUES (1,'2024-09-13 03:49:10.1370882+07:00','2024-09-13 03:49:10.1370882+07:00',NULL,'มี');
INSERT INTO "licenses" VALUES (2,'2024-09-13 03:49:10.1414592+07:00','2024-09-13 03:49:10.1414592+07:00',NULL,'ไม่มี');
INSERT INTO "repairings" VALUES (1,'2024-09-13 03:49:13.0960772+07:00','2024-09-13 03:49:13.0960772+07:00',NULL,'อ่างล้างมือตัน','ทำเศษอาหารตก','yes','ห้องน้ำชั้น 1 หอ 4','097-153-1219','09:00-16:00 น.',NULL,'รอดำเนินการ',1,1);
INSERT INTO "rent_fees" VALUES (1,'2024-09-13 03:49:13.1018189+07:00','2024-09-13 03:49:13.1018189+07:00',NULL,6500.0,1);
INSERT INTO "rent_fees" VALUES (2,'2024-09-13 03:57:39.4276892+07:00','2024-09-13 03:57:39.4276892+07:00',NULL,0.0,2);
INSERT INTO "rent_fees" VALUES (3,'2024-09-13 03:58:57.9283551+07:00','2024-09-13 03:58:57.9283551+07:00',NULL,2900.0,3);
INSERT INTO "water_fees" VALUES (1,'2024-09-13 03:49:13.1070436+07:00','2024-09-13 03:49:13.1070436+07:00',NULL,100.0,0);
INSERT INTO "electricity_fees" VALUES (1,'2024-09-13 03:49:13.1117734+07:00','2024-09-13 03:49:13.116511+07:00',NULL,150.0,0);
INSERT INTO "expenses" VALUES (1,'2024-09-13 03:49:13.1208629+07:00','2024-09-13 03:49:13.1208629+07:00',NULL,'ค่าใช้จ่ายสำหรับเดือนนี้','Pending',1,1,1);
INSERT INTO "reservations" VALUES (1,'2024-09-13 03:49:11.4723555+07:00','2024-09-13 03:49:11.4723555+07:00',NULL,'1997-05-21 00:00:00+00:00',' B6510001',4,100);
INSERT INTO "reservations" VALUES (2,'2024-09-13 03:57:37.7457036+07:00','2024-09-13 03:57:37.7457036+07:00',NULL,'1997-05-21 00:00:00+00:00','1',4,100);
INSERT INTO "reservations" VALUES (3,'2024-09-13 03:58:56.2350439+07:00','2024-09-13 03:58:56.2350439+07:00',NULL,'1997-05-21 00:00:00+00:00','B6510001',4,100);
INSERT INTO "admins" VALUES (1,'2024-09-13 03:49:12.2797445+07:00','2024-09-13 03:49:12.2797445+07:00',NULL,'jetnipat','Jetnipat','Kunjai','061xxxxxxx','$2a$14$A8JQekscBvhrSi32OrAOeeIRnLstZw4hhRLvoeuULyS4OBJIclO06');
INSERT INTO "admins" VALUES (2,'2024-09-13 03:49:13.0850846+07:00','2024-09-13 03:49:13.0850846+07:00',NULL,'Jetsadaphon','Jetsadaphon','Pinjai','061xxxxxxx','$2a$14$VPo.xc0sVtbe0hq8MokV9O5.yB.enV4GPgj65lJwBUbSIdw1U53ne');
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_dorms_deleted_at" ON "dorms" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_rooms_deleted_at" ON "rooms" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_students_deleted_at" ON "students" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_announcements_deleted_at" ON "announcements" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_family_statuses_deleted_at" ON "family_statuses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_guardians_deleted_at" ON "guardians" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_licenses_deleted_at" ON "licenses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_addresses_deleted_at" ON "addresses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_families_deleted_at" ON "families" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_others_deleted_at" ON "others" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_personals_deleted_at" ON "personals" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_repairings_deleted_at" ON "repairings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_delayed_payment_forms_deleted_at" ON "delayed_payment_forms" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_en_exiting_forms_deleted_at" ON "en_exiting_forms" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_resigning_forms_deleted_at" ON "resigning_forms" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_rent_fees_deleted_at" ON "rent_fees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_water_fees_deleted_at" ON "water_fees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_electricity_fees_deleted_at" ON "electricity_fees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_expenses_deleted_at" ON "expenses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_slips_deleted_at" ON "slips" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_reservations_deleted_at" ON "reservations" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_admins_deleted_at" ON "admins" (
	"deleted_at"
);
COMMIT;
