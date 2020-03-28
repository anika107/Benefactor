
ALTER TABLE `student` ADD `username` VARCHAR(10) NOT NULL AFTER `email`, ADD `firstname` VARCHAR(10) NOT NULL AFTER `username`, ADD `lastname` VARCHAR(10) NOT NULL AFTER `firstname`, ADD `password` VARCHAR(10) NOT NULL AFTER `lastname`, ADD PRIMARY KEY (`username`);
ALTER TABLE `student` ADD `email` VARCHAR(20) NOT NULL AFTER `password`;

ALTER TABLE `student` CHANGE `password` `password` VARCHAR(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;



CREATE TABLE `employer`(
    `username` VARCHAR(10) NOT NULL ,
    `firstname` VARCHAR(10) NOT NULL ,
    `lastname` VARCHAR(10) NOT NULL ,
    `companyname` VARCHAR(10) NOT NULL ,
    `password` VARCHAR(10) NOT NULL 
)ENGINE=InnoDB DEFAULT CHARSET=latin1

ALTER TABLE `employer`  ADD `email` VARCHAR(20) NOT NULL  AFTER `username`;

ALTER TABLE `employer`  ADD PRIMARY KEY (`username`)

ALTER TABLE `employer` CHANGE `password` `password` VARCHAR(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;

ALTER TABLE`student` 
    ADD `gender` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `password`,
    ADD `location_id` INT NOT NULL AFTER `gender`,
    ADD `phone_no` VARCHAR(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `location_id`,
    ADD `dob` DATE NOT NULL AFTER `phone_no`,
    ADD `school` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `dob`,
    ADD `college` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `school`,
    ADD `university` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `college`,
    ADD `region1` INT NOT NULL AFTER `university`,
    ADD `region2` INT NOT NULL AFTER `region1`,
    ADD `region3` INT NOT NULL AFTER `region2`,
    ADD `region4` INT NOT NULL AFTER `region3`,
    ADD `job_cata1` INT NOT NULL AFTER `region4`,
    ADD `job_cata2` INT NOT NULL AFTER `job_cata1`,
    ADD `job_cata3` INT NOT NULL AFTER `job_cata2`,
    ADD `job_cata4` INT NOT NULL AFTER `job_cata3`,
    ADD `e_salary1` INT NOT NULL AFTER `job_cata4`,
    ADD `e_salary2` INT NOT NULL AFTER `e_salary1`,
    ADD `cv` LONGBLOB NOT NULL AFTER `e_satary2`;

CREATE TABLE `location`(
    `location_id` INT NOT NULL AUTO_INCREMENT,
    `streetname` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL ,
    `streetno` INT NOT NULL ,
    `city` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL ,
    `zip` INT NOT NULL 
    PRIMARY KEY(`location_id`)
)ENGINE = InnoDB;

CREATE TABLE `region` ( 
    `region_id` INT NOT NULL AUTO_INCREMENT , 
    `regionname` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL ,
     PRIMARY KEY (`region_id`)
     ) ENGINE = InnoDB;

CREATE TABLE `job_catagory` ( 
    `job_id` INT NOT NULL AUTO_INCREMENT ,
    `job_name` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL ,
    PRIMARY KEY (`job_id`)
     ) ENGINE = InnoDB;

ALTER TABLE `student` ADD `pic` LONGBLOB NOT NULL AFTER `cv`;

ALTER TABLE `student` ADD FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `student` ADD FOREIGN KEY (`region1`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD FOREIGN KEY (`region2`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD FOREIGN KEY (`region3`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD FOREIGN KEY (`region4`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `student` ADD FOREIGN KEY (`job_cata1`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT; ALTER TABLE `student` ADD FOREIGN KEY (`job_cata2`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT; ALTER TABLE `student` ADD FOREIGN KEY (`job_cata3`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT; ALTER TABLE `student` ADD FOREIGN KEY (`job_cata4`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `employer` ADD `location_id` INT NOT NULL AFTER `password`, ADD `website` VARCHAR(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `location_id`, ADD `position` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `website`, ADD `pic` LONGBLOB NOT NULL AFTER `position`;

ALTER TABLE `employer` ADD FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

CREATE TABLE `benefactor`.`circular` ( `circular_id` INT NULL DEFAULT NULL AUTO_INCREMENT , `employer_username` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `whatAreYouGoingToDo` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `whatWeOffer` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `whatWeAsk` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `status` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `location_id` INT NULL DEFAULT NULL , `workHour` MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `Education` MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL , `Salary` INT NULL DEFAULT NULL , `job_id` INT NULL DEFAULT NULL , `PublishedAt` DATE NULL DEFAULT NULL ,  `expireAt` DATE NULL DEFAULT NULL PRIMARY KEY (`circular_id`)) ENGINE = InnoDB;

