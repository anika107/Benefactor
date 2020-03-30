
ALTER TABLE `student` ADD `username` VARCHAR(10) NOT NULL AFTER `email`, ADD `firstname` VARCHAR(10) NOT NULL AFTER `username`, ADD `lastname` VARCHAR(10) NOT NULL AFTER `firstname`, ADD `password` VARCHAR(10) NOT NULL AFTER `lastname`, ADD PRIMARY KEY (`username`);
ALTER TABLE `student` ADD `email` VARCHAR(20) NOT NULL AFTER `password`;

ALTER TABLE `student` CHANGE `password` `password` VARCHAR(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;


ALTER TABLE `student` ADD FOREIGN KEY (`location_id`) REFERENCES `location`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;


ALTER TABLE `student` ADD  FOREIGN KEY (`job_cata1`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`job_cata2`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`job_cata3`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`job_cata4`) REFERENCES `job_catagory`(`job_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`region1`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`region2`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`region3`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `student` ADD  FOREIGN KEY (`region4`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

alter table circular drop foreign key circular_ibfk_1;alter table circular drop employer_username;

CREATE TABLE `circular_employer` (
 `circular_id` int(11) DEFAULT NULL,
 `employer_username` varchar(50) DEFAULT NULL,
 KEY `circular_id` (`circular_id`),
 KEY `employer_username` (`employer_username`),
 CONSTRAINT `circular_employer_ibfk_1` FOREIGN KEY (`circular_id`) REFERENCES `circular` (`circular_id`),
 CONSTRAINT `circular_employer_ibfk_2` FOREIGN KEY (`employer_username`) REFERENCES `employer` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
