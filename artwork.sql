-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-09-29 11:31:59
-- 伺服器版本： 8.0.30
-- PHP 版本： 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `artwork`
--

-- --------------------------------------------------------

--
-- 資料表結構 `artwork`
--
CREATE DATABASE `artwork`;
USE `artwork`;
CREATE TABLE `artwork` (
  `id` int NOT NULL,
  `workName` text NOT NULL,
  `price` float NOT NULL,
  `img` text,
  `amount` int NOT NULL,
  `category` text NOT NULL,
  `author` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `artwork`
--

INSERT INTO `artwork` (`id`, `workName`, `price`, `img`, `amount`, `category`, `author`) VALUES
(1, 'Spaceface', 3.2, 'Spaceface.jpg', 0, 'image', 'Adamtoksoz'),
(2, 'Kanpai Panda1', 6, 'imgwork-1.png', 0, 'image', 'Kanpai-Labs'),
(3, 'Spider Tanks', 5, 'music1.gif', 1, 'music', 'Snoop Dogg - B.O.D.R'),
(4, '2 Geez (Instrumental)', 6, 'music2.gif', 1, 'music', 'Snoop Dogg - B.O.D.R'),
(5, 'immortal', 4, 'immortal.jpg', 1, 'image', 'Ier6'),
(6, 'SPACE COIN', 4.5, 'gif1.gif', 1, 'gifs', 'SDE'),
(7, 'ZAP#4797', 3.1, 'imgwork-4.jpg', 1, 'image', 'SAAD97'),
(8, 'Kanpai Panda2', 3.6, 'imgwork-2.png', 1, 'image', 'Kanpai-Labs'),
(10, 'Leilani Kilgore', 7, 'Leilani Kilgore.jpg', 1, 'music', 'FuntimeNikki'),
(11, 'Construction Token #496', 70, 'ConstructionToken496.png', 1, 'image', 'jeffgdavis'),
(12, 'ConstructionToken#113', 35, '113.png', 1, 'image', 'jeffgdavis');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `userName` text,
  `account` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `purchase` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `userName`, `account`, `password`, `email`, `purchase`) VALUES
(95, 'sweetJohn', 'sweet456', '6367c48dd193d56ea7b0baad25b19455e529f5ee', 'biteOne@gmail.com', NULL),
(97, 'GAGU', 'jack45678', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '583@gass.com', NULL),
(104, 'Finnona', 'Adventure123', '0ce60eacd334fe2945c1f99e67ff5cb19c2f936f', 'Adventure123@sa.com', '[1]'),
(105, NULL, 'saysomthing', '8c0da104259ae45f23bfeaab025b3436408ed166', 'saysomthing@as.com', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `artwork`
--
ALTER TABLE `artwork`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `artwork`
--
ALTER TABLE `artwork`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
