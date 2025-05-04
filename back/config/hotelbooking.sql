-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2025 a las 17:13:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hotelbooking`
--
CREATE DATABASE IF NOT EXISTS `hotelbooking` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hotelbooking`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotelbooking`
--

CREATE TABLE `hotelbooking` (
  `id` int(11) NOT NULL,
  `hotelId` int(11) DEFAULT NULL,
  `clientId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hotelbooking`
--
ALTER TABLE `hotelbooking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotelId` (`hotelId`),
  ADD KEY `clientId` (`clientId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hotel`
--
ALTER TABLE `hotel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hotelbooking`
--
ALTER TABLE `hotelbooking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `hotelbooking`
--
ALTER TABLE `hotelbooking`
  ADD CONSTRAINT `hotelbooking_ibfk_1` FOREIGN KEY (`hotelId`) REFERENCES `hotel` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hotelbooking_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
