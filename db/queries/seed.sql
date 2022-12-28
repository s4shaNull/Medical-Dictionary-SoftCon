USE MeDict;

ALTER TABLE dict CONVERT TO CHARACTER SET utf8;

LOAD DATA LOCAL INFILE "/usr/local/mysql/database.csv"
INTO TABLE dict
CHARACTER SET utf8
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(idx, en, vn, word_type, word_type_vn);
