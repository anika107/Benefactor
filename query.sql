
ALTER TABLE `student` ADD `username` VARCHAR(10) NOT NULL AFTER `email`, ADD `firstname` VARCHAR(10) NOT NULL AFTER `username`, ADD `lastname` VARCHAR(10) NOT NULL AFTER `firstname`, ADD `password` VARCHAR(10) NOT NULL AFTER `lastname`, ADD PRIMARY KEY (`username`);
ALTER TABLE `student` ADD `email` VARCHAR(20) NOT NULL AFTER `password`;

ALTER TABLE `student` CHANGE `password` `password` VARCHAR(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;