/*
 Navicat Premium Data Transfer

 Source Server         : localhostMysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : project

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 09/11/2021 21:05:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CreditCard
-- ----------------------------
DROP TABLE IF EXISTS `CreditCard`;
CREATE TABLE `CreditCard`  (
  `MemberID` int(0) NOT NULL,
  `CreditCardNumber` varchar(19) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ExpireYear` int(0) NOT NULL,
  `ExpireMonth` int(0) NOT NULL,
  `SecurityCode` int(0) NOT NULL,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  CONSTRAINT `creditcard_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Member
-- ----------------------------
DROP TABLE IF EXISTS `Member`;
CREATE TABLE `Member`  (
  `MemberID` int(0) NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Permission` int(0) NOT NULL,
  PRIMARY KEY (`MemberID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Payment
-- ----------------------------
DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment`  (
  `ID` int(0) NOT NULL AUTO_INCREMENT,
  `PaymentType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Product
-- ----------------------------
DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product`  (
  `ProductID` int(0) NOT NULL,
  `Price` int(0) NOT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Introduce` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `Sales` int(0) NULL DEFAULT 0,
  `Type` int(0) NOT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  INDEX `Type`(`Type`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `Type` (`TypeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ShoppingCart
-- ----------------------------
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart`  (
  `MemberID` int(0) NOT NULL,
  `ProductID` int(0) NOT NULL,
  `Quantity` int(0) NOT NULL,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for TransactionList
-- ----------------------------
DROP TABLE IF EXISTS `TransactionList`;
CREATE TABLE `TransactionList`  (
  `TransactionID` int(0) NOT NULL,
  `ProductID` int(0) NOT NULL,
  `Quantity` tinyint(0) NOT NULL,
  `Price` int(0) NOT NULL,
  INDEX `TransactionID`(`TransactionID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  CONSTRAINT `transactionlist_ibfk_1` FOREIGN KEY (`TransactionID`) REFERENCES `TransactionRecord` (`TransactionID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionlist_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for TransactionRecord
-- ----------------------------
DROP TABLE IF EXISTS `TransactionRecord`;
CREATE TABLE `TransactionRecord`  (
  `TransactionID` int(0) NOT NULL,
  `MemberID` int(0) NOT NULL,
  `Date` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `Total` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `OrderStatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PaymentMethod` int(0) NOT NULL,
  PRIMARY KEY (`TransactionID`) USING BTREE,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  INDEX `PaymentMethod`(`PaymentMethod`) USING BTREE,
  CONSTRAINT `transactionrecord_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionrecord_ibfk_2` FOREIGN KEY (`PaymentMethod`) REFERENCES `Payment` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Type
-- ----------------------------
DROP TABLE IF EXISTS `Type`;
CREATE TABLE `Type`  (
  `TypeID` int(0) NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`TypeID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
