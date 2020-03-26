
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

ALTER TABLE
    `student` ADD `gender` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `password`,
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
    ADD `e_satary2` INT NOT NULL AFTER `e_salary1`,
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

ALTER TABLE `student` ADD `pic` LONGBLOB NOT NULL AFTER `cv`