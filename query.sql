
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

