-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-10-06 07:05:51
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
  `collection_address` text NOT NULL,
  `author` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `artwork`
--

INSERT INTO `artwork` (`id`, `workName`, `price`, `img`, `amount`, `category`, `collection_address`, `author`) VALUES
(1, 'Spaceface', 0.2, 'Spaceface.jpg', 1, 'image', '0x495f947276749Ce646f68AC8c248420045cb7b5e', 'Adamtoksoz'),
(2, 'Kanpai Panda1', 2, 'imgwork-1.png', 1, 'image', '0xaCF63E56fd08970b43401492a02F6F38B6635C91', 'Kanpai-Labs'),
(3, 'Spider Tanks', 0.5, 'music1.gif', 1, 'music', '0xc36cF0cFcb5d905B8B513860dB0CFE63F6Cf9F5c', 'Snoop Dogg - B.O.D.R'),
(4, '2 Geez (Instrumental)', 0.006, 'music2.gif', 1, 'music', '0xc36cF0cFcb5d905B8B513860dB0CFE63F6Cf9F5c', 'Snoop Dogg - B.O.D.R'),
(5, 'IMMORTAL BABBLE', 4, 'immortal.jpg', 1, 'image', '0x09B1A9dfFD64e6dCAdf4241E0Fe66817e21c7a68', 'OBJECTZ by JIMMY'),
(6, 'Aoki x Snoop', 0.3, 'gif1.gif', 1, 'gifs', '0xc36cF0cFcb5d905B8B513860dB0CFE63F6Cf9F5c', 'Snoop Dogg - B.O.D.R'),
(7, 'ZAP#4797', 0.02, 'imgwork-4.jpg', 1, 'image', '0x0Cfb5d82BE2b949e8fa73A656dF91821E2aD99FD', '10KTF'),
(8, 'Kanpai Panda2', 3.6, 'imgwork-2.png', 1, 'image', '0xaCF63E56fd08970b43401492a02F6F38B6635C91', 'Kanpai-Labs'),
(10, 'Leilani Kilgore', 0.4, 'Leilani Kilgore.jpg', 1, 'music', '0x495f947276749Ce646f68AC8c248420045cb7b5e', 'FuntimeNikki'),
(11, 'Construction Token #496', 1.5, 'ConstructionToken496.png', 1, 'image', '0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a', 'jeffgdavis'),
(12, 'ConstructionToken#113', 6.3, '113.png', 1, 'image', '0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a', 'jeffgdavis'),
(13, 'Construction Token #156', 6, 'ConstructionToken156.png', 1, 'image', '0x059EDD72Cd353dF5106D2B9cC5ab83a52287aC3a', 'jeffgdavis'),
(14, 'Strawberry #2561', 0.0465, 'Strawberry2561.png', 1, 'image', '0xdF3a5f8576a6Ff359990688d94cf9c74245607f3', 'GardenLockdown (PLANT)');

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
(97, 'GAGU', 'jack45678', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', '583@gass.com', NULL);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
