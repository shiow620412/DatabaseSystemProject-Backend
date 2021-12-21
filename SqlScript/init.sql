/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : project

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 14/12/2021 22:40:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for CreditCard
-- ----------------------------
DROP TABLE IF EXISTS `CreditCard`;
CREATE TABLE `CreditCard` (
  `CreditCardNumber` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `MemberID` int NOT NULL,
  `ExpireYear` int NOT NULL,
  `ExpireMonth` int NOT NULL,
  `SecurityCode` int NOT NULL,
  KEY `MemberID` (`MemberID`) USING BTREE,
  CONSTRAINT `creditcard_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of CreditCard
-- ----------------------------
BEGIN;
INSERT INTO `CreditCard` VALUES ('1234567890123457', 1, 2021, 12, 123);
COMMIT;

-- ----------------------------
-- Table structure for Image
-- ----------------------------
DROP TABLE IF EXISTS `Image`;
CREATE TABLE `Image`  (
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `img` longblob NULL,
  PRIMARY KEY (`filename`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of IMG
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Member
-- ----------------------------
DROP TABLE IF EXISTS `Member`;
CREATE TABLE `Member` (
  `MemberID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `isAdmin` int NOT NULL DEFAULT 0,
  `isBan` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`MemberID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of Member
-- ----------------------------
BEGIN;
INSERT INTO `Member` VALUES (1, '123', 'admin', 'admin', 'staff', '123', '123', 1, 0);
INSERT INTO `Member` VALUES (2, '123@gmail.com', '123', 'tim1207', 'tim1207', '123', NULL, 0, 1);
INSERT INTO `Member` VALUES (5, 'test123@gmail.com', 'test123', 'test123', '123', '', '', 0, 0);
COMMIT;

-- ----------------------------
-- Table structure for Order
-- ----------------------------
DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `MemberID` int NOT NULL,
  `Date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Total` int NOT NULL,
  `OrderStatus` int NOT NULL,
  `PaymentMethod` int NOT NULL,
  PRIMARY KEY (`OrderID`) USING BTREE,
  KEY `MemberID` (`MemberID`) USING BTREE,
  KEY `PaymentMethod` (`PaymentMethod`) USING BTREE,
  KEY `transactionrecord_ibfk_2` (`OrderStatus`) USING BTREE,
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`OrderStatus`) REFERENCES `OrderStatus` (`OrderStatusID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`PaymentMethod`) REFERENCES `Payment` (`PaymentID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of Order
-- ----------------------------
BEGIN;
INSERT INTO `Order` VALUES (1, 1, '2021-12-08 16:48:33', 5020, 2, 1);
INSERT INTO `Order` VALUES (2, 2, '2021-12-04 11:10:10', 50, 1, 1);
INSERT INTO `Order` VALUES (3, 2, '2021-12-04 11:10:10', 50, 1, 1);
INSERT INTO `Order` VALUES (4, 2, '2021-12-04 11:10:10', 50, 1, 1);
INSERT INTO `Order` VALUES (5, 2, '2021-12-04 11:10:10', 50, 1, 1);
INSERT INTO `Order` VALUES (6, 2, '2021-12-04 11:10:10', 50, 1, 1);
INSERT INTO `Order` VALUES (7, 1, '2021-12-14 04:08:18', 200, 2, 1);
INSERT INTO `Order` VALUES (11, 1, '2021-12-04 11:10:10', 50, 3, 1);
COMMIT;

-- ----------------------------
-- Table structure for OrderDetail
-- ----------------------------
DROP TABLE IF EXISTS `OrderDetail`;
CREATE TABLE `OrderDetail` (
  `OrderID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL,
  KEY `TransactionID` (`OrderID`) USING BTREE,
  KEY `ProductID` (`ProductID`) USING BTREE,
  CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orderdetail_ibfk_3` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of OrderDetail
-- ----------------------------
BEGIN;
INSERT INTO `OrderDetail` VALUES (1, 1, 1);
INSERT INTO `OrderDetail` VALUES (1, 2, 1);
INSERT INTO `OrderDetail` VALUES (1, 3, 1);
INSERT INTO `OrderDetail` VALUES (4, 1, 3);
INSERT INTO `OrderDetail` VALUES (4, 2, 2);
INSERT INTO `OrderDetail` VALUES (5, 1, 3);
INSERT INTO `OrderDetail` VALUES (5, 2, 2);
INSERT INTO `OrderDetail` VALUES (6, 1, 3);
INSERT INTO `OrderDetail` VALUES (6, 2, 2);
INSERT INTO `OrderDetail` VALUES (7, 4, 10);
INSERT INTO `OrderDetail` VALUES (7, 5, 10);
INSERT INTO `OrderDetail` VALUES (11, 1, 3);
INSERT INTO `OrderDetail` VALUES (11, 2, 2);
COMMIT;

-- ----------------------------
-- Table structure for OrderStatus
-- ----------------------------
DROP TABLE IF EXISTS `OrderStatus`;
CREATE TABLE `OrderStatus` (
  `OrderStatusID` int NOT NULL,
  `StatusType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`OrderStatusID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of OrderStatus
-- ----------------------------
BEGIN;
INSERT INTO `OrderStatus` VALUES (1, '交易完成');
INSERT INTO `OrderStatus` VALUES (2, '交易取消');
INSERT INTO `OrderStatus` VALUES (3, '確認中');
COMMIT;

-- ----------------------------
-- Table structure for Payment
-- ----------------------------
DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment` (
  `PaymentID` int NOT NULL,
  `PaymentType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`PaymentID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of Payment
-- ----------------------------
BEGIN;
INSERT INTO `Payment` VALUES (1, '信用卡');
INSERT INTO `Payment` VALUES (2, '貨到付款');
COMMIT;

-- ----------------------------
-- Table structure for Product
-- ----------------------------
DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` int NOT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Sales` int NOT NULL DEFAULT '0',
  `Type` int NOT NULL,
  `Stock` int NOT NULL,
  `OnShelf` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`ProductID`) USING BTREE,
  KEY `Type` (`Type`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`Type`) REFERENCES `Type` (`TypeID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of Product
-- ----------------------------
BEGIN;
INSERT INTO `Product` VALUES (1, 'banana', 10, '123', 'good to eat', 14, 1, 90, 'No');
INSERT INTO `Product` VALUES (2, 'apple', 10, '123', 'good to eat', 8, 1, 5, 'Yes');
INSERT INTO `Product` VALUES (3, 'Airpods', 5000, '123', 'good', 0, 3, 13, 'Yes');
INSERT INTO `Product` VALUES (4, '巧克力', 100, '123', 'good', 17, 2, 20, 'Yes');
INSERT INTO `Product` VALUES (5, '哇沙米脆豌豆151g', 57, '123', 'good', 10, 2, 20, 'Yes');
INSERT INTO `Product` VALUES (6, 'IPHONE 13藍256G  MLQA3TA/A 【全國電子】', 29400, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (7, '【孩之寶 hasbro】粉紅豬小妹 佩佩的遊樂場遊戲組 F24025L00', 1199, '123', 'good', 0, 1, 0, 'Yes');
INSERT INTO `Product` VALUES (8, '【獨立包裝】口罩KF94韓版氧化銅離子滅活口罩 四層含熔噴布 魚嘴柳葉折疊口罩  KF94口罩 立體口罩 10只/包', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (9, '台灣優紙 成人3D立體醫療口罩 耳繩 耳掛 (未滅菌) 立體口罩 25片盒裝 口罩 醫療口罩 醫用口罩 優紙 成人口罩', 150, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (10, '衛龍辣條 魔芋爽 4元 親嘴燒 3元 小麵筋 魔芋爽盒裝 大麵筋 魔芋爽批發 風吃海帶 小辣棒 大辣棒 卫龙 辣条 零食', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (11, 'adidas ULTRABOOST 21 TOKYO 跑鞋 男 S23863', 4159, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (12, '衛龍魔芋爽 風吃海帶 親嘴燒 麵筋【手機批發網】 《現貨 多種口味 快速出貨》熱賣爆款 零食 零嘴', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (13, 'IG高品質台灣粉 ig台灣粉 終身保固IG粉絲 Instagram粉絲 華人粉 全球粉  真人粉 IG粉 IG粉絲', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (14, '斐然 長夾男 手拿包 手包 男款錢包 錢包男男式長款錢包真皮錢夾簡約薄款票夾多卡位卡包手拿包', 122, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (15, '吊帶交叉假兩件式上衣【3010】秋冬新款韓系INS氣質露肩上衣 針織上衣 針織衫 縮腰上衣 女生上衣 PAPi', 198, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (16, '【可信用卡】陸版抖音 20000抖幣 直播 Tik Tok 抖音幣充值 儲值 代儲 代儲教學 咨詢 全網最低價 大陸抖音', 9240, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (17, '馬桶小花清香廁所除臭香薰凝膠潔廁靈 馬桶清潔劑 衛生間空氣清新劑 馬桶小花 馬桶香薰凝膠 馬桶潔廁靈', 19, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (18, 'ScottyBear™️那隻熊 Z04008 新款襪子女中筒 ins潮 棉白色夏季可愛日系黑色字母長襪', 39, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (19, '【OOTD批發】女生秋冬外套 韓版復古chic燈芯絨外套長袖秋季 簡約純色高領內搭上衣 2020寬鬆襯衫 女生衣著', 168, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (20, '台灣24H出貨【送-絕美香氛蠟燭】融蠟燈 蠟燭暖燈 蠟燭燈 融燭燈 香氛燈 香氛蠟燭燈 暖燈 熔蠟燈 聖誕禮物 交換禮物', 679, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (21, '小林製藥 小白兔暖暖包 10片/包 (手握式 24小時持續恆溫) 專品藥局 【2004134】', 149, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (22, '日本mdc左旋肉鹼小綠袋纖體丸 48回增量版  減重產品 減脂瘦身 窈窕 產後暴腫 經期暴食 飽腹 抑制食欲', 420, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (23, 'DayDay少女｜🔥兩面穿~韓國學院系加絨加厚羊羔毛絨棉服 冬季厚實保暖連帽外套 女生外套 飛行外套 加厚外套 學生外套', 598, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (24, '【男款 現貨即出】發熱衣 保暖衣 長袖 輕薄發熱衣 透氣保暖衣 輕摩毛發熱衣 暖暖衣 男內搭 內搭衣 內搭保暖衣 衛生衣', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (25, '休閒時尚套裝女春秋長袖襯衫外穿韓系Chic疊穿針織馬甲背心兩件套', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (26, '【買到戀愛】歐逆款大V落肩麻花背心 針織馬甲 麻花背心【M252】', 285, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (27, 'Solone 專屬訂製刷具 奶油香檳系列 (Hello Kitty限定版) 多款可選【官方旗艦館】', 118, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (28, '【台灣現貨×免運費×附發票】（４片入）無框組合穿衣鏡 臥室防爆全身鏡 宿舍 浴室 客廳 拼接化妝鏡', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (29, '【DIFF】自定款經典基本款男女素色內刷毛大學t 長袖t恤 長袖上衣 女裝 衣服 情侶裝 素t 長T 刷毛T【W21】', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (30, '米家掃拖機器人 1C【小米官方旗艦店】', 6995, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (31, '🇹🇭龍婆絕🇹🇭佛曆2556年製作，椰殼雙峰拉胡， 保證手工佛牌真品，含包殼，非紀念品', 4800, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (32, 'INK速乾按壓復古中性筆 (0.5mm) 中性筆 莫蘭迪 水性筆 手帳筆 共20色【RC3945】《Jami》', 18, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (33, '海底撈 【自煮火鍋（麻辣嫩牛/番茄牛肉）】', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (34, 'Ferra 品牌同工廠 男女三合一衝鋒衣 大碼 防風防水登山服 珊瑚絨可拆內膽 滑雪服 登山服 機能外套釣魚服 休閒外套', 999, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (35, 'AirPods Pro (搭配 MagSafe 充電盒)  MLWK3TA/A 【全國電子】聖誕禮物', 6185, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (36, '康寶濃湯 壹包 四人份【蝦皮團購】', 33, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (37, '韓版kf94 魚型口罩 四層含熔噴布  魚嘴柳葉折疊口罩 四層口罩 KF94口罩 立體口罩 韓國口罩10只/包 批發零售', 2, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (38, '【轉角】免運休閒百搭ins日系機能工裝包男斜挎包潮牌大容量單肩包運動背包潮男生包包', 169, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (39, '【興華國際】『莫藍迪色 聖誕節 CHRISTMAS 醫用口罩』《醫療雙鋼印 現貨供應》', 109, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (40, '【免運費】韓國 不倒翁 全系列 起司 辣起司 拉麵 泡麵 Q麵 泡菜 烏龍麵 金拉麵', 29, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (41, '【免運費】日清 杯麵 泡麵 NISSIN CUP 奶油 海鮮 冬粉 速食杯麵', 22, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (42, 'adidas ULTRABOOST DNA 跑鞋 男 GZ3292', 4159, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (43, '❙送禮首選❙ 55度恆溫 暖暖杯墊 恆溫暖杯墊 智能斷電 重力感應 加熱杯墊 恆溫杯墊 保溫杯墊 禮物', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (44, '大唐襪業 D309中筒襪子ins潮全棉歐美街頭韓版ulzzang純色字母嘻哈堆堆襪子', 18, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (45, '現貨!!2021最新款日本P&G 3D洗衣球 洗衣膠球 46入袋裝', 105, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (46, '台灣現貨 暖宮 收腹絲襪 保暖 超自然 美腿絲襪 光腿神器 美腿神器保暖 打底褲襪 透膚 絲襪 褲襪 刷毛 粉底', 148, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (47, '12/7出貨 日本 P&G 3D 洗衣球 ARIEL BALL 洗衣膠球 袋裝', 245, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (48, '女生毛衣  高領毛衣  長袖針織 針織毛衣 秋冬新款高領毛衣打底女合身加厚針織衫秋冬新款素色套頭短版學生上衣', 97, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (49, '【秉醇烘焙坊】自選口味 手工餅乾 多種口味自行搭配 伴手禮 綜合曲奇 手作餅乾 節慶 婚禮 喜餅 生日 台南甜點 夾鏈袋', 4, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (50, '附發票✔️熱銷C/P值爆表包邊一片式 冰絲無痕女內褲 純棉大尺碼性感超涼感絲質12色年中慶狂歡榜單', 17, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (51, '【華燈市】布爾加斯(800mm)LED水晶吸頂燈(LED105w/全電壓/遙控三段色溫) 0501439 燈飾燈具', 26800, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (52, '羊毛直桶漁夫帽 漁夫帽 直桶漁夫帽 漁夫帽 羊毛漁夫帽 秋冬漁夫帽 #101092', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (53, '台灣製 床包 單人 雙人 加大 特大 床包組 床單 被套/四件組/3M/素色/三件組/保潔墊/兩用被/天絲/舒柔棉/純棉', 230, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (54, '針織上衣 高領毛衣 針織打底衫 柔軟親膚面料高領毛衣針織打底衫女秋冬季內搭長袖修身顯瘦上衣新', 156, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (55, '現貨美國製造 防狼噴霧60ml、110ml（射程3-5米、辣度300萬）防身 防狼噴辣椒水 鎮暴型防狼噴霧器 防狼噴霧劑', 69, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (56, '梨卡-【超柔款親膚】純色長袖針織衫-早秋秋冬性感顯瘦V領打底緊身休閒純色針織衫內搭T恤長袖上衣BR398【現貨24H】', 157, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (57, '【DIFF】韓版復古色系寬鬆長袖上衣 衣服 女裝 顯瘦上衣 寬鬆上衣 百搭素色 必備款 長袖T恤 素T 大學T【W66】', 79, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (58, '🔥現貨秒出🔥久富餘KF94魚型醫療口罩 4D立體口罩 醫療口罩 韓版口罩 四層口罩 防花妝韓國藝人口罩現貨 台灣製 ★', 45, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (59, '直覺 sweet touch職業洗髮精 2000ml 限時特賣專用 1入【小三美日】D440013-1', 590, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (60, 'Anyshop 韓國襪 ETNA經典素色襪 素襪 中筒襪 長襪 素色長襪 素襪 00101 韓襪 韓國襪子 中筒襪 襪子', 35, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (61, '✨Lilian✨ into you 唇泥口紅唇釉 心慕女主角唇頰泥唇釉腮紅二合壹', 192, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (62, '【如意 齋零 嘴屋】衛龍辣條系列魔芋爽素毛肚風吃海帶親嘴燒親嘴豆皮 面筋小辣棒大辣棒零嘴零食  金針菇蒟蒻 素蝦仁 奶條', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (63, '韓國 orion 好麗友 預感香烤洋芋片 12入 超值量販包 原味/起司/洋蔥 非油炸烘烤 現貨 蝦皮直送', 109, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (64, '🔥拚全台最低價🔥 高彈力麵包拖鞋 厚底拖鞋 增高拖鞋 防水 止滑 厚底 柔軟 耐磨 室內拖鞋  居家拖鞋 EVA輕量拖', 69, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (65, '魔芋爽盒裝 大包 魔芋爽 3元 魔芋爽小龍蝦 4元 素毛肚 魔芋爽批發 18g 現貨 風吃海帶 盒裝 衛龍 辣條 親嘴燒', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (66, 'APPLE iPhone 13 128G 新機預購 送門市現場保貼服務兌換券 神腦生活', 25900, '123', 'good', 0, 2, 10, 'Yes');
INSERT INTO `Product` VALUES (67, 'MYUMYU★大減價虧本賣50%off 清倉、樣品、瑕疵、孤品、色差  居家飾品抱枕小桌子特價商品碗盤杯子小置物架', 60, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (68, 'ONE DAY 台灣製 260 素色大學T 男生長袖T恤 大學T恤 刷毛T 大學T', 220, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (69, 'QUEENSHOP_ F  基本圓領寬鬆百搭素面大學T 五色售    現+預【01110580】', 470, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (70, '限時特賣只有今天 台灣熱銷 男生 羽絨棉 背心 (有加大尺碼 秋裝 保暖 棉服 馬甲 無袖 男生外套 情侶 運動 鋪棉', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (71, '【DIFF】韓版簡約氣質百搭設計感小眾長袖上衣 女裝 衣服 寬鬆上衣 顯瘦上衣 素色 冬裝 長袖t恤 素T【W201】', 169, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (72, '下單2日送達 AirPods Pro3代 無線藍牙耳機 全新未拆封 AirPods無線耳機 贈保護套', 490, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (73, '“11/30更”反應熱烈二手衣🔥狀況好又便宜快來挖寶🧏🏻‍♀️', 50, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (74, '【現貨】寵物毛毯 狗狗毯子 保暖寵物毛毯 冷氣房狗狗小毯子 珊瑚絨寵物小被子 寵物毯 寵物被子 寵物窩 貓窩 狗窩', 49, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (75, '🔥黑調🔥 現貨速發 50條裝 漸變色 無接縫 髮繩 彩色髮圈 高彈力 頭繩 糖果色 皮筋 髮飾 髮圈', 25, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (76, '台灣公司貨🔥開箱影片 SPC木紋地板貼 木紋地板 地板貼 塑膠地板 PVC地板 地墊 拼接地板 自黏地板 地板 免膠地板', 18, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (77, '杜蕾斯 保險套 飆風碼 持久衛生套 air輕薄幻隱裝/潤滑裝 超薄裝 更薄型 凸點裝 綜合裝 活力裝 激情裝 衛生套', 79, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (78, '【買到戀愛】多色氣質外搭麻花背心 馬甲 針織背心 外搭背心【M6183】', 149, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (79, '立領坑條針織上衣【C-8A85】秋冬新款韓系針織長袖上衣 針織衫 坑條上衣 貼身上衣 打底上衣 女生上衣 PAPi', 149, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (80, '優選新品 汽車越野脫困板雪地泥地沙地自救防滑高強度尼龍脫困板自駕裝備qrz3cfs', 7206, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (81, '2021牛仔褲女小腳鉛筆褲彈力高腰翹臀顯瘦韓版百搭緊身學生褲子女現貨 限時下殺', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (82, '💎快手直播 快幣 快手幣 快手視頻 快手APP 官方充值 儲值 充值 代充 諮詢 教學💎', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (83, '立領坑條針織上衣  早秋新品 保暖穿搭 內搭 打底衣 針織 薄長袖發熱衣 百搭上衣 毛衣 秋冬必備 高領長袖 禦寒 防寒', 98, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (84, '【買一送一，開發票】AirPods pro 保護套123代(系列一) 韓國藍牙耳機套蘋果耳機殼保護殼 批發 生日禮物', 58, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (85, '滿1200元宅配免運【台灣現貨】✴日式防塵抽屜收納箱✴ 收納箱 抽屜收納箱 化妝品收納 衣物收納  整理箱 辦', 58, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (86, '『現貨599免運』 眼線筆 眼線液 眼線 眼線液筆 彩色眼線筆 彩色眼線液筆 抖音彩色眼線筆 彩色眼線 城市記憶眼線筆', 39, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (87, '百搭流行多款潮襪 流行襪 短襪 襪子 腳踝襪 少女襪 可愛襪 糖果 棉襪 船襪 薄款 韓版 秋冬 學院 潮流 耐穿', 7, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (88, '【台灣現貨】 減重 一月20 男女通用產品 瘦 身 瘦腿 參考評價  窈窕 無感期 減重 瘦身 好評如潮', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (89, 'LITTLE ONDINE 小奧汀 大衛盤 雕塑盤 雕塑家 打亮高光修容盤 提亮 鼻影 陰影 一體盤', 980, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (90, '防窺透明滿版鋼化膜 防窺保護貼適用於 Phone11 Pro Max XR XS X iPhone 7/8 Plus', 59, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (91, '韓國KF94 口罩 氧化銅離子滅活口一次性4D立體魚嘴型殺菌透氣時尚防塵 印花口罩 彩色口罩 韓版口罩 立體口罩', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (92, 'KORG MINILOGUE XD 類比複音合成器 總代理公司貨', 20000, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (93, '【優質下殺】綿羊絨短版針織上衣 chic短款格子毛衣 初秋長袖外穿針織外套', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (94, '🔥2021秋冬新色現貨‧ 綠野X仙蹤X莓果X英式奶茶色口罩🔥凱馺國際 MIT醫療級雙鋼印 成人滿版醫用 (30入/盒)', 149, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (95, '岡本 保險套 002 002大尺碼/003系列/City/威猛持久/skinless skin 輕薄系列 001 衛生套', 49, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (96, '台灣出貨 原廠正品 PHILIPS 飛利浦鑽石靚白音波震動牙刷 HX9312 (潔白玫瑰金)', 4692, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (97, '台灣現貨 日本製 🐰 小白兔 桐灰 握式 貼式 暖暖包 10h 14h 12h 24h 保暖貼 暖冬必備 10入 30入', 139, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (98, '卡滋 桶裝爆米花 草莓戀乳/巧達起司甜/美式焦糖牛奶/美式特濃巧克力/珍珠奶茶(蘑菇球) 蝦皮直送  (部分即期)', 82, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (99, '台灣出貨 110ml德國NATO 鎮暴型防狼噴霧器 防身 防狼噴辣椒水 防身噴霧劑 氣霧型隨身攜帶防色狼', 69, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (100, '睿昱 郡昱 成人平面醫療口罩-莫蘭迪色(50入/盒)', 129, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (101, '桌上型書架【小麥購物】24H出貨台灣現貨【C334】H型 桌面收納 可變形 伸縮書架 收納書架 層架 組裝式書櫃 桌上型', 149, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (102, '【CHING\'S獨家】超顯瘦彈性極佳中高腰黑褲 長褲 S-2XL 黑釦真拉鍊前後口袋 黑褲 女裝 褲子', 299, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (103, 'LED感應燈 人體感應燈 紅外線感應燈 櫥櫃燈  磁吸設計 超長續行', 69, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (104, '高爆率 手機 盲盒 13 pro max 筆電 福袋 平板 生日禮物 福利品 手錶 藍芽耳機 耳機 充電線 充電器', 100, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (105, '台灣現貨 日韓美肌褲襪 絨毛柔膚褲襪 褲襪 打底 打底神器 打底褲 光腿神器 美腿神器 膚色襪 緊身褲 內搭褲 保暖褲', 95, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (106, '（火速出貨）台灣製 郡昱莫蘭迪口罩 奶茶色口罩 網紅最愛配色❤️ 快速出貨親子款口罩 莫蘭迪系列/網美最愛', 101, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (107, '刷毛連帽印花大學T 情侶裝流行刷毛款男潮版港風寬鬆版 帽T 大學T 印花T 長T（SKS963）【壹號站】', 198, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (108, '【現貨免運】韓國襪子 基本款素色襪 快速出貨 正韓少女襪 男襪 中筒襪長襪 韓襪韓國襪船型襪短襪棉襪 韓妞必備 哈囉喬伊', 35, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (109, '【贈品賣場】THE LOEL 維他命C蓮蓬頭濾芯單入裝', 32900, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (110, '【官方正品】✨爆款洗面乳 茵刷頭 洗面乳120mL✨控油 除螨 清潔 氨基酸洗面乳 溫和不刺激 不緊繃', 78, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (111, '【DIFF】韓版彈性修身高領保暖素色針織上衣 長袖上衣 衣服 毛衣 針織毛衣 高領上衣 保暖上衣內搭 打底衣【W142】', 119, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (112, '魔芋爽 4元 衛龍辣條【買10送1】大麵筋 小麵筋 大辣棒 親嘴燒 素毛肚脆辣海帶 火藥辣條 親嘴豆皮', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (113, '滿額免運◼台灣🇹🇼現貨◼簡約化妝品收納盒 透明抽屜式桌面收納盒 飾品盒 彩妝盒 保養品收納 化妝盒 收納櫃【樂晨居家】', 89, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (114, '李子柒螺絲粉 酸辣粉 螺螄粉 黃色經典款 （20包送一包）', 18, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (115, '情趣69天堂 24H出貨 清香口香 口含片 口含 韓國口含片 口溶膜 口溶片 延時持久 情趣 瑪卡 成人專區 持久', 115, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (116, '【現貨+預購/送圍巾】MUAHMUAH 新款 刷毛帽T 帽T 大學T 韓國代購 連帽 寬鬆 情侶款 正韓', 699, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (117, '6雙免運 襪子NIKE(耐吉)耐克 四季款長襪 短襪 運動襪/籃球襪/中筒襪/高筒襪/白襪/襪子男/襪子/女學生襪', 78, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (118, '包心紗立領針織衫【A-1210】秋冬新款韓妞必備大奶性感貼身半高領上衣 坑條針織上衣 長袖上衣 女生衣著 PAPi批發價', 128, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (119, '蘇伯湯包 速食湯包 即時湯 即食湯 沖泡湯 火鍋湯底 湯品 方便湯 即沖 紫菜蛋花湯 酸辣湯 宵夜早餐輕食 即時濃湯', 6, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (120, '台灣製 床包/單人/雙人/加大/特大/床包組/被套/四件組/床單/棉被/素色床包/床包組/保潔墊/', 160, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (121, '🔥台灣現貨免運🔥韓系中筒襪 小熊襪 中筒襪 長襪 棉襪 足球襪 愛心 韓版 吸汗 中筒 日系 潮流 耐穿', 9, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (122, '【買到戀愛】文青ins純色V領外搭背心 馬甲 針織背心【M8121】', 139, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (123, '【孩之寶 hasbro】Marvel漫威復仇者聯盟傳奇 奈米無限手套(鋼鐵人)  F0196', 3600, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (124, '現貨+預購 去年熱賣一萬件打底衣🔥', 250, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (125, 'QIAO 韓國新貨 13色 純棉 薄長T 落肩 寬鬆 素色 OVERSIZE 長袖 素面 長Tee 單穿 內搭 薄長袖', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (126, '快速發貨 韓版KF94 不脫妝 28色 韓版口罩 立體口罩 網紅韓國KF94口罩防飛沫春夏季 3d口罩 四層防護 立體', 16, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (127, '現貨台灣製醫療 韓版KF94  醫療口罩 淨新口罩 醫用口罩 淨新醫療口罩 立體口罩 4D口罩 船型口罩 魚型口罩', 2, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (128, '海底撈 【多種口味湯底】 四川麻辣火鍋 海底撈火鍋湯底【滿額免運快速到貨】', 150, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (129, '丹尼船長| 米米花綜合賣場| | 【米米花｜米的爆米花｜零食】', 140, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (130, '長版寬鬆印花棉T恤女 上衣可愛卡通大學T 女生長袖t恤 長t 大學T 女生衣著 上衣 長袖 衣服 帽t', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (131, '新款適用AirPods保護套 AirPods Pro AirPods1/2保護套 inpods12 i12藍芽耳機保護殼', 29, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (132, '🌈小仙女專用🍓小氣泡美容儀器水氧冰熱吸黑頭神器電動吸去毛孔清潔器粉刺吸出器 美容儀  毛孔清潔 吸黑頭 臉部潔面', 5057, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (133, '【嘴甜甜】 甜甜超值零食組合箱 分享組合 一次滿足', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (134, '四季可穿休閒褲子爆款黑色修身小腳褲青年韓版百搭大尺碼運動縮口褲束口褲 M-5XL 正韓長褲 男生衣著', 78, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (135, '【買到戀愛】實拍 寬鬆V領開岔素色外搭背心 馬甲 針織背心 寬鬆背心 針織上衣【M0888】', 288, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (136, '【聊聊享優惠】【BRITA】mypure R10 雙RO無桶直輸淨水系統 無桶式 直出機', 19999, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (137, '毛線帽子女秋冬韓版潮網紅保暖針織帽韓國時尚日系純色顯臉小冬天', 90, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (138, '海底撈 【酸辣牛肉冬粉/番茄牛肉冬粉】 即沖即食 懶人必備', 95, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (139, '魔芋爽 4元 零食 衛龍辣條【買十送一】小辣棒 親嘴燒 大麵筋 大辣棒 小麵筋 素毛肚 素蝦仁 蟹柳 脆辣海帶 親嘴豆皮', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (140, 'PS中壢  【台灣區經銷】 MUAHMUAH （多款式）連帽T恤 帽T 長袖帽T 大學踢 內刷毛 【 MUAH 】現+預', 430, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (141, '藍底飄花翡翠手鐲玉鐲大手圍 Q-94', 16000, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (142, '【台灣現貨 24H發貨】香香豆 蘭諾衣物芳香豆 芳香豆 HAPPINESS 系列', 159, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (143, '🥀旺斯女孩🥀歐美寬鬆小字母長tee 長袖上衣女生 長袖T恤 秋冬打底上衣 台灣現貨', 149, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (144, '【搬運工2021最新色現貨】霧感唇釉 Rom&nd  霧面唇釉 韓國 唇釉 唇彩 口紅 唇膏 唇釉 奶茶', 169, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (145, '珊瑚絨毛巾浴巾組 買大送小  現貨 蝦皮直送', 169, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (146, '蝦皮最便宜🔥現貨 秋冬🍂針織背心 V領背心 針織毛衣背心 寬鬆針織衫 女生 包芯紗 無袖背心 馬甲 文青 校園穿搭', 230, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (147, '小新樂器館 | Rode 麥克風 NT1-A 錄音室級 大震膜 麥克風 附避震架 防噴罩 台灣公司貨', 7400, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (148, '休閒褲 S-5XL 素色休閑褲子 大尺碼休閑褲子 港風韓版九分褲 收口闊腿束腳褲 寬松潮流哈倫褲 男裝 男生衣著', 76, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (149, '【釩泰】莫藍迪色系 奶茶色口罩 台製醫療口罩 時尚配色 30入（盒）（MD雙鋼印）粉霧色系 特殊色口罩 玫瑰色 哈密瓜色', 125, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (150, '台灣現貨 純色 收納盒 日式收納盒 附蓋 收納箱 可疊加 收納盒 收納籃 收納 居家生活 玩具收納 置物盒 ⭐星星小舖⭐', 23, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (151, '女生帽t 冬季新款 連帽加絨衛衣女 加厚寬鬆上衣 字母印花衛衣 套頭連帽衛衣 百搭字母印花衛衣 閨蜜裝 團體服', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (152, '優加 黑色休閒格子褲長褲女 女生長褲 韓版 格紋褲 寬鬆褲子 高腰格子長褲 休閑百搭', 150, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (153, 'Amma Garden 艾瑪花園 植物系列洗髮精750ml 蝦皮直送', 275, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (154, '🔥12H快速出貨🔥電熱毯 暖身毯 保暖毯 加熱墊【居家家】熱敷墊 發熱毯 毛毯 安全斷電保護 單人/雙人電熱毯 省電恆溫', 70, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (155, '【現貨不用等】送特典 NS Switch 寶可夢 晶燦 鑽石 or 明亮珍珠 中文版 重製版 珍珠 鑽石 珍鑽 蛋', 1380, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (156, '台灣出貨🔥 輕便大容量多功能腰包 休閒胸包 側背包 旅行斜背包 運動腰包 單肩包 男生腰包', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (157, '❤️高品質襪螺紋口中筒棉襪❤️棉襪 堆堆襪 中筒襪 女中筒襪 秋冬', 29, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (158, '韓國 Naebro 銳寶 寶寶米餅 米糕爆米花 糙米棒 蔬菜圈 糙米圈圈 米菓 米棒 嬰兒餅乾 副食品 0359', 79, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (159, '蝦餅 月亮蝦餅~ 附酱包 ~ 240g/包~冷凍全家超商🈵️799元免運費~', 98, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (160, '[鮮一杯] 無咖啡因南非國寶茶(50包/盒)', 209, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (161, '滿1200宅配免運【三開門/上蓋+雙開門】✴ 雙開門折疊收納箱  ✴  收納箱  三開門  掀翻  透明 雙開門', 242, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (162, '【興華國際】 『獨家款 莫蘭迪色口罩 』《醫療雙鋼印 現貨》', 89, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (163, '衛龍魔芋爽 零食 零嘴 辣條 親嘴燒 素毛肚 風吃海帶 下飯菜 好味屋 挑吃兔 羅卜 藕片 魚豆腐 素蝦仁 休闲零食', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (164, 'leon 很仙的V領寬鬆毛衣 韓版針織毛綫衫 套頭毛衣 溫柔針織衫 秋冬毛衣外套', 276, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (165, '小米手錶 超值版【小米官方旗艦店】', 1595, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (166, '韓系加絨加厚連帽衛衣 帽t 寬鬆大學t 美式潮牌長袖帽t 慵懶風ins長袖上衣 休閒oversize上衣 字母印花帽t', 180, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (167, '原子筆 子彈頭 中性 子彈型 針管型 油性筆 藍筆 圓珠筆 5mm 辦公用品 學生', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (168, 'UAG iPad Pro 12.9吋(2021)耐衝擊保護殼 美國軍規 防摔殼 平板殼 保護套 防滑 輕量化 [現貨]', 2880, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (169, '保暖棉被 冬天保暖首選 加厚 加大 荳荳毯 暖暖被 保暖 舒適 超親柔 蓬鬆回彈 安撫 水晶絨安撫荳荳毯被 拆台灣製', 699, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (170, '【HanVo】包色款復古單針素色中筒襪 百搭韓妞大地色堆堆襪 韓版素面長襪純色襪 韓系韓國襪子女生配件 6047', 26, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (171, '【OOTD批發】偏小拍大一碼 早秋韓版女生薄款長袖衛衣 純色簡約字母復古薄款長袖衛衣寬鬆韓版 女生秋季長袖上衣', 158, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (172, '2021秋冬日系燕麥外套黑色羊毛呢大衣連帽開衫上衣外套毛呢', 360, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (173, '【一件免運】銷售4.6萬件 台灣現貨秒出 支持台灣製刷毛大學T  情侶款高磅 沒比G牌好給你退  IFOA【30042】', 189, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (174, '【DIFF】韓版小眾氣質西裝領百搭潮襯衫 長袖上衣 女裝 衣服 顯瘦上衣 素色 冬裝 長袖t恤 素T【W179】', 219, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (175, '大碼女裝胖妹妹秋冬新款套裝女針織馬甲洋氣遮肚顯瘦牛仔褲三件套', 179, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (176, '【韓國同款】成人韓版3D立體口罩 防護口罩 防飛沫 KF94 白色口罩 面罩 防花妝 韓國口罩 網紅口罩 顯臉小', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (177, '【DIFF】韓版復古淺藍高腰直筒牛仔寬褲 拖地褲 牛仔褲 牛仔長褲 褲子 女裝 長褲 闊腿褲 老爹褲 落地褲【P97】', 219, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (178, '🇹🇼【現貨24H出貨】兔耳朵包裝袋/萬聖節禮物包裝袋/聖誕禮物包裝袋/生日禮物/包裝袋/禮物袋/交換禮物/婚禮小物', 2, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (179, '💗免運 AS 彩色瓶 60色 單瓶販售 光撩膠 甲油膠 美甲凝膠 貓眼膠 光撩指甲油 指甲油 JoysLu', 45, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (180, '【樂扣樂扣】我的溫感手提咖啡杯一般款540ML/升級款550ML(無手提)', 549, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (181, 'Onedays✨熱銷素色長袖圓領大學T 純棉加絨刷毛情侶衣素T❤️冬天T恤大學百搭寬鬆上衣發熱衣🎀閨密韓妞必備C651', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (182, '【可信用卡】陸版抖音 30000抖幣 直播 Tik Tok 抖音幣充值 儲值 代儲 代儲教學 咨詢 全網最低價 大陸抖音', 13860, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (183, '【DIFF】韓版復古寬鬆直筒高腰牛仔褲 寬褲 褲子 長褲 休閒褲 女裝 工裝褲 女裝 黑褲【P102】', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (184, '連帽衛衣 大學T韓系加絨原宿BF風學生寬鬆長袖上衣女生帽T春秋薄款連帽衛衣女韓版ins寬鬆套頭慵懶', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (185, '@TT旗艦店 刷毛帽t 連帽衛衣 男生帽T 大學T  月球衣服 休閒寬鬆百搭上衣帥氣潮牌宇航員體恤衫韓版五分袖(306)', 145, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (186, '蘋果apple watch 4錶帶1/2/3手錶錶帶女金屬42mm/38 7代 iwatch4錶帶', 249, '123', 'good', 0, 2, 10, 'Yes');
INSERT INTO `Product` VALUES (187, 'APPLE iPhone 13 Pro 128G 新機預購 送門市現場保貼服務兌換券 神腦生活', 32900, '123', 'good', 0, 2, 10, 'Yes');
INSERT INTO `Product` VALUES (188, '25款 小米手環 5 4 3 錶帶 印花卡通矽膠腕帶 親膚防水 小米手環NFC版 適用小米手環3 小米手環4 小米手環5', 39, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (189, '💓 凱馺💓 全彩成人醫用口罩💓MD鋼印💓台灣製【好鄰居藥局】', 109, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (190, '【高級質感】莫蘭迪色 韓版KF94  漸層魚型口罩 3D立體口罩 四層漸變口罩成人口罩 彩色口罩 印花口罩 魚嘴口罩', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (191, '日本大和防蟎抗菌 羽絲絨被  羊毛被 棉被 (單人/標準雙人)床包 防水保潔墊被套 #輕薄#被胎 #輕量#保暖', 549, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (192, '【最新2021 M1可用 】Adobe全套 設計軟體 特效插件 ps pr ai LR Ae PDF編輯器 現貨秒發', 68, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (193, '【買到戀愛】兩色美式印花圓領大學T 【FM3097】', 169, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (194, '聖誕髮飾鹿角發箍仙女森系超仙聖誕發卡少女可愛小鹿耳朵頭箍裝扮髮飾', 7, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (195, '【盛籐 天心】★莫蘭迪★乾燥色★漸層★多款★熱門★台灣製★成人口罩★醫療口罩★盛藤', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (196, '手錶保護殼 適用於Apple Watch 7代 4 5 6 SE 蘋果手錶PC硬殼+滿版保護貼 41m 44mm 45m', 77, '123', 'good', 0, 2, 10, 'Yes');
INSERT INTO `Product` VALUES (197, '台灣現貨原廠公司貨 apple AirPods2 耳機 airpodsPro 3代 無線藍芽耳機 入耳檢測 藍牙耳機', 495, '123', 'good', 0, 2, 10, 'Yes');
INSERT INTO `Product` VALUES (198, '🔥現貨🔥【大成】立體口罩 4D口罩 醫用口罩20入 韓版口罩 KF94口罩 魚口口罩 MIT 雙鋼印', 140, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (199, '摩升衛浴 德國系電鍍黑浴室浴缸龍頭大流量瀑布出水花灑套裝全銅黑色浴缸邊花灑龍頭', 2625, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (200, 'QUEENSHOP_ F  基本多色前短後長開衩長袖上衣 五色售  現+預【01039103】', 310, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (201, 'A++ 帆布鞋 36-44 大尺碼黑/奶茶 買一送一(後跟貼) 薰衣草紫 基本款綁帶帆布鞋  小白鞋 ~ 偏小', 155, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (202, '超厚底防滑拖鞋 厚底踩屎鞋 居家拖鞋 室內拖鞋 EVA拖鞋 室內拖 浴室拖鞋 防滑拖鞋 防水拖鞋 耐磨休閒拖鞋', 68, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (203, '🔥網紅爆款🔥韓版kf94莫蘭迪色 魚型口罩 四層含熔噴布 彩色口罩 魚嘴柳葉折疊口罩 四層口罩 KF94口罩 立體口罩', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (204, '【台灣現貨/大容量】掀蓋斜口收納箱 可疊加掀蓋收納箱 掀蓋收納箱 翻蓋收納箱 收納箱 置物箱 收納盒 衣物收納', 139, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (205, '『現貨599免運』 眼影盤 眼影 九色眼影盤 大地色眼影閃粉珠光亮片防水網紅學生通勤眼影盤 MINSHZEE茗希芝', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (206, '【買一送一，2天收到！】AirPods保護套1代2代pro3代(系列二)保護殼卡通 情侶 藍牙耳機套 耳機殼矽膠生日禮物', 65, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (207, '【YOGO優購】日韓風蝴蝶結雙肩包 2020時尚多功能小背包 百搭單肩手提斜挎女包包 女 包包 小背包 後背包 雙肩包', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (208, 'mistletoe 美式修身長袖套頭上衣短款百搭貂絨毛衣 長袖短版上衣 長袖T恤 歐美風上衣 現貨', 189, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (209, '現貨 李子柒 螺獅粉 李子柒螺螄粉麵 李子柒螺絲粉麵 李子柒網紅螺絲粉麵 李子柒抖音螺螄粉麵 柳州李子柒 廣西螺螄粉麵', 6, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (210, '小清新 糖果色 防摔 保護殼 手機殼 適用於iphone 12 11 13 pro max 12Pro 13Mini', 128, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (211, 'MYUMYU★台灣公司現貨★多功能透明折疊小桌子可收納床上小桌子杯子收納架廚房收納書桌層架宿舍收納架方便收納桌子 透明桌', 159, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (212, '🔥台灣現貨🔥 全鋁 浴霸風暖集成吊頂取暖燈led浴室取暖器衛生間五合一暖風機 智能恆溫 取暖燈洗', 1325, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (213, '@木吉街風男裝 長袖男 大學T 【M-8XL】 大碼加大加肥胖子黑衣人圓領衛男ins港風長袖t恤寬鬆2021新款春秋上衣', 170, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (214, '高CP值 優盾 軍規防摔 保護殼 iphone 11 12 13 Pro max 手機殼 iphone13 手機殼', 175, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (215, '梨卡-【自訂款~超柔軟舒適】超韓軟綿綿針織外套-氣質純色寬鬆單排釦條紋保暖防曬毛衣針織外套DR005【現貨24H】', 248, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (216, '《台灣現貨》肉片襪子 交換禮物 搞笑禮物 聖誕禮物 創意禮物 生日禮物 禮物 搞怪禮物', 125, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (217, '衛龍辣條 魔芋爽 素蝦仁 素毛肚 風吃海帶 親嘴燒 小麵筋  大陸零食 親嘴條 蒟蒻果凍 馬卡龍 雪花酥', 2, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (218, '澎湖喜來登海皇XO干貝醬｜總統套房貴賓專屬總統醬｜肥美鮮鮑魚｜嚴選大干貝｜高檔石斑魚｜', 180, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (219, 'Greg lauren GL軍綠拼接道袍拼接牛仔洗水', 4980, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (220, '🔥台灣現貨🔥遊戲機 交換禮物 男生禮物 掌上遊戲機 遊戲機 雙打遊戲機 聖誕禮物 生日禮物 聖誕節 禮物', 55, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (221, '【現貨馬上出】送12片棉芯 口罩香氛扣 香氛扣 精油口罩扣 口罩香薰夾扣 Aromanin精油 純精油 擴香 棉片 口罩', 39, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (222, '新店特惠🌈北歐ins風地毯臥室少女居家裝飾長毛地毯耐髒床邊地毯房間滿鋪地毯客廳床前地墊絨毛地毯絲毛地毯毛毯可定製', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (223, '印度MEDIMIX 綠寶石皇室藥草浴美肌皂125g【小三美日】D300249', 39, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (224, 'JCH.tw熱銷附發票 調整型加厚款🍰蛋糕蕾絲無鋼圈內衣 收副乳 深V 集中 小胸 內衣 保證不空杯 性感 A15', 188, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (225, '【DIFF】韓版寬鬆顯瘦炫染短版長袖上衣 女裝 衣服 寬鬆上衣 顯瘦上衣 冬裝 長袖t恤 短版上衣【W204】', 99, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (226, '台灣製 床包/單人/雙人/加大/特大/床包組/被套/床單/棉被/舒柔棉床包/床包組/保潔墊加購/', 170, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (227, 'iphone 13 手機殼 i13 手機殼 iphone 13 pro max 手機殼 蘋果 13 殼i12手機殼', 180, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (228, '超火cec衛衣女春秋韓版ins學生寬鬆waitmore無帽薄款外套上衣服潮', 198, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (229, '開衩針織長裙 秋冬必備✌🏻NEW（適合屁股有肉女孩）必買不後悔', 400, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (230, 'D&M 淨新 4D醫療口罩【小麥購物】【S221】台灣製 口罩 成人口罩 4D口罩 醫療口罩 醫用口罩', 119, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (231, '【現貨】【女生保暖衣】台灣製造 彈性加大 內搭衣 冬天必備 V領 發熱衣 抗寒 發熱褲衣 保暖褲 機能發熱衣 防寒 保暖', 139, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (232, '【買到戀愛】爆好穿多碼多色軟Q 無痕內衣 運動內衣 集中 內衣 【BE2168】', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (233, '🔥新北現貨🔥+附发票 4元特價活動進行中 衛龍魔芋爽 風吃海帶 土豆片 大麵筋  大辣棒 ㄩ ˊ豆腐 臭豆腐 親嘴燒', 3, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (234, '【舒夢宜】保暖法蘭絨床包 珊瑚絨床包 三件組 加厚床包 保暖床包 席夢思床包 冬季保暖', 199, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (235, '++1026++歐美 手工揉洗抓皺霧面小牛皮 合身貼身騎士外套 立領翻領機車拉鍊夾克 皮腰帶高腰中短版 黑色水洗真皮皮衣', 4888, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (236, '台灣公司貨+開箱影片🔥 機車手套 保暖 手套 機車 防風手套 防水手套 防寒手套 騎車手套 騎士手套', 175, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (237, '【免運費】韓國 烏龜餅乾 烏龜 餅乾 玉米濃湯 脆片 原味 麻辣 巧克力 海苔 黃豆 麻糬 吉拿棒 零食', 45, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (238, '【現貨】【刷毛內搭褲】冬天寒流必備 保暖褲 抗寒 內搭褲 發熱褲  加大彈力 打底褲 內搭衣褲 發熱衣褲', 100, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (239, 'HERAN 禾聯 六人份自動式研磨咖啡機HCM-09C8(S)', 2980, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (240, 'adidas FLUIDFLOW 2.0 跑鞋 女 FY5961', 1859, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (241, 'ATTENTION-奶灰系圓領針織衣', 450, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (242, 'MEI SHOP自助收銀機 各別金額各別輸入', 1, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (243, '🇯🇵 現貨 needles Narrow Track Pants 窄版 經典款', 7580, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (244, '正品/NIKE襪 耐吉 買三送一 籃球襪 運動襪 休閒襪 薄/厚款  短襪 長襪 中筒襪 高筒襪 襪子 男/女', 86, '123', 'good', 0, 1, 10, 'Yes');
INSERT INTO `Product` VALUES (245, '『現貨24h寄出滿額免運🔥』螺獅粉 好歡螺 螺霸王 李子柒 白家酸辣粉 螺螄粉 螺絲粉 白家麵皮 魔芋爽 魚豆腐', 8, '123', 'good', 0, 1, 10, 'Yes');
COMMIT;

-- ----------------------------
-- Table structure for ShoppingCart
-- ----------------------------
DROP TABLE IF EXISTS `ShoppingCart`;
CREATE TABLE `ShoppingCart` (
  `MemberID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL,
  KEY `MemberID` (`MemberID`) USING BTREE,
  KEY `ProductID` (`ProductID`) USING BTREE,
  CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`MemberID`) REFERENCES `Member` (`MemberID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of ShoppingCart
-- ----------------------------
BEGIN;
INSERT INTO `ShoppingCart` VALUES (1, 1, 3);
COMMIT;

-- ----------------------------
-- Table structure for Type
-- ----------------------------
DROP TABLE IF EXISTS `Type`;
CREATE TABLE `Type` (
  `TypeID` int NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`TypeID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of Type
-- ----------------------------
BEGIN;
INSERT INTO `Type` VALUES (1, '水果');
INSERT INTO `Type` VALUES (2, '食物');
INSERT INTO `Type` VALUES (3, '3c');
INSERT INTO `Type` VALUES (4, '衣物');
INSERT INTO `Type` VALUES (5, '日用品');
INSERT INTO `Type` VALUES (6, '飲料');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
