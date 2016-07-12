drop table inventory;
drop table users;

create table users(
userID int(6),
username varchar(15),
passwd varchar(20),
stats int(1),
primary key(userID)
);

create table inventory(
itemID int(4) auto_increment not null,
item varchar(20),
modelNumber varchar(40),
quantity int(4),
stockDate date,
primary key (itemID)
);
