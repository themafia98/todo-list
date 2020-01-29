-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Янв 28 2020 г., 20:32
-- Версия сервера: 8.0.13-4
-- Версия PHP: 7.2.24-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `records` (
  `num` int(25) NOT NULL,
  `id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `recordName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `additionalNote` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `records`
  ADD PRIMARY KEY (`num`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `userId` (`userId`);

ALTER TABLE `records`
  MODIFY `num` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

ALTER TABLE `records`
  ADD CONSTRAINT `records_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;