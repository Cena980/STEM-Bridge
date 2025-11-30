CREATE DATABASE  IF NOT EXISTS `stem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stem`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stem
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `assignment_submissions`
--

DROP TABLE IF EXISTS `assignment_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment_submissions` (
  `id` char(36) NOT NULL,
  `assignment_id` char(36) NOT NULL,
  `student_id` char(36) NOT NULL,
  `content` text,
  `file_url` varchar(255) DEFAULT NULL,
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `grade` int DEFAULT NULL,
  `feedback` text,
  `graded_at` timestamp NULL DEFAULT NULL,
  `graded_by` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assignment_id` (`assignment_id`),
  KEY `student_id` (`student_id`),
  KEY `graded_by` (`graded_by`),
  CONSTRAINT `assignment_submissions_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`id`),
  CONSTRAINT `assignment_submissions_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `profiles` (`id`),
  CONSTRAINT `assignment_submissions_ibfk_3` FOREIGN KEY (`graded_by`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment_submissions`
--

LOCK TABLES `assignment_submissions` WRITE;
/*!40000 ALTER TABLE `assignment_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignment_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `due_date` date DEFAULT NULL,
  `max_points` int DEFAULT '100',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES ('0','0','Fall of Republic','Write on page about fall of republic in 2021','2025-11-10',100,'2025-10-30 08:21:41','2025-10-30 08:21:41'),('1','9b0434e4-f0f4-4a9b-b4aa-c2de760c1123','ksdjfksjdfl','fsdfsdf','2025-12-12',0,'2025-11-17 17:27:29','2025-11-17 17:27:29'),('62cec386-e7cf-4309-955b-f13961cd67b7','0','lJSflskjdf','dsjkfwejinf','2025-11-29',100,'2025-11-27 16:16:46','2025-11-27 16:16:46'),('f4d87b0f-8460-470b-97c5-4f921b761eab','0','fjslkjdflweifjs','sldkfjoweinlsef','2025-11-27',20,'2025-11-27 16:20:00','2025-11-27 16:20:00');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `conversation_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('individual','group') NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `last_message_snippet` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`conversation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'individual',NULL,'hello','2025-11-22 19:39:13'),(2,'individual',NULL,NULL,'2025-11-18 12:00:56'),(3,'individual',NULL,NULL,'2025-11-18 12:00:56'),(4,'individual',NULL,NULL,'2025-11-18 12:00:56'),(5,'individual',NULL,NULL,'2025-11-18 12:00:56'),(6,'individual',NULL,'okay','2025-11-18 12:49:38'),(7,'individual',NULL,NULL,'2025-11-18 12:00:56'),(8,'individual',NULL,'Al','2025-11-18 13:59:49'),(9,'individual',NULL,NULL,'2025-11-18 12:00:56'),(10,'individual',NULL,NULL,'2025-11-18 12:00:56'),(11,'individual',NULL,NULL,'2025-11-22 19:33:12'),(12,'individual',NULL,NULL,'2025-11-22 19:33:12'),(13,'individual',NULL,NULL,'2025-11-22 19:33:12'),(14,'individual',NULL,NULL,'2025-11-22 19:33:12'),(15,'individual',NULL,NULL,'2025-11-22 19:33:12'),(16,'individual',NULL,NULL,'2025-11-22 19:33:12'),(17,'individual',NULL,NULL,'2025-11-22 19:33:12'),(18,'individual',NULL,NULL,'2025-11-22 19:33:12'),(19,'individual',NULL,NULL,'2025-11-22 19:33:12'),(20,'individual',NULL,NULL,'2025-11-22 19:33:12'),(21,'individual',NULL,NULL,'2025-11-22 19:33:12'),(22,'individual',NULL,NULL,'2025-11-22 19:33:12'),(23,'individual',NULL,NULL,'2025-11-22 19:33:12');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `course_code` varchar(50) NOT NULL,
  `professor_id` char(36) DEFAULT NULL,
  `credits` int DEFAULT '3',
  `is_active` tinyint(1) DEFAULT '1',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_code` (`course_code`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('0','Intro to Afg History','Afghn hisjflsdjflsjkdfljsdlkfj','HIS 110','d3c7326f-8a22-41bb-ac97-89cbb6323c7a',3,1,'2025-10-03','2025-12-03','2025-10-27 14:48:41','2025-10-27 14:48:41'),('1','dsfhksdhfkj','jhfksdfhksjdh','ksdhfksdhf','1',4,1,'2025-10-03','2025-12-03','2025-10-27 14:57:48','2025-10-27 14:57:48'),('9b0434e4-f0f4-4a9b-b4aa-c2de760c1123','English','fdfsdf','1212','1889ed22-6bcc-4a24-805b-0d5310394b7d',NULL,1,NULL,NULL,'2025-11-06 04:41:28','2025-11-06 04:41:28'),('fd2a8b5c-a76c-48ae-a2fa-6ed693b26ce9','Speacila class','something','219','1889ed22-6bcc-4a24-805b-0d5310394b7d',NULL,1,NULL,NULL,'2025-11-17 18:11:59','2025-11-17 18:11:59');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_replies`
--

DROP TABLE IF EXISTS `discussion_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_replies` (
  `id` char(36) NOT NULL,
  `discussion_id` char(36) NOT NULL,
  `author_id` char(36) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `discussion_id` (`discussion_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `discussion_replies_ibfk_1` FOREIGN KEY (`discussion_id`) REFERENCES `discussions` (`id`),
  CONSTRAINT `discussion_replies_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_replies`
--

LOCK TABLES `discussion_replies` WRITE;
/*!40000 ALTER TABLE `discussion_replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussions`
--

DROP TABLE IF EXISTS `discussions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussions` (
  `id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `author_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `discussions_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `discussions_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussions`
--

LOCK TABLES `discussions` WRITE;
/*!40000 ALTER TABLE `discussions` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` char(36) NOT NULL,
  `student_id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `enrolled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','completed','dropped') DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES ('0','0','0','2025-10-01 19:30:00','active'),('007ca943-dcc5-48a4-8f64-4f3409c56896','212e13e2-20d5-466b-8899-bad408c3ae03','0','2025-11-27 15:45:29','active'),('04ed9c5b-815d-4a96-ae14-940e4b90aa95','e4e0d81f-dff8-475d-8096-5e73c5a92620','0','2025-11-19 14:23:54','active'),('1','04c70a46-45f7-41d0-b4db-75178c12d261','0','2025-11-09 08:13:50','active'),('2','04c70a46-45f7-41d0-b4db-75178c12d261','1','2025-11-09 08:16:05','active'),('fadd8ad3-c85b-4fb8-afee-62280824bee9','04c70a46-45f7-41d0-b4db-75178c12d261','fd2a8b5c-a76c-48ae-a2fa-6ed693b26ce9','2025-11-17 18:47:57','active');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `conversation_id` bigint unsigned NOT NULL,
  `sender_id` char(36) NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('sent','delivered','read') DEFAULT 'sent',
  PRIMARY KEY (`message_id`),
  KEY `idx_conv_time` (`conversation_id`,`timestamp`),
  KEY `idx_sender` (`sender_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (4,1,'0','Hello','2025-11-18 09:02:56','sent'),(5,1,'1889ed22-6bcc-4a24-805b-0d5310394b7d','Hello','2025-11-18 11:22:13','sent'),(6,1,'04c70a46-45f7-41d0-b4db-75178c12d261','Hello','2025-11-18 11:25:35','sent'),(7,1,'1889ed22-6bcc-4a24-805b-0d5310394b7d','How You Doing?','2025-11-18 11:25:50','sent'),(8,1,'04c70a46-45f7-41d0-b4db-75178c12d261','pretty good','2025-11-18 11:26:02','sent'),(9,1,'04c70a46-45f7-41d0-b4db-75178c12d261','wau','2025-11-18 11:26:08','sent'),(10,1,'04c70a46-45f7-41d0-b4db-75178c12d261','Hi','2025-11-18 11:28:31','sent'),(11,1,'04c70a46-45f7-41d0-b4db-75178c12d261','Good good','2025-11-18 11:28:37','sent'),(12,1,'1889ed22-6bcc-4a24-805b-0d5310394b7d','sdfsdfsdf','2025-11-18 11:28:51','sent'),(13,1,'04c70a46-45f7-41d0-b4db-75178c12d261','sdfsdfsdf','2025-11-18 11:28:57','sent'),(14,6,'3a9b4aa4-314d-4489-8768-0b2f8ecd0425','Hello','2025-11-18 12:06:40','sent'),(15,6,'1889ed22-6bcc-4a24-805b-0d5310394b7d','Hi','2025-11-18 12:07:05','sent'),(16,6,'3a9b4aa4-314d-4489-8768-0b2f8ecd0425','How is it going','2025-11-18 12:07:14','sent'),(17,6,'1889ed22-6bcc-4a24-805b-0d5310394b7d','Pretty good','2025-11-18 12:07:23','sent'),(18,6,'1889ed22-6bcc-4a24-805b-0d5310394b7d','okay','2025-11-18 12:49:38','sent'),(19,1,'1889ed22-6bcc-4a24-805b-0d5310394b7d','ola','2025-11-18 13:14:46','sent'),(20,8,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','Hi','2025-11-18 13:16:34','sent'),(21,8,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','salam','2025-11-18 13:57:22','sent'),(22,8,'1889ed22-6bcc-4a24-805b-0d5310394b7d','alaikm','2025-11-18 13:57:42','sent'),(23,8,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','jhjhgjhgjhgjh','2025-11-18 13:57:50','sent'),(24,8,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','Ghfhgfhfyhf','2025-11-18 13:59:27','sent'),(25,8,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','madina khar','2025-11-18 13:59:40','sent'),(26,8,'1889ed22-6bcc-4a24-805b-0d5310394b7d','Al','2025-11-18 13:59:49','sent'),(27,1,'04c70a46-45f7-41d0-b4db-75178c12d261','hello','2025-11-22 19:39:13','sent');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `participant_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `conversation_id` bigint unsigned NOT NULL,
  `user_id` char(36) NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen_message_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`participant_id`),
  UNIQUE KEY `uniq_conversation_user` (`conversation_id`,`user_id`),
  KEY `last_seen_message_id` (`last_seen_message_id`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`conversation_id`) ON DELETE CASCADE,
  CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participants_ibfk_3` FOREIGN KEY (`last_seen_message_id`) REFERENCES `messages` (`message_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (4,1,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-18 09:12:47',4),(5,1,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 09:58:51',4),(6,2,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(7,2,'0','2025-11-18 12:00:56',NULL),(8,3,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(9,3,'0','2025-11-18 12:00:56',NULL),(10,4,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(11,4,'1','2025-11-18 12:00:56',NULL),(12,5,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(13,5,'1','2025-11-18 12:00:56',NULL),(14,6,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(15,6,'3a9b4aa4-314d-4489-8768-0b2f8ecd0425','2025-11-18 12:00:56',NULL),(16,7,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(17,7,'58d9d722-b5a0-4391-87af-1f9ac0d67631','2025-11-18 12:00:56',NULL),(18,8,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(19,8,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','2025-11-18 12:00:56',NULL),(20,9,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(21,9,'d91dc301-4f9c-4b5a-9c11-049785b51ebc','2025-11-18 12:00:56',NULL),(22,10,'1889ed22-6bcc-4a24-805b-0d5310394b7d','2025-11-18 12:00:56',NULL),(23,10,'e4e0d81f-dff8-475d-8096-5e73c5a92620','2025-11-18 12:00:56',NULL),(24,11,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(25,11,'0','2025-11-22 19:33:12',NULL),(26,12,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(27,12,'0','2025-11-22 19:33:12',NULL),(28,13,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(29,13,'1','2025-11-22 19:33:12',NULL),(30,14,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(31,14,'1','2025-11-22 19:33:12',NULL),(32,15,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(33,15,'3a9b4aa4-314d-4489-8768-0b2f8ecd0425','2025-11-22 19:33:12',NULL),(34,16,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(35,16,'3a9b4aa4-314d-4489-8768-0b2f8ecd0425','2025-11-22 19:33:12',NULL),(36,17,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(37,17,'58d9d722-b5a0-4391-87af-1f9ac0d67631','2025-11-22 19:33:12',NULL),(38,18,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(39,18,'58d9d722-b5a0-4391-87af-1f9ac0d67631','2025-11-22 19:33:12',NULL),(40,19,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(41,19,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','2025-11-22 19:33:12',NULL),(42,20,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(43,20,'d3c7326f-8a22-41bb-ac97-89cbb6323c7a','2025-11-22 19:33:12',NULL),(44,21,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(45,21,'d91dc301-4f9c-4b5a-9c11-049785b51ebc','2025-11-22 19:33:12',NULL),(46,22,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(47,22,'d91dc301-4f9c-4b5a-9c11-049785b51ebc','2025-11-22 19:33:12',NULL),(48,23,'04c70a46-45f7-41d0-b4db-75178c12d261','2025-11-22 19:33:12',NULL),(49,23,'e4e0d81f-dff8-475d-8096-5e73c5a92620','2025-11-22 19:33:12',NULL);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `role` enum('student','professor') NOT NULL,
  `bio` text,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES ('0','sina@gmail','Ali Sina Nazari','student','vvvv',NULL,'2025-10-25 14:25:02','2025-10-25 15:24:51','123456'),('04c70a46-45f7-41d0-b4db-75178c12d261','sina@a','Ali Sina','student',NULL,'/uploads/avatars/sina.jpg','2025-10-25 16:38:38','2025-11-11 14:07:51','$2b$10$oY7Rx7t1EpWcKQyECE95Kee0V1T2iiL1SLy16vrNLbPJPsna9K7hu'),('1','prof@a','Ali Mahdi','professor',NULL,NULL,'2025-10-27 14:46:47','2025-10-27 14:46:47','123456'),('1889ed22-6bcc-4a24-805b-0d5310394b7d','milad@p','Milad','professor',NULL,NULL,'2025-10-27 15:53:09','2025-10-27 15:53:09','$2b$10$CCmoZcaVqSwEyu.VltfmO.KqH1uKGtijwy2h5OyZD.yeZ4djX54eC'),('212e13e2-20d5-466b-8899-bad408c3ae03','armin@a','Armin','student',NULL,'/uploads/avatars/avatar-1764258296690.png','2025-11-27 15:44:57','2025-11-27 15:44:57','$2b$10$C5IWq2u50nj6vcq78EE1SObgOE8X9GDAHDQrQx4OkccT4eNREV2yW'),('3a9b4aa4-314d-4489-8768-0b2f8ecd0425','bashir@a','Bashir','professor',NULL,'/uploads/avatars/avatar-1762869681983.jpg','2025-11-11 14:01:22','2025-11-11 14:01:22','$2b$10$yXhkaI1RjRNV9ZgDVt33p.Q8.sJc9ocm33YOHuyQaFl0Z.KyLMG1W'),('58d9d722-b5a0-4391-87af-1f9ac0d67631','sina@something','Ali Sina','professor',NULL,NULL,'2025-10-25 15:39:28','2025-10-25 15:39:28','$2b$10$c2Z/pxaduWXMRAdzC6vD/elYEPdg5DnZMdE0Vxp7nkNqzcPRr5b66'),('d3c7326f-8a22-41bb-ac97-89cbb6323c7a','prof@ab','Professor','professor',NULL,NULL,'2025-10-27 14:47:46','2025-10-27 14:47:46','$2b$10$52Jog089G6SJ9xYFk55HNeSZ7yzI9aBTtmieCMOLoaU1qJ0RlObY2'),('d91dc301-4f9c-4b5a-9c11-049785b51ebc','mahdi@p','mahdi','professor',NULL,NULL,'2025-10-27 15:53:58','2025-10-27 15:53:58','$2b$10$cDFDC7pd2c.9ZWvWhdHM5Ox0lLo8JxJIDkYS/C3KHbPEXl9f7uMES'),('e4e0d81f-dff8-475d-8096-5e73c5a92620','p@j','Parniyan','student',NULL,NULL,'2025-10-25 16:59:46','2025-10-25 16:59:46','$2b$10$YLUORlLtW4FzUDUCgX7WjeErDK0/X4SZnEpqaRwAaGlJLlmAafM0i');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `due_date` date DEFAULT NULL,
  `max_points` int DEFAULT '100',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('0','0','Research the fall of the Amani reign','Get in pairs and write a research paper about the fall of amani reign','2025-11-30',100,'2025-10-30 08:30:49','2025-10-30 08:30:49'),('84a0b659-c7bb-484f-8872-218c59629b16','0','fdbcjnlkxzm ,','lisndjskefhnckdsf','2025-11-29',100,'2025-11-27 16:36:02','2025-11-27 16:36:02'),('aa332834-6e16-4c55-adac-c122c807a42f','0','ewryuio','fkdjvlnkfc','2025-11-29',21,'2025-11-27 16:37:28','2025-11-27 16:37:28'),('ac447fd6-6a4d-4f1b-8894-f848ee0d654d','0','l;ljknjlhv','jlkbjlhkb,klnjb','2025-11-28',100,'2025-11-27 16:34:17','2025-11-27 16:34:17');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_answers`
--

DROP TABLE IF EXISTS `quiz_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_answers` (
  `id` char(36) NOT NULL,
  `attempt_id` char(36) NOT NULL,
  `question_id` char(36) NOT NULL,
  `selected_option_id` char(36) DEFAULT NULL,
  `answer_text` text,
  `is_correct` tinyint(1) DEFAULT NULL,
  `points_earned` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `attempt_id` (`attempt_id`),
  KEY `question_id` (`question_id`),
  KEY `selected_option_id` (`selected_option_id`),
  CONSTRAINT `quiz_answers_ibfk_1` FOREIGN KEY (`attempt_id`) REFERENCES `quiz_attempts` (`id`),
  CONSTRAINT `quiz_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`),
  CONSTRAINT `quiz_answers_ibfk_3` FOREIGN KEY (`selected_option_id`) REFERENCES `quiz_question_options` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_answers`
--

LOCK TABLES `quiz_answers` WRITE;
/*!40000 ALTER TABLE `quiz_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_attempts`
--

DROP TABLE IF EXISTS `quiz_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_attempts` (
  `id` char(36) NOT NULL,
  `quiz_id` char(36) NOT NULL,
  `student_id` char(36) NOT NULL,
  `started_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `submitted_at` timestamp NULL DEFAULT NULL,
  `score` int DEFAULT NULL,
  `total_points` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `quiz_attempts_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`),
  CONSTRAINT `quiz_attempts_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_attempts`
--

LOCK TABLES `quiz_attempts` WRITE;
/*!40000 ALTER TABLE `quiz_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_question_options`
--

DROP TABLE IF EXISTS `quiz_question_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_question_options` (
  `id` char(36) NOT NULL,
  `question_id` char(36) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) DEFAULT '0',
  `order_index` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `quiz_question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_question_options`
--

LOCK TABLES `quiz_question_options` WRITE;
/*!40000 ALTER TABLE `quiz_question_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_question_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_questions`
--

DROP TABLE IF EXISTS `quiz_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_questions` (
  `id` char(36) NOT NULL,
  `quiz_id` char(36) NOT NULL,
  `question_text` text NOT NULL,
  `question_type` enum('multiple_choice','true_false','short_answer') NOT NULL,
  `points` int DEFAULT '1',
  `order_index` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_questions`
--

LOCK TABLES `quiz_questions` WRITE;
/*!40000 ALTER TABLE `quiz_questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizzes`
--

DROP TABLE IF EXISTS `quizzes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizzes` (
  `id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `time_limit` int DEFAULT NULL,
  `max_points` int DEFAULT '100',
  `available_from` datetime DEFAULT NULL,
  `available_until` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` VALUES ('0','0','Quiz 1','This quiz will be about the chapter on fall of Amani Reign',45,10,'2025-11-10 19:30:00','2025-11-10 20:30:00','2025-10-30 08:32:39','2025-10-30 08:32:39'),('294973da-854a-4187-a057-db5a512af8fa','0','vhjbkljv','iuhgjouyfgch',60,100,'2025-11-27 21:02:00','2025-11-27 22:02:00','2025-11-27 16:32:45','2025-11-27 16:32:45');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` char(36) NOT NULL,
  `course_id` char(36) NOT NULL,
  `item_type` enum('assignment','project','quiz') NOT NULL,
  `item_id` char(36) NOT NULL,
  `submission_text` text,
  `submission_file` varchar(255) DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `feedback` text,
  `status` enum('submitted','graded') DEFAULT 'submitted',
  `submitted_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `graded_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `submissions_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (4,'04c70a46-45f7-41d0-b4db-75178c12d261','0','assignment','0','kjdflksjdlfkjsldkfjlksdjf',NULL,45.00,'fdgsdgf','graded','2025-11-27 11:39:43','2025-11-27 13:31:26'),(6,'04c70a46-45f7-41d0-b4db-75178c12d261','0','project','0','They fell and that was it',NULL,90.00,'Good work','graded','2025-11-27 20:09:54','2025-11-27 20:12:25'),(7,'212e13e2-20d5-466b-8899-bad408c3ae03','0','assignment','0','ljaflksdjflkjsejifjsndlkvnksdjhfwef','uploads\\1764258343642-6247053-Screenshot 2025-10-22 194719.png',100.00,'Exceptional','graded','2025-11-27 20:15:43','2025-11-27 21:11:07'),(8,'212e13e2-20d5-466b-8899-bad408c3ae03','0','project','0','','uploads\\1764258387702-346419123-Assessment 1.pdf',40.00,'','graded','2025-11-27 20:16:27','2025-11-27 21:17:34');
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-30 19:19:56
