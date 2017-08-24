PROJET SEQUENCEUR
BGE AOUT 2017

https://openclassrooms.com/courses/concevez-votre-site-web-avec-php-et-mysql/tp-creer-un-espace-membres



-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 24 août 2017 à 16:51
-- Version du serveur :  5.7.17
-- Version de PHP :  7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `users`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_pseudo` varchar(255) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_date` date NOT NULL,
  `user_token` varchar(32) NOT NULL,
  `user_statut` tinyint(1) NOT NULL COMMENT '1 = confirmer',
  `user_rights` tinyint(1) NOT NULL COMMENT '1 = admin'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_pseudo`, `user_pass`, `user_email`, `user_date`, `user_token`, `user_statut`, `user_rights`) VALUES
(1, 'demo', '13ddf4b9149e7c3f20586798047fc1fdaedee77d', 'demo@demo.fr', '2017-08-23', '', 1, 1),
(2, 'poutine', '53087a3b0f74ae329054aeb1da952b66fc04546e', 'poutine@poutine.fr', '2017-08-23', '', 0, 0),
(3, 'compte', '496fa80ce239926c8f1fabd3b9bdebf125eca962', '', '2017-08-23', '', 0, 0),
(4, 'compte', '9f616f7c67b25f64c791c56b9d6d1835bfe41021', 'compte@test.fr', '2017-08-23', '', 0, 0),
(5, 'demo2017', '13ddf4b9149e7c3f20586798047fc1fdaedee77d', 'demo@demo.demo', '2017-08-23', '', 0, 0),
(6, 'demo2017', '13ddf4b9149e7c3f20586798047fc1fdaedee77d', 'demo@demo.fr', '2017-08-23', '', 0, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
