/*
 Navicat Premium Data Transfer

 Source Server         : karma
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : project

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 12/11/2021 08:53:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CreditCard
-- ----------------------------
DROP TABLE IF EXISTS `CreditCard`;
CREATE TABLE `CreditCard`  (
  `CreditCardNumber` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `MemberID` int NOT NULL,
  `ExpireYear` int NOT NULL,
  `ExpireMonth` int NOT NULL,
  `SecurityCode` int NOT NULL,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  CONSTRAINT `creditcard_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for Member
-- ----------------------------
DROP TABLE IF EXISTS `Member`;
CREATE TABLE `Member`  (
  `MemberID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `IsAdmin` int NOT NULL,
  PRIMARY KEY (`MemberID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for OrderStatus
-- ----------------------------
DROP TABLE IF EXISTS `OrderStatus`;
CREATE TABLE `OrderStatus`  (
  `OrderStatusID` int NOT NULL,
  `StatusType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`OrderStatusID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Payment
-- ----------------------------
DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment`  (
  `PaymentID` int NOT NULL,
  `PaymentType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`PaymentID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Product
-- ----------------------------
DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product`  (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` int NOT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Introduce` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `Sales` int NOT NULL DEFAULT 0,
  `Type` int NOT NULL,
  `Stock` int NOT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  INDEX `Type`(`Type`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `Type` (`TypeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ShoppingCart
-- ----------------------------
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart`  (
  `MemberID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for TransactionList
-- ----------------------------
DROP TABLE IF EXISTS `TransactionList`;
CREATE TABLE `TransactionList`  (
  `TransactionID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL,
  `Price` int NOT NULL,
  INDEX `TransactionID`(`TransactionID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  CONSTRAINT `transactionlist_ibfk_1` FOREIGN KEY (`TransactionID`) REFERENCES `TransactionRecord` (`TransactionID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionlist_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for TransactionRecord
-- ----------------------------
DROP TABLE IF EXISTS `TransactionRecord`;
CREATE TABLE `TransactionRecord`  (
  `TransactionID` int NOT NULL,
  `MemberID` int NOT NULL,
  `Time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Total` int NOT NULL,
  `OrderStatus` int NOT NULL,
  `PaymentMethod` int NOT NULL,
  PRIMARY KEY (`TransactionID`) USING BTREE,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  INDEX `PaymentMethod`(`PaymentMethod`) USING BTREE,
  INDEX `transactionrecord_ibfk_2`(`OrderStatus`) USING BTREE,
  CONSTRAINT `transactionrecord_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionrecord_ibfk_2` FOREIGN KEY (`OrderStatus`) REFERENCES `OrderStatus` (`OrderStatusID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionrecord_ibfk_3` FOREIGN KEY (`PaymentMethod`) REFERENCES `Payment` (`PaymentID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for Type
-- ----------------------------
DROP TABLE IF EXISTS `Type`;
CREATE TABLE `Type`  (
  `TypeID` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`TypeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
