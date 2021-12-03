CREATE DATABASE  IF NOT EXISTS `fastsociety` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fastsociety`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fastsociety
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `textContent` varchar(45) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User_id` int NOT NULL,
  `Event_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Comment_User1_idx` (`User_id`),
  KEY `fk_Comment_Event1_idx` (`Event_id`),
  CONSTRAINT `fk_Comment_Event1` FOREIGN KEY (`Event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_Comment_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL,
  `venue` varchar(45) DEFAULT NULL,
  `textContent` varchar(1000) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `User_id` int NOT NULL,
  `Society_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Event_User1_idx` (`User_id`),
  KEY `fk_Event_Society1_idx` (`Society_id`),
  CONSTRAINT `fk_Event_Society1` FOREIGN KEY (`Society_id`) REFERENCES `society` (`id`),
  CONSTRAINT `fk_Event_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `textContent` varchar(45) NOT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `User_id` int NOT NULL,
  `Society_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Message_User1_idx` (`User_id`),
  KEY `fk_Message_Society1_idx` (`Society_id`),
  CONSTRAINT `fk_Message_Society1` FOREIGN KEY (`Society_id`) REFERENCES `society` (`id`),
  CONSTRAINT `fk_Message_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL,
  `textContent` varchar(300) DEFAULT NULL,
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `User_id` int NOT NULL,
  `Event_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Post_User1_idx` (`User_id`),
  KEY `fk_Post_Event1_idx` (`Event_id`),
  CONSTRAINT `fk_Post_Event1` FOREIGN KEY (`Event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_Post_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration` (
  `Role_id` int NOT NULL,
  `User_id` int NOT NULL,
  `Society_id` int NOT NULL,
  `joinDate` date DEFAULT (curdate()),
  PRIMARY KEY (`Role_id`,`User_id`,`Society_id`),
  KEY `fk_Registration_Role1_idx` (`Role_id`),
  KEY `fk_Registration_User1_idx` (`User_id`),
  KEY `fk_Registration_Society1_idx` (`Society_id`),
  CONSTRAINT `fk_Registration_Role1` FOREIGN KEY (`Role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_Registration_Society1` FOREIGN KEY (`Society_id`) REFERENCES `society` (`id`),
  CONSTRAINT `fk_Registration_User1` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `User_id` int NOT NULL,
  `Event_id` int NOT NULL,
  `stars` tinyint unsigned NOT NULL,
  PRIMARY KEY (`User_id`,`Event_id`),
  KEY `fk_Post_User1_idx` (`User_id`),
  KEY `fk_Post_Event1_idx` (`Event_id`),
  CONSTRAINT `fk_Post_Event10` FOREIGN KEY (`Event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `fk_Post_User10` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `Society_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Role_Society1_idx` (`Society_id`),
  CONSTRAINT `fk_Role_Society1` FOREIGN KEY (`Society_id`) REFERENCES `society` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `society`
--

DROP TABLE IF EXISTS `society`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `society` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(250) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `totalFollows` varchar(45) NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `head_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Society_User_idx` (`head_id`),
  CONSTRAINT `fk_Society_User` FOREIGN KEY (`head_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-03 16:17:27
