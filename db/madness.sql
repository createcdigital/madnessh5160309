 /*========================================================= madness数据库*/

/*================================= 建立表空间及对应dba*/
 -- create user
 GRANT USAGE ON *.* TO 'madnessh5160309'@'localhost' IDENTIFIED BY 'madnessh5160309' WITH GRANT OPTION;
 -- create database
 CREATE DATABASE madnessh5160309 CHARACTER SET  utf8  COLLATE utf8_general_ci;
 -- grant user 权限1,权限2,select,insert,update,delete,create,drop,index,alter,grant,references,reload,shutdown,process,file等14个权限
 GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,LOCK TABLES ON madness.*  TO 'madnessh5160309'@'localhost' IDENTIFIED BY 'madnessh5160309';

 /*================================= 建立表、表主外键、多表关联等T-SQL*/
 -- 改变当前数据库
 USE madnessh5160309;

/*
用户表
*/
create table user (
    id INT NOT NULL auto_increment COMMENT 'ID标识',
    name VARCHAR(128) NOT NULL COMMENT '姓名',
    email VARCHAR(128) NOT NULL COMMENT '邮件',
    phone CHAR(11) NOT NULL COMMENT '电话号码',
    whoyouare VARCHAR(128) NOT NULL COMMENT '职业分类',
    lookingforshmadness VARCHAR(128) NOT NULL COMMENT '目的',
    adate VARCHAR(19) NOT NULL COMMENT '提交信息时间',
    numbers VARCHAR(20)  NULL DEFAULT '' COMMENT '支付记录码',
    openid VARCHAR(50)  NULL DEFAULT '' COMMENT 'openID',
    headimgurl VARCHAR(256) NOT NULL COMMENT '微信用户头像',
    nickname VARCHAR(256) NOT NULL COMMENT '微信用户昵称',
    paystatus BIGINT NOT NULL COMMENT '支付状态(0:待支付, 1:已支付)',
    outtradeno VARCHAR(256) COMMENT '商户订单号',
    primary key (id) -- 主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
