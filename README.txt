PROJET SEQUENCEUR
BGE AOUT 2017

https://openclassrooms.com/courses/concevez-votre-site-web-avec-php-et-mysql/tp-creer-un-espace-membres

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:8889
-- Généré le :  Lun 21 Août 2017 à 23:05
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `users`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `email` varbinary(255) NOT NULL,
  `date_registration` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `pass`, `email`, `date_registration`) VALUES
(1, 'demo', 'demo', 0x64656d6f4064656d6f2e636f6d, '0000-00-00'),
(2, 'demo1', 'demo2', 0x64656d6f324064656d6f2e636f6d, '0000-00-00'),
(3, 'test', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 0x7465737440746573742e6672, '2017-08-21'),
(4, 'godmod', 'd2bb8b0119471afae24cb4f513bf30dc6c7bd101', 0x676f646d6f6440676f642e636f6d, '2017-08-21');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;