drop table IF EXISTS ChossingAnAssignement;
drop table IF EXISTS CollectionOfAssignements;
drop table IF EXISTS Collection;
drop table IF EXISTS Assignements;
drop table IF EXISTS Users;
drop table IF EXISTS Status;

Create table Users (
	UserID Int UNSIGNED NOT NULL AUTO_INCREMENT,
	StatusID Int UNSIGNED NOT NULL,
	Username Char(20),
	Password Char(40) NOT NULL,
	Name Char(20) NOT NULL,
	Surname Char(30),
	Emso Char(13),
	Checked int not null,
 Primary Key (UserID)) ENGINE = InnoDB charset=utf8;

Create table Status (
	StatusID Int UNSIGNED NOT NULL AUTO_INCREMENT,
	StatusName Char(20) NOT NULL,
 Primary Key (StatusID)) ENGINE = InnoDB charset=utf8;

Create table Assignements (
	AssignementID Int UNSIGNED NOT NULL AUTO_INCREMENT,
	Title Char(40) NOT NULL,
	Description Text,
	KeyWords Text,
	Created Date NOT NULL,
	Published Date,
	Startline Date,
	Deadline Date,
	MaxNumber Int,
 Primary Key (AssignementID)) ENGINE = InnoDB charset=utf8;

Create table Collection (
	CollectionID Int UNSIGNED NOT NULL AUTO_INCREMENT,
	CollectionName Char(20) NOT NULL,
	UserID Int UNSIGNED NOT NULL,
 Primary Key (CollectionID)) ENGINE = InnoDB charset=utf8;

Create table CollectionOfAssignements (
	CollectionID Int UNSIGNED NOT NULL,
	AssignementID Int UNSIGNED NOT NULL,
 Primary Key (CollectionID,AssignementID)) ENGINE = InnoDB charset=utf8;

Create table ChossingAnAssignement (
	UserID Int UNSIGNED NOT NULL,
	AssignementID Int UNSIGNED NOT NULL,
	DateTime Datetime,
	Confirmed Int NOT NULL DEFAULT 0,
 Primary Key (UserID,AssignementID)) ENGINE = InnoDB charset=utf8;



Alter table Collection add Foreign Key (UserID) references Users (UserID) on delete  restrict on update  restrict;
Alter table ChossingAnAssignement add Foreign Key (UserID) references Users (UserID) on delete  restrict on update  restrict;
Alter table Users add Foreign Key (StatusID) references Status (StatusID) on delete  restrict on update  restrict;
Alter table CollectionOfAssignements add Foreign Key (AssignementID) references Assignements (AssignementID) on delete  restrict on update  restrict;
Alter table ChossingAnAssignement add Foreign Key (AssignementID) references Assignements (AssignementID) on delete  restrict on update  restrict;
Alter table CollectionOfAssignements add Foreign Key (CollectionID) references Collection (CollectionID) on delete  restrict on update  restrict;

INSERT INTO Status VALUES(NULL,"Upravitelj");
INSERT INTO Status VALUES(NULL,"Učitelj");
INSERT INTO Status VALUES(NULL,"Kandidat");

INSERT INTO Users VALUES(NULL,1,"admin","d033e22ae348aeb5660fc2140aec35850c4da997","Janko","Novak","0101996500123",1);