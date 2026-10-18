-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2026 a las 13:44:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rifttracker_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `acronimo` varchar(10) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `historia` text DEFAULT NULL,
  `id_liga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id`, `nombre`, `acronimo`, `logo_url`, `historia`, `id_liga`) VALUES
(1, 'T1', 'T1', '/assets/logos/t1.png', 'Equipo legendario de la LCK con 5 títulos mundiales.', 1),
(2, 'G2 Esports', 'G2', 'assets/logos/g2.png', 'Dominadores históricos de la LEC europea.', 2),
(3, 'Gen.G Esports', 'GEN', '/assets/logos/geng.png', 'Equipo profesional de Corea del Sur.', 1),
(4, 'Hanwha Life Esports', 'HLE', '/assets/logos/hle.png', 'Equipo profesional de Corea del Sur.', 1),
(5, 'Dplus KIA', 'DK', '/assets/logos/dplus-kia.png', 'Equipo profesional de Corea del Sur.', 1),
(6, 'KT Rolster', 'KT', '/assets/logos/kt-rolster.png', 'Equipo profesional de Corea del Sur.', 1),
(7, 'BNK FEARX', 'BFX', '/assets/logos/bnk-fearx.png', 'Equipo profesional de Corea del Sur.', 1),
(8, 'Kiwoom DRX', 'KRX', '/assets/logos/kiwoom-drx.png', 'Equipo profesional de Corea del Sur.', 1),
(9, 'Nongshim RedForce', 'NS', '/assets/logos/nongshim-redforce.png', 'Equipo profesional de Corea del Sur.', 1),
(10, 'DN SOOPers', 'DNS', '/assets/logos/dn-soopers.png', 'Equipo profesional de Corea del Sur.', 1),
(11, 'HANJIN BRION', 'BRO', '/assets/logos/hanjin-brion.png', 'Equipo profesional de Corea del Sur.', 1),
(12, 'Fnatic', 'FNC', '/assets/logos/fnatic.png', 'Equipo profesional de la LEC.', 2),
(13, 'GIANTX', 'GX', '/assets/logos/giantx.png', 'Equipo profesional de la LEC.', 2),
(14, 'Karmine Corp', 'KC', '/assets/logos/karmine-corp.png', 'Equipo profesional de la LEC.', 2),
(15, 'Movistar KOI', 'MKOI', '/assets/logos/movistar-koi.png', 'Equipo profesional de la LEC.', 2),
(16, 'Natus Vincere', 'NAVI', '/assets/logos/natus-vincere.png', 'Equipo profesional de la LEC.', 2),
(17, 'Shifters', 'SHFT', '/assets/logos/shifters.png', 'Equipo profesional de la LEC.', 2),
(18, 'SK Gaming', 'SK', '/assets/logos/sk-gaming.png', 'Equipo profesional de la LEC.', 2),
(19, 'Team Heretics', 'TH', '/assets/logos/team-heretics.png', 'Equipo profesional de la LEC.', 2),
(20, 'Team Vitality', 'VIT', '/assets/logos/team-vitality.png', 'Equipo profesional de la LEC.', 2),
(27, 'Bilibili Gaming', 'BLG', '/assets/logos/bilibili-gaming.png', 'Equipo profesional de la LPL.', 3),
(28, 'Anyone\'s Legend', 'AL', '/assets/logos/anyones-legend.png', 'Equipo profesional de la LPL.', 3),
(29, 'Top Esports', 'TES', '/assets/logos/top-esports.png', 'Equipo profesional de la LPL.', 3),
(30, 'Invictus Gaming', 'IG', '/assets/logos/invictus-gaming.png', 'Equipo profesional de la LPL.', 3),
(31, 'JD Gaming', 'JDG', '/assets/logos/jd-gaming.png', 'Equipo profesional de la LPL.', 3),
(32, 'Weibo Gaming', 'WBG', '/assets/logos/weibo-gaming.png', 'Equipo profesional de la LPL.', 3),
(33, 'Ninjas in Pyjamas', 'NIP', '/assets/logos/ninjas-in-pyjamas.png', 'Equipo profesional de la LPL.', 3),
(34, 'Team WE', 'WE', '/assets/logos/team-we.png', 'Equipo profesional de la LPL.', 3),
(35, 'EDward Gaming', 'EDG', '/assets/logos/edward-gaming.png', 'Equipo profesional de la LPL.', 3),
(36, 'ThunderTalk Gaming', 'TT', '/assets/logos/thundertalk-gaming.png', 'Equipo profesional de la LPL.', 3),
(37, 'LGD Gaming', 'LGD', '/assets/logos/lgd-gaming.png', 'Equipo profesional de la LPL.', 3),
(38, 'Ultra Prime', 'UP', '/assets/logos/ultra-prime.png', 'Equipo profesional de la LPL.', 3),
(39, 'LNG Esports', 'LNG', '/assets/logos/lng-esports.png', 'Equipo profesional de la LPL.', 3),
(40, 'Oh My God', 'OMG', '/assets/logos/oh-my-god.png', 'Equipo profesional de la LPL.', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE `jugadores` (
  `id` int(11) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `nombre_real` varchar(100) DEFAULT NULL,
  `rol` enum('TOP','JUNGLE','MID','ADC','SUPPORT') NOT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `game_name` varchar(50) NOT NULL,
  `tag_line` varchar(10) NOT NULL,
  `id_equipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `jugadores`
--

INSERT INTO `jugadores` (`id`, `nickname`, `nombre_real`, `rol`, `foto_url`, `game_name`, `tag_line`, `id_equipo`) VALUES
(1, 'Faker', 'Lee Sang-hyeok', 'MID', '/assets/jugadores/faker.png', 'Hide on bush', 'KR1', 1),
(2, 'Keria', 'Ryu Min-seok', 'SUPPORT', '/assets/jugadores/keria.png', 'T1 Keria', 'KR1', 1),
(3, 'Caps', 'Rasmus Winther', 'MID', 'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Sylas.png', 'G2 Caps', 'EUW', 2),
(4, 'Doran', 'Choi Hyeon-jun', 'TOP', '/assets/jugadores/doran.png', 'T1 Doran', 'KR1', 1),
(5, 'Oner', 'Mun Hyeon-jun', 'JUNGLE', '/assets/jugadores/oner.png', 'T1 Oner', 'KR1', 1),
(6, 'Peyz', 'Kim Su-hwan', 'ADC', '/assets/jugadores/peyz.png', 'T1 Peyz', 'KR1', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ligas`
--

CREATE TABLE `ligas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `region` varchar(50) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `ligas`
--

INSERT INTO `ligas` (`id`, `nombre`, `region`, `logo_url`) VALUES
(1, 'LCK', 'Corea del Sur', '/assets/logos/lck.png'),
(2, 'LEC', 'Europa', '/assets/logos/lec.png'),
(3, 'LPL', 'China', '/assets/logos/lpl.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `palmares`
--

CREATE TABLE `palmares` (
  `id` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `anio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `palmares`
--

INSERT INTO `palmares` (`id`, `id_equipo`, `titulo`, `anio`) VALUES
(1, 1, 'World Championship', 2013),
(2, 1, 'World Championship', 2015),
(3, 1, 'World Championship', 2016),
(4, 1, 'World Championship', 2023),
(5, 1, 'World Championship', 2024),
(6, 2, 'MSI Winner', 2019);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` enum('USER','ADMIN') DEFAULT 'USER',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password_hash`, `rol`, `created_at`) VALUES
(1, 'Faker', 'faker@gmail.com', '$2b$10$UaUZxojEb6Dne6EI6dfkDuBJJya8TKOnuDUp/takveZQwLFaHGujG', 'USER', '2026-10-01 16:49:32');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acronimo` (`acronimo`),
  ADD KEY `id_liga` (`id_liga`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `ligas`
--
ALTER TABLE `ligas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `palmares`
--
ALTER TABLE `palmares`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ligas`
--
ALTER TABLE `ligas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `palmares`
--
ALTER TABLE `palmares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`id_liga`) REFERENCES `ligas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `jugadores`
--
ALTER TABLE `jugadores`
  ADD CONSTRAINT `jugadores_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `palmares`
--
ALTER TABLE `palmares`
  ADD CONSTRAINT `palmares_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
