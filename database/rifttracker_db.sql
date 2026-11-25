-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2026 a las 14:20:01
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
(4, 'Doran', 'Choi Hyeon-jun', 'TOP', '/assets/jugadores/doran.png', 'T1 Doran', 'KR1', 1),
(5, 'Oner', 'Mun Hyeon-jun', 'JUNGLE', '/assets/jugadores/oner.png', 'T1 Oner', 'KR1', 1),
(6, 'Peyz', 'Kim Su-hwan', 'ADC', '/assets/jugadores/peyz.png', 'T1 Peyz', 'KR1', 1),
(12, 'Kiin', 'Kim Gi-in', 'TOP', '/assets/jugadores/kiin.png', 'Kiin', 'GEN', 3),
(13, 'Canyon', 'Kim Geon-bu', 'JUNGLE', '/assets/jugadores/canyon.png', 'Canyon', 'GEN', 3),
(14, 'Chovy', 'Jeong Ji-hoon', 'MID', '/assets/jugadores/chovy.png', 'Chovy', 'GEN', 3),
(15, 'Ruler', 'Park Jae-hyuk', 'ADC', '/assets/jugadores/ruler.png', 'Ruler', 'GEN', 3),
(16, 'Duro', 'Joo Min-kyu', 'SUPPORT', '/assets/jugadores/duro.png', 'Duro', 'GEN', 3),
(17, 'Zeus', 'Mingi Pyeon', 'TOP', '/assets/jugadores/zeus.png', 'Zeus', 'HLE', 4),
(18, 'Kanavi', 'Jinhhyeok Seo', 'JUNGLE', '/assets/jugadores/kanavi.png', 'Kanavi', 'HLE', 4),
(19, 'Zeka', 'Geon-woo Kim', 'MID', '/assets/jugadores/zeka.png', 'Zeka', 'HLE', 4),
(20, 'Gumayusi', 'Minhyung lee', 'ADC', '/assets/jugadores/gumayusi.png', 'Gumayusi', 'HLE', 4),
(21, 'Delight', 'Hwanjung Yu', 'SUPPORT', '/assets/jugadores/delight.png', 'Delight', 'HLE', 4),
(22, 'Siwoo', 'Jeon Si-woo', 'TOP', '/assets/jugadores/siwoo.png', 'Siwoo', 'DK', 5),
(23, 'Lucid', 'Choi Yong-hyeok', 'JUNGLE', '/assets/jugadores/lucid.png', 'Lucid', 'DK', 5),
(24, 'ShowMaker', 'Heo Su', 'MID', '/assets/jugadores/showmaker.png', 'ShowMaker', 'DK', 5),
(25, 'Smash', 'Shin Geum-jae', 'ADC', '/assets/jugadores/smash.png', 'Smash', 'DK', 5),
(26, 'Career', 'Oh Hyeong-seok', 'SUPPORT', '/assets/jugadores/career.png', 'Career', 'DK', 5),
(27, 'PerfecT', 'Lee Seung-min', 'TOP', '/assets/jugadores/perfect.png', 'PerfecT', 'KT', 6),
(28, 'Cuzz', 'Moon Woo-chan', 'JUNGLE', '/assets/jugadores/cuzz.png', 'Cuzz', 'KT', 6),
(29, 'Bdd', 'Gwak Bo-seong', 'MID', '/assets/jugadores/bdd.png', 'Bdd', 'KT', 6),
(30, 'Jiwoo', 'Jung Ji-woo', 'ADC', '/assets/jugadores/jiwoo.png', 'Jiwoo', 'KT', 6),
(31, 'Effort', 'Lee Sang-ho', 'SUPPORT', '/assets/jugadores/effort.png', 'Effort', 'KT', 6),
(32, 'Clear', 'Song Hyeon-min', 'TOP', '/assets/jugadores/clear.png', 'Clear', 'BFX', 7),
(33, 'VicLa', 'Lee Dae-kwang', 'MID', '/assets/jugadores/vicla.png', 'VicLa', 'BFX', 7),
(34, 'Daystar', 'Yoo Ji-myeong', 'MID', '/assets/jugadores/daystar.png', 'Daystar', 'BFX', 7),
(35, 'Taeyoon', 'Kim Tae-yoon', 'ADC', '/assets/jugadores/taeyoon.png', 'Taeyoon', 'BFX', 7),
(36, 'Kellin', 'Kim Hyeong-gyu', 'SUPPORT', '/assets/jugadores/kellin.png', 'Kellin', 'BFX', 7),
(37, 'Rich', 'Lee Jae-won', 'TOP', '/assets/jugadores/rich.png', 'Rich', 'KRX', 8),
(38, 'Vincenzo', 'Ha Seung-min', 'JUNGLE', '/assets/jugadores/vicenzo.png', 'Vincenzo', 'KRX', 8),
(39, 'Ucal', 'Son Woo-hyeon', 'MID', '/assets/jugadores/ucal.png', 'Ucal', 'KRX', 8),
(40, 'Aiming', 'Kim Ha-ram', 'ADC', '/assets/jugadores/aiming.png', 'Aiming', 'KRX', 8),
(41, 'Andil', 'Moon Gwan-bin', 'SUPPORT', '/assets/jugadores/andil.png', 'Andil', 'KRX', 8),
(42, 'Kingen', 'Hwang Seong-hoon', 'TOP', '/assets/jugadores/kingen.png', 'Kingen', 'NS', 9),
(43, 'Sponge', 'Bae Young-jun', 'JUNGLE', '/assets/jugadores/sponge.png', 'Sponge', 'NS', 9),
(44, 'Scout', 'Lee Ye-chan', 'MID', '/assets/jugadores/scout.png', 'Scout', 'NS', 9),
(45, 'Diable', 'Nam Dae-geun', 'ADC', '/assets/jugadores/diable.png', 'Diable', 'NS', 9),
(46, 'Lehends', 'Son Si-woo', 'SUPPORT', '/assets/jugadores/lehends.png', 'Lehends', 'NS', 9),
(47, 'DuDu', 'Lee Dong-ju', 'TOP', '/assets/jugadores/dudu.png', 'DuDu', 'DNS', 10),
(48, 'Pyosik', 'Hong Chang-hyeon', 'JUNGLE', '/assets/jugadores/pysoki.png', 'Pyosik', 'DNS', 10),
(49, 'Clozer', 'Lee Ju-hyeon', 'MID', '/assets/jugadores/clozer.png', 'Clozer', 'DNS', 10),
(50, 'deokdam', 'Seo Dae-gil', 'ADC', '/assets/jugadores/deokdam.png', 'deokdam', 'DNS', 10),
(51, 'Peter', 'Jung Yoon-su', 'SUPPORT', '/assets/jugadores/peter.png', 'Peter', 'DNS', 10),
(52, 'Casting', 'Shin Min-jae', 'TOP', '/assets/jugadores/casting.png', 'Casting', 'BRO', 11),
(53, 'GIDEON', 'Kim Min-seong', 'JUNGLE', '/assets/jugadores/gideon.png', 'GIDEON', 'BRO', 11),
(54, 'Roamer', 'Cho Woo-jin', 'MID', '/assets/jugadores/roamer.png', 'Roamer', 'BRO', 11),
(55, 'Teddy', 'Park Jin-seong', 'ADC', '/assets/jugadores/teddy.png', 'Teddy', 'BRO', 11),
(56, 'Namgung', 'Namgung Seong-hoon', 'SUPPORT', '/assets/jugadores/namgung.png', 'Namgung', 'BRO', 11),
(57, 'BrokenBlade', 'Sergen Çelik', 'TOP', '/assets/jugadores/brokenblade.png', 'BrokenBlade', 'G2', 2),
(58, 'SkewMond', 'Rudy Semaan', 'JUNGLE', '/assets/jugadores/skewmond.png', 'SkewMond', 'G2', 2),
(59, 'Caps', 'Rasmus Borregaard Winther', 'MID', '/assets/jugadores/caps.png', 'Caps', 'G2', 2),
(60, 'Hans Sama', 'Steven Liv', 'ADC', '/assets/jugadores/hansama.png', 'Hans Sama', 'G2', 2),
(61, 'Labrov', 'Lampros Papoutsakis', 'SUPPORT', '/assets/jugadores/labrov.png', 'Labrov', 'G2', 2),
(62, 'Soboro', 'Lim Seong-min', 'TOP', '/assets/jugadores/soboro.png', 'Soboro', 'FNC', 12),
(63, 'Razork', 'Iván Martín Díaz', 'JUNGLE', '/assets/jugadores/razork.png', 'Razork', 'FNC', 12),
(64, 'Vladi', 'Vladimiros Kourtidis', 'MID', '/assets/jugadores/vladi.png', 'Vladi', 'FNC', 12),
(65, 'Upset', 'Elias Lipp', 'ADC', '/assets/jugadores/upset.png', 'Upset', 'FNC', 12),
(66, 'Lospa', 'Park Joon-hyeong', 'SUPPORT', '/assets/jugadores/lospa.png', 'Lospa', 'FNC', 12),
(67, 'Oscarinin', 'Óscar Muñoz Jiménez', 'TOP', '/assets/jugadores/oscarinin.png', 'Oscarinin', 'GX', 13),
(68, 'ISMA', 'Ismaïl Boualem', 'JUNGLE', '/assets/jugadores/isma.png', 'ISMA', 'GX', 13),
(69, 'Jackies', 'Adam Jeřábek', 'MID', '/assets/jugadores/jackies.png', 'Jackies', 'GX', 13),
(70, 'Flakked', 'Víctor Lirola Tortosa', 'ADC', '/assets/jugadores/flakked.png', 'Flakked', 'GX', 13),
(71, 'Jun', 'Yoon Se-jun', 'SUPPORT', '/assets/jugadores/jun.png', 'Jun', 'GX', 13),
(72, 'Canna', 'Kim Chang-dong', 'TOP', '/assets/jugadores/canna.png', 'Canna', 'KC', 14),
(73, 'Yike', 'Martin Sundelin', 'JUNGLE', '/assets/jugadores/yike.png', 'Yike', 'KC', 14),
(74, 'kyeahoo', 'Kang Ye-hoo', 'MID', '/assets/jugadores/kyeahoo.png', 'kyeahoo', 'KC', 14),
(75, 'Caliste', 'Caliste Henry-Hennebert', 'ADC', '/assets/jugadores/caliste.png', 'Caliste', 'KC', 14),
(76, 'Busio', 'Alan Cwalina', 'SUPPORT', '/assets/jugadores/busio.png', 'Busio', 'KC', 14),
(77, 'Myrwn', 'Álex Pastor Villarejo', 'TOP', '/assets/jugadores/myrwn.png', 'Myrwn', 'KOI', 15),
(78, 'Elyoya', 'Javier Prades Batalla', 'JUNGLE', '/assets/jugadores/elyoya.png', 'Elyoya', 'KOI', 15),
(79, 'Jojopyun', 'Joseph Joon Pyun', 'MID', '/assets/jugadores/jojopyun.png', 'Jojopyun', 'KOI', 15),
(80, 'Supa', 'David Martínez García', 'ADC', '/assets/jugadores/supa.png', 'Supa', 'KOI', 15),
(81, 'Alvaro', 'Álvaro Fernández del Amo', 'SUPPORT', '/assets/jugadores/alvaro.png', 'Alvaro', 'KOI', 15),
(82, 'Maynter', 'Volodymyr Sorokin', 'TOP', '/assets/jugadores/maynter.png', 'Maynter', 'NAVI', 16),
(83, 'Rhilech', 'Enes Uçan', 'JUNGLE', '/assets/jugadores/rhilech.png', 'Rhilech', 'NAVI', 16),
(84, 'Poby', 'Yoon Sung-won', 'MID', '/assets/jugadores/poby.png', 'Poby', 'NAVI', 16),
(85, 'SamD', 'Lee Jae-hoon', 'ADC', '/assets/jugadores/samd.png', 'SamD', 'NAVI', 16),
(86, 'Parus', 'Polat Furkan Çiçek', 'SUPPORT', '/assets/jugadores/parus.png', 'Parus', 'NAVI', 16),
(87, 'Rooster', 'Shin Yun-hwan', 'TOP', '/assets/jugadores/rooster.png', 'Rooster', 'SHF', 17),
(88, 'Sheo', 'Théo Borile', 'JUNGLE', '/assets/jugadores/sheo.png', 'Sheo', 'SHF', 17),
(89, 'nuc', 'Ilias Bizriken', 'MID', '/assets/jugadores/nuc.png', 'nuc', 'SHF', 17),
(90, 'Paduck', 'Park Seok-hyeon', 'ADC', '/assets/jugadores/paduck.png', 'Paduck', 'SHF', 17),
(91, 'Trymbi', 'Adrian Trybus', 'SUPPORT', '/assets/jugadores/trymbi.png', 'Trymbi', 'SHF', 17),
(92, 'Wunder', 'Martin Nordahl Hansen', 'TOP', '/assets/jugadores/wunder.png', 'Wunder', 'SK', 18),
(93, 'Skeanz', 'Duncan Marquet', 'JUNGLE', '/assets/jugadores/skeanz.png', 'Skeanz', 'SK', 18),
(94, 'SlowQ', 'Seo Ye-bit', 'MID', '/assets/jugadores/slowq.png', 'SlowQ', 'SK', 18),
(95, 'Jopa', 'Josip Čančar', 'ADC', '/assets/jugadores/jopa.png', 'Jopa', 'SK', 18),
(96, 'Mikyx', 'Mihael Mehle', 'SUPPORT', '/assets/jugadores/mikyx.png', 'Mikyx', 'SK', 18),
(97, 'Tracyn', 'Sebastian Wojtoń', 'TOP', '/assets/jugadores/tracyn.png', 'Tracyn', 'TH', 19),
(98, 'Daglas', 'Kacper Dagiel', 'JUNGLE', '/assets/jugadores/daglas.png', 'Daglas', 'TH', 19),
(99, 'Serin', 'Tolga Ölmez', 'MID', '/assets/jugadores/serin.png', 'Serin', 'TH', 19),
(100, 'Hype', 'Byeon Jeong-hyeon', 'ADC', '/assets/jugadores/hype.png', 'Hype', 'TH', 19),
(101, 'Way', 'Han Gil', 'SUPPORT', '/assets/jugadores/way.png', 'Way', 'TH', 19),
(102, 'Naak Nako', 'Kaan Okan', 'TOP', '/assets/jugadores/naaknako.png', 'Naak Nako', 'VIT', 20),
(103, 'Lyncas', 'Linas Nauncikas', 'JUNGLE', '/assets/jugadores/lyncas.png', 'Lyncas', 'VIT', 20),
(104, 'FIESTA', 'An Hyeon-seo', 'MID', '/assets/jugadores/fiesta.png', 'FIESTA', 'VIT', 20),
(105, 'Carzzy', 'Matyáš Orság', 'ADC', '/assets/jugadores/carzzy.png', 'Carzzy', 'VIT', 20),
(106, 'Fleshy', 'Kadir Kemiksiz', 'SUPPORT', '/assets/jugadores/fleshy.png', 'Fleshy', 'VIT', 20),
(107, 'Bin', 'Chen Ze-Bin', 'TOP', 'assets/jugadores/bin.png', 'Bin', 'BLG', 27),
(108, 'Xun', 'Peng Li-Xun', 'JUNGLE', 'assets/jugadores/xun.png', 'Xun', 'BLG', 27),
(109, 'Knight', 'Zhuo Ding', 'MID', 'assets/jugadores/knight.png', 'Knight', 'BLG', 27),
(110, 'Viper', 'Park Do-hyeon', 'ADC', 'assets/jugadores/viper.png', 'Viper', 'BLG', 27),
(111, 'ON', 'Luo Wen-Jun', 'SUPPORT', 'assets/jugadores/on.png', 'ON', 'BLG', 27),
(112, 'Breathe', 'Chen Chen', 'TOP', 'assets/jugadores/breathe.png', 'Breathe', 'AL', 28),
(113, 'Tarzan', 'Lee Seung-yong', 'JUNGLE', 'assets/jugadores/tarzan.png', 'Tarzan', 'AL', 28),
(114, 'Shanks', 'Cui Xiao-Jun', 'MID', 'assets/jugadores/shanks.png', 'Shanks', 'AL', 28),
(115, 'Hope', 'Wang Jie', 'ADC', 'assets/jugadores/hope.png', 'Hope', 'AL', 28),
(116, 'Kael', 'Kim Jin-hong', 'SUPPORT', 'assets/jugadores/kael.png', 'Kael', 'AL', 28),
(117, '369', 'Bai Jia-Hao', 'TOP', 'assets/jugadores/369.png', '369', 'TES', 29),
(118, 'Tian', 'Gao Tian-Liang', 'JUNGLE', 'assets/jugadores/tian.png', 'Tian', 'TES', 29),
(119, 'Creme', 'Lin Jian', 'MID', 'assets/jugadores/creme.png', 'Creme', 'TES', 29),
(120, 'JackeyLove', 'Yu Wen-Bo', 'ADC', 'assets/jugadores/jackeylove.png', 'JackeyLove', 'TES', 29),
(121, 'Zhuo', 'Wang Xu-Zhuo', 'SUPPORT', 'assets/jugadores/zhuo.png', 'Zhuo', 'TES', 29),
(122, 'TheShy', 'Kang Seung-lok', 'TOP', 'assets/jugadores/theshy.png', 'TheShy', 'IG', 30),
(123, 'Wei', 'Yan Yang-Wei', 'JUNGLE', 'assets/jugadores/wei.png', 'Wei', 'IG', 30),
(124, 'Rookie', 'Song Eui-jin', 'MID', 'assets/jugadores/rookie.png', 'Rookie', 'IG', 30),
(125, 'JiaQi', 'Zi Jia-Qi', 'ADC', 'assets/jugadores/jiaqi.png', 'JiaQi', 'IG', 30),
(126, 'Meiko', 'Tian Ye', 'SUPPORT', 'assets/jugadores/meiko.png', 'Meiko', 'IG', 30),
(127, 'JunJia', 'Yu Chun-Chia', 'JUNGLE', 'assets/jugadores/junjia.png', 'JunJia', 'JDG', 31),
(128, 'GALA', 'Chen Wei', 'ADC', 'assets/jugadores/gala.png', 'GALA', 'JDG', 31),
(129, 'Vampire', 'Zhao Zhe-Can', 'SUPPORT', 'assets/jugadores/vampire.png', 'Vampire', 'JDG', 31),
(130, 'HongQ', 'Tsai Ming-Hong', 'MID', 'assets/jugadores/hongq.png', 'HongQ', 'JDG', 31),
(131, 'Xiaoxu', 'Xu Xing-Zu', 'TOP', 'assets/jugadores/xiaoxu.png', 'Xiaoxu', 'JDG', 31),
(132, 'Elk', 'Zhao Jia-Hao', 'ADC', 'assets/jugadores/elk.png', 'Elk', 'WBG', 32),
(133, 'Zika', 'Tang Hua-Yu', 'TOP', 'assets/jugadores/zika.png', 'Zika', 'WBG', 32),
(134, 'Xiaohao', 'Peng Hao', 'JUNGLE', 'assets/jugadores/xiahao.png', 'Xiaohao', 'WBG', 32),
(135, 'Jwei', 'Sun Jun-Wei', 'SUPPORT', 'assets/jugadores/jewi.png', 'Jwei', 'WBG', 32),
(136, 'Xiaohu', 'Li Yuan-Hao', 'MID', 'assets/jugadores/xiaohu.png', 'Xiaohu', 'WBG', 32),
(137, 'HOYA', 'Yoon Yong-Ho', 'TOP', 'assets/jugadores/hoya.png', 'HOYA', 'NIP', 33),
(138, 'Care', 'Yang Jie', 'MID', 'assets/jugadores/care.png', 'Care', 'NIP', 33),
(139, 'Guwon', 'Gu Kwan-Mo', 'JUNGLE', 'assets/jugadores/guwon.png', 'Guwon', 'NIP', 33),
(140, 'fengyue', 'Wang Run-Lai', 'SUPPORT', 'assets/jugadores/fengyue.png', 'fengyue', 'NIP', 33),
(141, 'Photic', 'Ying Qi-Shen', 'ADC', 'assets/jugadores/photic.png', 'Photic', 'NIP', 33),
(142, 'Karis', 'Kim Hong-Jo', 'MID', 'assets/jugadores/karis.png', 'Karis', 'WE', 34),
(143, 'Erha', 'Shi Xu-Ye', 'SUPPORT', 'assets/jugadores/erha.png', 'Erha', 'WE', 34),
(144, 'Cube', 'Dai Yi', 'TOP', 'assets/jugadores/cube.png', 'Cube', 'WE', 34),
(145, 'About', 'Moon Hyeong-Seok', 'ADC', 'assets/jugadores/about.png', 'About', 'WE', 34),
(146, 'Monki', 'Wang Meng-Qi', 'JUNGLE', 'assets/jugadores/monki.png', 'Monki', 'WE', 34),
(147, 'Leave', 'Hu Hong-Chao', 'ADC', 'assets/jugadores/leave.png', 'Leave', 'EDG', 35),
(148, 'Parukia', 'Wang Bing-Yang', 'SUPPORT', 'assets/jugadores/parukia.png', 'Parukia', 'EDG', 35),
(149, 'Zdz', 'Zhu De-Zhang', 'TOP', 'assets/jugadores/zdz.png', 'Zdz', 'EDG', 35),
(150, 'Jiejie', 'Zhao Li-Jie', 'JUNGLE', 'assets/jugadores/jiejie.png', 'Jiejie', 'EDG', 35),
(151, 'BuLLDoG', 'Lee Tae-Young', 'MID', 'assets/jugadores/bulldog.png', 'BuLLDoG', 'EDG', 35),
(152, 'Keshi', 'Li Qing-Hua', 'TOP', 'assets/jugadores/keshi.png', 'Keshi', 'TT', 36),
(153, 'Junhao', 'Luo Jun-Hao', 'JUNGLE', 'assets/jugadores/junhao.png', 'Junhao', 'TT', 36),
(154, 'Heru', 'Kim Min-seong', 'MID', 'assets/jugadores/heru.png', 'Heru', 'TT', 36),
(155, 'Ahn', 'An Shan-Ye', 'ADC', 'assets/jugadores/ahn.png', 'Ahn', 'TT', 36),
(156, 'Feather', 'Wang Tian-Ci-Fu', 'SUPPORT', 'assets/jugadores/feather.png', 'Feather', 'TT', 36),
(157, 'Burdol', 'Noh Tae-yoon', 'TOP', 'assets/jugadores/burdol.png', 'Burdol', 'LGD', 37),
(158, 'Heng', 'Yang Cui-Heng', 'JUNGLE', 'assets/jugadores/default.png', 'Heng', 'LGD', 37),
(159, 'Tangyuan', 'Lin Yu-Hong', 'MID', 'assets/jugadores/tangyuan.png', 'Tangyuan', 'LGD', 37),
(160, 'Shaoye', 'Qiu Guo-Bin', 'ADC', 'assets/jugadores/shaoye.png', 'Shaoye', 'LGD', 37),
(161, 'Crisp', 'Liu Qing-Song', 'SUPPORT', 'assets/jugadores/crips.png', 'Crisp', 'LGD', 37),
(162, 'Sasi', 'Yan Rui', 'TOP', 'assets/jugadores/default.png', 'Sasi', 'UP', 38),
(163, 'climber', 'Wu Hong-Tao', 'JUNGLE', 'assets/jugadores/default.png', 'climber', 'UP', 38),
(164, 'Saber', 'Song Dai-Lin', 'MID', 'assets/jugadores/saber.png', 'Saber', 'UP', 38),
(165, 'Hena', 'Park Jeung-hwan', 'ADC', 'assets/jugadores/default.png', 'Hena', 'UP', 38),
(166, 'Xiaoxia', 'Xia Jing-Yao', 'SUPPORT', 'assets/jugadores/xiaoxia.png', 'Xiaoxia', 'UP', 38),
(167, 'sheer', 'Xu Wen-Jie', 'TOP', 'assets/jugadores/sheer.png', 'sheer', 'LNG', 39),
(168, 'Weiwei', 'Wei Bo-Han', 'JUNGLE', 'assets/jugadores/weiwei.png', 'Weiwei', 'LNG', 39),
(169, 'Nia', 'Zou Guang-Lu', 'MID', 'assets/jugadores/default.png', 'Nia', 'LNG', 39),
(170, '1xn', 'Li Sau Nam', 'ADC', 'assets/jugadores/1xn.png', '1xn', 'LNG', 39),
(171, 'MISSING', 'Lou Yun-Feng', 'SUPPORT', 'assets/jugadores/missing.png', 'MISSING', 'LNG', 39),
(172, 'Hery', 'Wang He-Yong', 'TOP', 'assets/jugadores/default.png', 'Hery', 'OMG', 40),
(173, 're0', 'Xu Han-Yang', 'JUNGLE', 'assets/jugadores/re0.png', 're0', 'OMG', 40),
(174, 'haichao', 'Zhang Hai-Chao', 'MID', 'assets/jugadores/default.png', 'haichao', 'OMG', 40),
(175, 'Photic', 'Ying Qi-Shen', 'ADC', 'assets/jugadores/default.png', 'Photic', 'OMG', 40),
(176, 'Moham', 'Jeong Jae-hun', 'SUPPORT', 'assets/jugadores/default.png', 'Moham', 'OMG', 40),
(177, 'Starry', 'Lei Ming', 'ADC', 'assets/jugadores/starry.png', 'Starry', 'OMG', 40);

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
(6, 2, 'MSI Winner', 2019),
(7, 1, 'MSI Winner', 2017),
(8, 1, 'MSI Winner', 2016),
(9, 1, 'LCK Winner', 2013),
(10, 1, 'LCK Winner', 2014),
(11, 1, 'LCK Winner', 2015),
(12, 1, 'LCK Winner', 2015),
(13, 1, 'LCK Winner', 2016),
(14, 1, 'LCK Winner', 2017),
(15, 1, 'LCK Winner', 2019),
(16, 1, 'LCK Winner', 2019),
(17, 1, 'LCK Winner', 2020),
(18, 1, 'LCK Winner', 2022),
(19, 3, 'World Championship', 2014),
(20, 3, 'World Championship', 2017),
(21, 3, 'LCK Winner', 2022),
(22, 3, 'LCK Winner', 2023),
(23, 3, 'LCK Winner', 2023),
(24, 3, 'LCK Winner', 2024),
(25, 3, 'LCK Winner', 2025),
(26, 3, 'LCK Winner', 2026),
(27, 3, 'MSI Winner', 2024),
(28, 3, 'MSI Winner', 2025),
(29, 4, 'MSI Winner', 2026),
(30, 4, 'LCK Winner', 2016),
(31, 4, 'LCK Winner', 2024),
(32, 5, 'LCK Winner', 2020),
(33, 5, 'LCK Winner', 2021),
(34, 5, 'LCK Winner', 2021),
(35, 5, 'World Championship', 2020),
(36, 6, 'LCK Winner', 2014),
(37, 6, 'LCK Winner', 2018),
(38, 2, 'LEC - Primavera', 2016),
(39, 2, 'LEC - Verano', 2016),
(40, 2, 'LEC - Primavera', 2017),
(41, 2, 'LEC - Verano', 2017),
(42, 2, 'LEC - Primavera', 2019),
(43, 2, 'LEC - Verano', 2019),
(44, 2, 'LEC - Primavera', 2020),
(45, 2, 'LEC - Verano', 2020),
(46, 2, 'LEC - Primavera', 2022),
(47, 2, 'LEC - Invierno', 2023),
(48, 2, 'LEC - Verano', 2023),
(49, 2, 'LEC - Season Finals', 2023),
(50, 2, 'LEC - Invierno', 2024),
(51, 2, 'LEC - Primavera', 2024),
(52, 2, 'LEC - Verano', 2024),
(53, 2, 'LEC - Season Finals', 2024),
(54, 2, 'LEC - Verano', 2025),
(55, 2, 'LEC - Versus', 2026),
(56, 2, 'LEC - Primavera', 2026),
(57, 2, 'LEC - Verano', 2026),
(58, 2, 'MSI', 2019),
(59, 12, 'LEC/EU LCS - Primavera', 2013),
(60, 12, 'LEC/EU LCS - Verano', 2013),
(61, 12, 'LEC/EU LCS - Primavera', 2014),
(62, 12, 'LEC/EU LCS - Primavera', 2015),
(63, 12, 'LEC/EU LCS - Verano', 2015),
(64, 12, 'LEC - Primavera', 2018),
(65, 12, 'LEC - Verano', 2018),
(66, 12, 'Worlds', 2011),
(67, 14, 'LEC - Invierno', 2025),
(68, 15, 'LEC - Primavera', 2021),
(69, 15, 'LEC - Verano', 2021),
(70, 15, 'LEC - Primavera', 2023),
(71, 15, 'LEC - Primavera', 2025),
(72, 17, 'LEC - Verano', 2022),
(73, 27, 'LPL - Primavera', 2024),
(74, 27, 'LPL - Verano', 2024),
(75, 27, 'LPL - Split 3', 2025),
(76, 27, 'LPL - Split 1', 2026),
(77, 27, 'LPL - Split 2', 2026),
(78, 27, 'Worlds', 2026),
(79, 28, 'LPL - Split 2', 2025),
(80, 28, 'LPL - Split 3', 2026),
(81, 29, 'LPL - Verano', 2020),
(82, 29, 'LPL - Split 1', 2025),
(83, 30, 'LPL - Primavera', 2019),
(84, 30, 'Worlds', 2018),
(85, 31, 'LPL - Primavera', 2020),
(86, 31, 'LPL - Verano', 2022),
(87, 31, 'LPL - Primavera', 2023),
(88, 31, 'LPL - Verano', 2023),
(89, 31, 'MSI', 2023),
(90, 34, 'LPL - Primavera', 2017),
(91, 35, 'LPL - Primavera', 2014),
(92, 35, 'LPL - Verano', 2014),
(93, 35, 'LPL - Primavera', 2015),
(94, 35, 'LPL - Verano', 2016),
(95, 35, 'LPL - Verano', 2017),
(96, 35, 'LPL - Verano', 2021),
(97, 35, 'Worlds', 2021),
(98, 37, 'LPL - Verano', 2015),
(99, 40, 'LPL - Primavera', 2013);

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
(1, 'Faker', 'faker@gmail.com', '$2b$10$UaUZxojEb6Dne6EI6dfkDuBJJya8TKOnuDUp/takveZQwLFaHGujG', 'USER', '2026-10-01 16:49:32'),
(2, 'Admin', 'admin@gmail.com', '$2b$10$6PsGbTB57FfnHO2TM3qQa.0A1WPXzcrsp77t2M0b44tJvmgI0nF6u', 'ADMIN', '2026-11-21 11:53:42');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT de la tabla `ligas`
--
ALTER TABLE `ligas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `palmares`
--
ALTER TABLE `palmares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
