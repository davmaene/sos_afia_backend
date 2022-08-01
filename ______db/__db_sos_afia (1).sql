-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 01 août 2022 à 22:48
-- Version du serveur :  10.4.6-MariaDB
-- Version de PHP :  7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `__db_sos_afia`
--

-- --------------------------------------------------------

--
-- Structure de la table `__tbl_agents`
--

CREATE TABLE `__tbl_agents` (
  `id` int(11) NOT NULL,
  `fsname` varchar(60) NOT NULL,
  `lsname` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `pushtoken` varchar(60) NOT NULL,
  `hospitalref` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `__tbl_agents`
--

INSERT INTO `__tbl_agents` (`id`, `fsname`, `lsname`, `email`, `phone`, `password`, `pushtoken`, `hospitalref`, `status`) VALUES
(6, 'david', 'maene', 'dav.me@gmail.com', '0970284779', '$2b$10$GseLS6gxtSsoadXKw7GV1e/rtOwFuIm7RQCJGtVEgc6Q2P8pAAPUa', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `__tbl_customizedsms`
--

CREATE TABLE `__tbl_customizedsms` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `from` int(11) NOT NULL,
  `to` varchar(60) NOT NULL,
  `fill` varchar(60) NOT NULL,
  `from_token` varchar(100) NOT NULL,
  `to_token` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `createdon` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `__tbl_customizedsms`
--

INSERT INTO `__tbl_customizedsms` (`id`, `content`, `from`, `to`, `fill`, `from_token`, `to_token`, `status`, `createdon`) VALUES
(1, ' Salut j\'ai besoin d\'aide !', 1, '2', 'hosp--577-34', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '1'),
(2, 'bonjour', 1, '4', 'hosp--245-65', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '1'),
(3, 'bonjour', 1, '4', 'hosp--649-76', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '1'),
(4, 'bonjour', 1, '4', 'hosp--649-76', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '1'),
(5, ' Salut j\'ai besoin d\'aide !', 1, '2', 'hosp--649-76', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '1'),
(6, ' Salut j\'ai besoin d\'aide !', 1, '2', 'hosp--649-76', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '1'),
(7, ' Salut j\'ai besoin d\'aide !', 1, '2', 'fil-1-2', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 22:52:00'),
(8, 'salut', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 22:52:00'),
(9, 'gugufu', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 22:52:00'),
(10, 'gufjfh', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 22:52:00'),
(11, 'bonjour j\'ai besoin d\'aide je vous enprie comment je fais', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 22:52:00'),
(12, 'je suis au niveau de la regideso, \ns\'il vous plais vkvkvkvkvjvbnnvbvvvvcjcjcjhhc gjgjhj jkhjjvj jkvkvkjkh jkjkjkjhj jlvkhkvk', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 22:52:00'),
(13, 'fufh', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 23:47:11'),
(14, 'ufug', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '20/07/2022, 23:48:17'),
(15, 'salut', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '24/07/2022, 19:30:55'),
(16, 'yuture', 1, '4', 'fil-1-4', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '24/07/2022, 19:30:55'),
(17, 'salut', 1, '3', 'fil-1-3', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 'ExponentPushToken[lSF65nHgjNBBj4-FzMaj7D]', 1, '01/08/2022, 12:06:03');

-- --------------------------------------------------------

--
-- Structure de la table `__tbl_hospital`
--

CREATE TABLE `__tbl_hospital` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `refhospital` varchar(60) NOT NULL,
  `latitudes` varchar(60) NOT NULL,
  `longitudes` varchar(60) NOT NULL,
  `token` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `__tbl_hospital`
--

INSERT INTO `__tbl_hospital` (`id`, `name`, `refhospital`, `latitudes`, `longitudes`, `token`, `phone`, `status`) VALUES
(1, 'CBBCA Virunga', 'hosp--241-96', '00000000', '00000000', '', '', 1),
(2, 'CBBCA Ville', 'hosp--241-96', '00000000', '00000000', '', '', 1),
(3, 'CBBCA Ndosho', 'hosp--241-96', '00000000', '00000000', '', '', 1),
(4, 'Hôpital Générale', 'hosp--241-96', '00000000', '00000000', '', '', 1);

-- --------------------------------------------------------

--
-- Structure de la table `__tbl_news`
--

CREATE TABLE `__tbl_news` (
  `id` int(11) NOT NULL,
  `hospitalref` int(11) NOT NULL,
  `title` varchar(60) NOT NULL,
  `content` text NOT NULL,
  `createdon` varchar(60) NOT NULL,
  `status` int(11) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `__tbl_sos`
--

CREATE TABLE `__tbl_sos` (
  `id` int(11) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `latitude` varchar(60) NOT NULL,
  `longitude` varchar(60) NOT NULL,
  `altitude` varchar(60) NOT NULL,
  `speed` varchar(60) NOT NULL,
  `hospitalref` int(11) NOT NULL,
  `refsos` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `createdon` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `__tbl_sos`
--

INSERT INTO `__tbl_sos` (`id`, `phone`, `latitude`, `longitude`, `altitude`, `speed`, `hospitalref`, `refsos`, `description`, `status`, `createdon`) VALUES
(1, '0970284772', '-1.6734344', '29.2325193', '0', '0', 2, 'sos-459-98', 'rufufufuru', 1, ''),
(2, '0970284772', '-1.6734338', '29.2325225', '0', '0', 2, 'sos-415-66', 'rufufufuru', 1, ''),
(3, '0970284772', '-1.6782714', '29.2284531', '1508.800048828125', '0', 2, 'sos-680-91', '', 1, ''),
(4, '0970284772', '-1.6782686', '29.2284511', '1508.800048828125', '0', 2, 'sos-547-52', '', 1, ''),
(5, '0970284772', '-1.6739295', '29.2304438', '0', '0', 4, 'sos-392-4', '', 1, ''),
(6, '0970284772', '-1.6796453', '29.2161175', '1481.7000732421875', '0', 4, 'sos-617-30', '', 1, ''),
(7, '0970284772', '-1.6739295', '29.2304438', '0', '0', 4, 'sos-683-38', '', 1, ''),
(8, '0970284772', '-1.6739295', '29.2304438', '0', '0', 4, 'sos-582-54', '', 1, ''),
(9, '0970284772', '-1.6734443', '29.2325256', '1515.7000732421875', '0', 4, 'sos-777-62', '', 1, ''),
(10, '0970284777', '-1.6782685', '29.2284517', '1508.800048828125', '0', 3, 'sos-375-32', '', 1, ''),
(11, '0970284777', '-1.6782685', '29.2284517', '1508.800048828125', '0', 3, 'sos-810-80', '', 1, ''),
(12, '0970284777', '-1.6788293', '29.2275641', '1509.2000732421875', '0', 3, 'sos-877-78', '', 1, ''),
(13, '0970284777', '-1.6784969', '29.2282645', '1509.2000732421875', '0', 3, 'sos-698-17', '', 1, ''),
(14, '0970284777', '-1.6782919', '29.2283967', '1508.5999755859375', '0', 3, 'sos-142-45', '', 1, ''),
(15, '0970284777', '-1.6783015', '29.2283776', '1508.5999755859375', '0', 3, 'sos-149-49', '', 1, ''),
(16, '0970284777', '-1.6782554', '29.228485', '1508.5999755859375', '0', 3, 'sos-477-23', '', 1, ''),
(17, '0970284777', '-1.6782561', '29.2284872', '1508.5999755859375', '0', 3, 'sos-224-47', '', 1, ''),
(18, '0970284777', '-1.6782558', '29.2284861', '1508.5999755859375', '0', 3, 'sos-18-94', '', 1, ''),
(19, '0970284777', '-1.6782558', '29.2284861', '1508.5999755859375', '0', 3, 'sos-175-27', '', 1, ''),
(20, '0970284777', '-1.6784969', '29.2282645', '1508.5999755859375', '0', 3, 'sos-489-74', '', 1, ''),
(21, '0970284777', '-1.6788943', '29.2277594', '1509.4000244140625', '0', 3, 'sos-908-85', '', 1, ''),
(22, '0970284777', '-1.6782554', '29.228485', '1508.5999755859375', '0', 3, 'sos-997-90', '', 1, ''),
(23, '0970284777', '-1.6782784', '29.2284783', '1508.5999755859375', '0.1962171494960785', 3, 'sos-478-4', '', 1, ''),
(24, '0970284777', '-1.6782558', '29.2284861', '1508.5999755859375', '0', 3, 'sos-547-40', '', 1, ''),
(25, '0970284777', '-1.6782827', '29.2285186', '1508.2000732421875', '0', 3, 'sos-604-97', '', 1, ''),
(26, '0970284777', '-1.6782823', '29.2285187', '1508.2000732421875', '0', 3, 'sos-192-91', '', 1, ''),
(27, '0970284777', '-1.6782829', '29.2285189', '1508.2000732421875', '0', 3, 'sos-897-15', '', 1, ''),
(28, '0970284777', '-1.6782831', '29.2285195', '1508.2000732421875', '0', 3, 'sos-376-32', '', 1, ''),
(29, '0970284777', '-1.6769463', '29.2213246', '1508.2000732421875', '0', 3, 'sos-738-34', '', 1, '');

-- --------------------------------------------------------

--
-- Structure de la table `__tbl_users`
--

CREATE TABLE `__tbl_users` (
  `id` int(11) NOT NULL,
  `fsname` varchar(60) NOT NULL,
  `lsname` varchar(60) NOT NULL,
  `nickname` varchar(60) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `avatar` text NOT NULL,
  `password` text NOT NULL,
  `hospitalref` int(11) NOT NULL,
  `pushtoken` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `isactivated` int(11) NOT NULL COMMENT '1: account is activated, 0: other wise'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `__tbl_users`
--

INSERT INTO `__tbl_users` (`id`, `fsname`, `lsname`, `nickname`, `age`, `gender`, `phone`, `avatar`, `password`, `hospitalref`, `pushtoken`, `status`, `isactivated`) VALUES
(1, 'maene', 'david', 'maene', 26, 'masculin', '0970284772', '', '$2b$10$Wwpy7s6v1f4i1uC1OVpUf.vJt5QuFBZo088eQMzft7McrjV1dNc0G', 4, '', 1, 1),
(2, 'df', 'fr', '#', 25, 'Masculin', '07580258', 'default.jpg', '$2b$10$fd2mnug9EqA2VlqNoSodDeT0N/bo6z/VUhptSaIVc7LDamLoi8k8m', 0, '', 1, 0),
(3, 'dar', 'maene', 'me', 52, 'Masculin', '0970284777', 'default.jpg', '$2b$10$5xywNe.zQvFhAKH4HfZcP.K7lxKeccKTJZu2AwUefoHrT7q2/U7Ou', 3, '', 1, 1),
(5, 'david', 'maene', '#', 52, 'Masculin', '0970284778', 'default.jpg', '$2b$10$I4MKBhQgXtK0nhCIYe0M1OuHyRyD41d/EQRREe78giw4fjZYkap.i', 3, '', 1, 0),
(6, 'david', 'maene', '#', 52, 'Masculin', '0970284770', 'default.jpg', '$2b$10$./9WGr8xMg8evw0238VLCOgp7uzFCMLrIcJwo0Y69amqQMWTu7Sda', 3, '', 1, 0),
(7, 'david', 'maene', '#', 52, 'Masculin', '0970284779', 'default.jpg', '$2b$10$k71hDz/jPsydAywUvfGYEu/xyalaY1CbTE/eA7qGjwrP7SGe4HDJG', 3, '', 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `__tbl_agents`
--
ALTER TABLE `__tbl_agents`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `__tbl_customizedsms`
--
ALTER TABLE `__tbl_customizedsms`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `__tbl_hospital`
--
ALTER TABLE `__tbl_hospital`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `__tbl_news`
--
ALTER TABLE `__tbl_news`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `__tbl_sos`
--
ALTER TABLE `__tbl_sos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `refsos` (`refsos`);

--
-- Index pour la table `__tbl_users`
--
ALTER TABLE `__tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `__tbl_agents`
--
ALTER TABLE `__tbl_agents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `__tbl_customizedsms`
--
ALTER TABLE `__tbl_customizedsms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `__tbl_hospital`
--
ALTER TABLE `__tbl_hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `__tbl_news`
--
ALTER TABLE `__tbl_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `__tbl_sos`
--
ALTER TABLE `__tbl_sos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `__tbl_users`
--
ALTER TABLE `__tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
