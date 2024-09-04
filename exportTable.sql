/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.1-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tokens
-- ------------------------------------------------------
-- Server version	11.6.1-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `order_book`
--

DROP TABLE IF EXISTS `order_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_book` (
  `order_book_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `order_price` float DEFAULT NULL,
  `order_amount` float DEFAULT NULL,
  `type` char(4) DEFAULT NULL,
  PRIMARY KEY (`order_book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_book`
--

LOCK TABLES `order_book` WRITE;
/*!40000 ALTER TABLE `order_book` DISABLE KEYS */;
INSERT INTO `order_book` VALUES
(20,1,59001,20,'buy'),
(21,1,59001,1,'sell'),
(22,1,59002,20,'buy'),
(23,1,59003,20,'buy'),
(24,1,59004,20,'buy'),
(25,1,59005,20,'buy'),
(26,1,59006,20,'buy'),
(27,1,59007,20,'buy'),
(28,1,59008,20,'buy'),
(29,1,59009,20,'buy'),
(30,1,59010,20,'buy'),
(31,1,59002,1,'sell'),
(32,1,59003,1,'sell'),
(33,1,59004,1,'sell'),
(34,1,59005,1,'sell'),
(35,1,59006,1,'sell'),
(36,1,59007,1,'sell'),
(37,1,59008,1,'sell'),
(38,1,59009,1,'sell'),
(39,1,59010,1,'sell');
/*!40000 ALTER TABLE `order_book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-09-05  2:11:44
