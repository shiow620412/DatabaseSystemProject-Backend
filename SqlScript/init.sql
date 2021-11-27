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

 Date: 26/11/2021 22:39:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CreditCard
-- ----------------------------
DROP TABLE IF EXISTS `CreditCard`;
CREATE TABLE `CreditCard`  (
  `CreditCardNumber` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `MemberID` int(0) NOT NULL,
  `ExpireYear` int(0) NOT NULL,
  `ExpireMonth` int(0) NOT NULL,
  `SecurityCode` int(0) NOT NULL,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  CONSTRAINT `creditcard_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of CreditCard
-- ----------------------------

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
  `IsAdmin` int(0) NOT NULL,
  PRIMARY KEY (`MemberID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of Member
-- ----------------------------
INSERT INTO `Member` VALUES (1, 'admin@test.com', 'administrator', 'admin', 'staff', NULL, 1);

-- ----------------------------
-- Table structure for OrderStatus
-- ----------------------------
DROP TABLE IF EXISTS `OrderStatus`;
CREATE TABLE `OrderStatus`  (
  `OrderStatusID` int(0) NOT NULL,
  `StatusType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`OrderStatusID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of OrderStatus
-- ----------------------------

-- ----------------------------
-- Table structure for Payment
-- ----------------------------
DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment`  (
  `PaymentID` int(0) NOT NULL,
  `PaymentType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`PaymentID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of Payment
-- ----------------------------

-- ----------------------------
-- Table structure for Product
-- ----------------------------
DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product`  (
  `ProductID` int(0) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` int(0) NOT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Introduce` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `Sales` int(0) NOT NULL DEFAULT 0,
  `Type` int(0) NOT NULL,
  `Stock` int(0) NOT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  INDEX `Type`(`Type`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `Type` (`TypeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of Product
-- ----------------------------

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of ShoppingCart
-- ----------------------------

-- ----------------------------
-- Table structure for TransactionList
-- ----------------------------
DROP TABLE IF EXISTS `TransactionList`;
CREATE TABLE `TransactionList`  (
  `TransactionID` int(0) NOT NULL,
  `ProductID` int(0) NOT NULL,
  `Quantity` int(0) NOT NULL,
  `Price` int(0) NOT NULL,
  INDEX `TransactionID`(`TransactionID`) USING BTREE,
  INDEX `ProductID`(`ProductID`) USING BTREE,
  CONSTRAINT `transactionlist_ibfk_1` FOREIGN KEY (`TransactionID`) REFERENCES `TransactionRecord` (`TransactionID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionlist_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of TransactionList
-- ----------------------------

-- ----------------------------
-- Table structure for TransactionRecord
-- ----------------------------
DROP TABLE IF EXISTS `TransactionRecord`;
CREATE TABLE `TransactionRecord`  (
  `TransactionID` int(0) NOT NULL,
  `MemberID` int(0) NOT NULL,
  `Time` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `Total` int(0) NOT NULL,
  `OrderStatus` int(0) NOT NULL,
  `PaymentMethod` int(0) NOT NULL,
  PRIMARY KEY (`TransactionID`) USING BTREE,
  INDEX `MemberID`(`MemberID`) USING BTREE,
  INDEX `PaymentMethod`(`PaymentMethod`) USING BTREE,
  INDEX `transactionrecord_ibfk_2`(`OrderStatus`) USING BTREE,
  CONSTRAINT `transactionrecord_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionrecord_ibfk_2` FOREIGN KEY (`OrderStatus`) REFERENCES `OrderStatus` (`OrderStatusID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `transactionrecord_ibfk_3` FOREIGN KEY (`PaymentMethod`) REFERENCES `Payment` (`PaymentID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of TransactionRecord
-- ----------------------------

-- ----------------------------
-- Table structure for Type
-- ----------------------------
DROP TABLE IF EXISTS `Type`;
CREATE TABLE `Type`  (
  `TypeID` int(0) NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`TypeID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of Type
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
