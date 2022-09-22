-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-09-22 11:54:09
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
(1, 'Spaceface', 3.2, 'Spaceface.jpg', 1, 'image', 'Adamtoksoz'),
(2, 'Kanpai Panda1', 6, 'imgwork-1.png', 1, 'image', 'Kanpai-Labs'),
(3, 'Spider Tanks', 5, 'music1.gif', 1, 'music', 'Snoop Dogg - B.O.D.R'),
(4, '2 Geez (Instrumental)', 6, 'music2.gif', 1, 'music', 'Snoop Dogg - B.O.D.R'),
(5, 'immortal', 4, 'immortal.jpg', 1, 'image', 'Ier6'),
(6, 'SPACE COIN', 4.5, 'gif1.gif', 1, 'gifs', 'SDE'),
(7, 'ZAP#4797', 3.1, 'imgwork-4.jpg', 1, 'image', 'SAAD97'),
(8, 'Kanpai Panda2', 3.6, 'imgwork-2.png', 1, 'image', 'Kanpai-Labs'),
(9, '79879789', 3.2, 'ds', 1, '1', '1');

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
(95, NULL, 'hype123456', 'cookie123', 'qw@gmail.com', NULL),
(97, 'GAGU', 'jack45678', 'a', '583@gass.com', NULL);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
