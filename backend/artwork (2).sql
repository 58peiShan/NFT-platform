-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-09-15 12:04:45
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
  `price` int NOT NULL,
  `img` text,
  `amount` int NOT NULL,
  `category` text NOT NULL,
  `author` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `artwork`
--

INSERT INTO `artwork` (`id`, `workName`, `price`, `img`, `amount`, `category`, `author`) VALUES
(1, 'Spaceface', 3, 'Spaceface.jpg', 1, 'image', 'Adamtoksoz'),
(2, 'Kanpai Panda1', 6, 'imgwork-1.png', 1, 'image', 'Kanpai-Labs'),
(3, 'Spider Tanks', 5, 'music1.gif', 1, 'music', 'Snoop Dogg - B.O.D.R'),
(4, '2 Geez (Instrumental)', 6, 'music2.gif', 1, 'music', 'Snoop Dogg - B.O.D.R');

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `account` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `account`, `password`, `email`) VALUES
(1, 'a123', 'a46', 'sad@gmail.cm');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
