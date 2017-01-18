-- phpMyAdmin SQL Dump
-- version 4.6.5.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 18. Jan 2017 um 22:34
-- Server-Version: 5.1.73
-- PHP-Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `Prod_LibraryGame`
--
CREATE DATABASE IF NOT EXISTS `Prod_LibraryGame` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `Prod_LibraryGame`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Badges`
--

CREATE TABLE `_Badges` (
  `badge_id` int(11) NOT NULL,
  `json_task_ids` text NOT NULL,
  `picture_id` int(11) DEFAULT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Badges_Descriptions`
--

CREATE TABLE `_Badges_Descriptions` (
  `badge_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `badgename` varchar(100) NOT NULL,
  `description_long` text NOT NULL,
  `solved_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Blocked_Tasks`
--

CREATE TABLE `_Blocked_Tasks` (
  `blocked_task_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ts_blocked` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Content`
--

CREATE TABLE `_Content` (
  `content_id` int(11) NOT NULL,
  `content_mapper` varchar(20) NOT NULL,
  `text` text NOT NULL,
  `language` varchar(10) DEFAULT NULL,
  `ts` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Content`
--

INSERT INTO `_Content` (`content_id`, `content_mapper`, `text`, `language`, `ts`) VALUES
(1, 'HOME_1', 'In diesem Spiel wirst du die Möglichkeit haben verschiedene Aufgaben zu lösen, damit Abzeichen und Punkte für dich und deine Fakultät zu sammeln. Diese Aufgaben haben den Zweck dir das wissenschaftliche Arbeiten an der Universität näher zu bringen. Zunächst solltest du dir deine Aufgaben anschauen.', 'de_DE', '2015-02-03 02:05:06'),
(5, 'TOU', 'AGB', 'de_DE', '2016-10-22 00:00:00'),
(6, 'PP', 'Datenschutzerklärungen', 'de_DE', '2016-10-22 00:00:00'),
(7, 'IMPRESSUM', 'Impressum', 'de_DE', '2016-10-22 00:00:00'),
(8, 'START', '<div style=\"text-align: center;\">The Game</div>', 'de_DE', '2016-10-22 00:00:00'),
(9, 'MAIN_PICTURE_ID', '1', 'de_DE', '2016-10-22 00:00:00'),
(10, 'ROOT_LOCATION', '1', 'de_DE', '2017-01-25 00:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Faculties`
--

CREATE TABLE `_Faculties` (
  `faculty_id` int(11) NOT NULL,
  `facultyname` varchar(100) NOT NULL,
  `faculty_score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Faculties`
--

INSERT INTO `_Faculties` (`faculty_id`, `facultyname`, `faculty_score`) VALUES
(-2, 'NONE', 0),
(1, 'VWL/ReWi', 0),
(2, 'FIM/WIM', 0),
(3, 'BWL', 0),
(4, 'Philos', 0),
(5, 'SoWi', 0),
(6, 'Sonstige', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Faculties_Descriptions`
--

CREATE TABLE `_Faculties_Descriptions` (
  `faculty_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `description_long` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Locations`
--

CREATE TABLE `_Locations` (
  `location_id` int(11) NOT NULL,
  `geo_lati` double NOT NULL,
  `geo_long` double NOT NULL,
  `geo_radius` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Locations`
--

INSERT INTO `_Locations` (`location_id`, `geo_lati`, `geo_long`, `geo_radius`) VALUES
(1, 49.4875, 8.45657, 30),
(2, 49.4855, 8.46122, 30),
(3, 49.4847, 8.4609, 30),
(4, 49.4831, 8.46133, 40),
(6, 49.4826, 8.464, 30),
(7, 49.48326, 8.46121, 40);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Locations_Descriptions`
--

CREATE TABLE `_Locations_Descriptions` (
  `location_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `locationname` varchar(100) NOT NULL,
  `description_long` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Locations_Descriptions`
--

INSERT INTO `_Locations_Descriptions` (`location_id`, `language`, `locationname`, `description_long`) VALUES
(1, 'de_DE', 'A5 Bibliothek', ''),
(2, 'de_DE', 'A3 Bibliothek', ''),
(3, 'de_DE', 'BWL Bibliothek', ''),
(4, 'de_DE', 'Jura Bibliothek', ''),
(6, 'de_DE', 'Schneckenhof Bibliothek', ''),
(7, 'de_DE', 'Schloss Ehrenhof', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Mapping_User_Types`
--

CREATE TABLE `_Mapping_User_Types` (
  `user_type_id` int(11) NOT NULL,
  `user_typename` varchar(100) NOT NULL,
  `language` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Mapping_User_Types`
--

INSERT INTO `_Mapping_User_Types` (`user_type_id`, `user_typename`, `language`) VALUES
(0, 'Nutzer', 'de_DE'),
(0, 'User', 'en_US'),
(1, 'Admin', 'de_DE'),
(1, 'Admin', 'en_US'),
(2, 'Superadmin', 'de_DE'),
(2, 'Superadmin', 'en_US');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Pictures`
--

CREATE TABLE `_Pictures` (
  `picture_id` int(11) NOT NULL,
  `picturename` varchar(300) NOT NULL,
  `picture_data` longblob NOT NULL,
  `type` varchar(100) NOT NULL,
  `ts_upload` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `_Pictures`
--

INSERT INTO `_Pictures` (`picture_id`, `picturename`, `picture_data`, `type`, `ts_upload`) VALUES
(1, 'Default Logo', 0xffd8ffe000104a46494600010101007800780000ffdb0043000201010201010202020202020202030503030303030604040305070607070706070708090b0908080a0807070a0d0a0a0b0c0c0c0c07090e0f0d0c0e0b0c0c0cffdb004301020202030303060303060c0807080c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0cffc00011080190019003012200021101031101ffc4001f0000010501010101010100000000000000000102030405060708090a0bffc400b5100002010303020403050504040000017d01020300041105122131410613516107227114328191a1082342b1c11552d1f02433627282090a161718191a25262728292a3435363738393a434445464748494a535455565758595a636465666768696a737475767778797a838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae1e2e3e4e5e6e7e8e9eaf1f2f3f4f5f6f7f8f9faffc4001f0100030101010101010101010000000000000102030405060708090a0bffc400b51100020102040403040705040400010277000102031104052131061241510761711322328108144291a1b1c109233352f0156272d10a162434e125f11718191a262728292a35363738393a434445464748494a535455565758595a636465666768696a737475767778797a82838485868788898a92939495969798999aa2a3a4a5a6a7a8a9aab2b3b4b5b6b7b8b9bac2c3c4c5c6c7c8c9cad2d3d4d5d6d7d8d9dae2e3e4e5e6e7e8e9eaf2f3f4f5f6f7f8f9faffda000c03010002110311003f00f93e8a28aff440f830a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800ad5f05781b5bf893e26b5d17c3ba3ea9af6b37a585b5869d6925d5cdc1552edb234059b0aac4e070013dabd47f61efd887c5bfb767c6387c2fe1b4169636c16e359d6268cb5b6916c4e37b0c8df2372123041720f2aaaeebfbd7fb22fec49f0fbf626f01ff0062f823485867b80bfda1aadced9751d5197a19a5c0e0724228545dcdb541639fce78dfc46c170faf6097b4aed5d453b24ba393e9e4b77e4b53b309839e225eee896eff00aebfd763f2bff67eff008377be2cfc468a2bbf1d6b7a07c3bb39164dd6ff00f216d4636046ccc5132c1b5b939fb46e1dd73c0fa8fc15ff0006e2fc1ed1ec74c6d73c57f10b5abfb611b5ef93736b67677ae305808fc879238db918131600f0f9e6bf4228afe7accbc55e24c64eeabfb35da0925f7bbcbef67bf4b2bc3c16aaefccf953fe1c93fb30ff00d132ff00cb8b56ff00e4aa3fe1c93fb30ffd132ffcb8b56ffe4aafaae8af9cff005bf3effa0dadff008327ff00c91d5f55a3fc8bee47c0de3eff008375fe08f89afb54bad1b5af1f786a4bb0ed676b05fc1736560e47ca02cb0b4ce80e090d36e232378ea3e54fda07fe0dd6f8a7f0f6d5aefc05e21d07e225bc71a136b22ff63ea1248ce4304495de028ab86dcd3a93f300b90377ed2515efe59e28f1260a49fd63da2ed34a49dbcfe2f5b495ccaa65f879ef1b7a687f2d7e3cf87baf7c2cf14dce87e26d1755f0feb367b7cfb0d4ad1ed6e61dca194b46e030054820e390411c1ac7afe95bf6affd8bbe1efeda3e056d13c73a24576f123ad8ea90058b51d299b196826c12bc8525486462abb9580c57e127edf5ff0004fbf17fec0df13574ad6ffe269e1ed4d9db45d7218f643a8c6b8cab2e4f972aee1b9093ea0b2906bfa0f823c4bc167cfeab557b2c47f2df4977e57f8b8bd52dae93678b8dcb25493a94f58fe2bfaee782514515fa61e4851451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140056a782bc1da97c44f18697a0e8f6b25eeadad5dc563676e9f7a69a47088a3ea48acbafd00ff00837abf66d8fe27fed47abf8ef50b7f374ff87b620daee5ca9beb9dd1c679ebb6259cf1c86286bc5e22ce219565b5b30a9b538deddded15f36d21a8ca72508eeddbfaf4dcfd43fd82bf636d1bf620fd9e34af0869eb05c6aaca2eb5bd45130da8de301bdb3d762fdc407a2a8ee493ed34515fc298fc757c6e2678bc4cb9a736db7e6ffad17447db51a31a5054e1b20a28aa7afebf63e14d0eef53d52f6d34dd374f85ee2eaeeea65860b6894166777621554004924e0015ca936ec8d4b9457e74fc7dff00838d3e1df80b5e363e02f07eb7e3d482668e6beb9bb1a3d9c8a002af0168e595f24b02248a3c6dc8c83547e0a7fc1c89e07f17789c59f8e7c03adf832c2678e38b50b1d417588e2dcd867993ca85d5147398d6563ce17d7ede1e1af134a87d656125cbbef1e6ff00c06fcdf2b5ce39e3f0f0972ca5a9fa494550f0c789f4ff001af86ec358d22f6db52d2f54b78eeeceeede41245730ba8647461c152a4107deafd7c44a328b7192b3475a9292e68ec15e6dfb59fecbfe1bfdb03e066b3e07f135ba496d7f1992cee76e65d36e954f957319ecc849ff00794b29cab107d268ad70f88ab87ab1af464e328b4d35ba6b6652763f978f8c5f0a358f817f14f5ff0007f8820fb3eb3e1cbe96c2e90676b323637292065186194f75607bd7355fa0ff00f07157c158fc13fb567873c616b6e90c1e35d1b65c32281e6dd5abec663ea7ca7807fc06bf3e2bfbab85739fed6ca68661d671d7fc4b497e299f1d8fc3aa1889538edbaf46aebf30a28a2be80e30a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800afdb8ff83787e1caf857f622d475c68944fe29f115cce24dbcbc30a470a8cfa07597fefa35f88f5ebdf007f6f8f8c7fb2fdb476de08f883e20d234e821921874d9645bdd3a05924f31ca5adc2c90a397c9dea81be66e7e66cfc671ef0ee2b3cca6597e126a326d3f7af6696b6d13eb6e86f86a8a9d68d5974ff26bf53fa4ea2bf06fe1e7fc1793f68ef056be6f352f12685e2fb7313462c756d0ada2b70c48c499b45824dc3040f9f6fcc720f18f54f87dff0007267c4bd37c4224f157803c0dace95e5b036da4bdd69971bf8dade6c925c2ed1ce479793ea2bf9eb15e0c711d2bfb3509ff00865f87bca3fe5e67d0c737a0f7ba3f642bf2c3fe0e2ffdacb50d28786be0ee9572f6f69a8db0d775d0871f694f3192da13fec868e4723b9119fe1ad3f00ffc1cbde1dd47c469178a3e13eb5a3e92518bdce95ae45a95cab63e5021921b75209ea7cc18f435f00ffc1467f6a7d3ff006cafdadfc47e3cd1adf53b3d13508ed6dec2df50444b98a38ade3421d51dd465c3b70c7ef7e15eff00879e1d66983cfa15f37c3f2c29a724ef192e6da3f0b6aeafccbd2e2c4e6345d09fb296af4ebd77fc2ebfe09e1b4515ebff00b187ec51e35fdb8be2ac7e1bf09d995b5b62926adab4c87ec9a440c48df23776386d918f99ca9c70accbfd218bc5d0c2d19623132518455db7b247cc7a1faf3ff040bf17ea5e28ff00827ae9d6f7eed243a1eb77da7d89607220dc936327ae249a403d0003b57da95c5fecf1f02742fd99be0b787bc0de1b84c5a4787ad45bc6cdf7e7724b492bff00b6eecceddb2c71c57695fc29c4d98d1c7e6d88c6e1d5a152726bd1bddf9bddf9b3ec3014674b0f1a73dd7e1e5f2d828a28af0cec3f2dbfe0e62b7b7ff846fe104a78bbfb4eaa8831f7936da16c9c763b7bf735f9395fa01ff070efc7bb7f88bfb58e8be0cb29fce87c03a5ecba03a25ddd6d95d7df110b7efc1247506bf3febfb43c2ec254c3f0c61615776a52f94a5292fbd34fe67cce7324f13caba24bf5fc2f6f90514515fa01e485145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051457d6dff04b0ff8262ea7fb7878f24d5758373a5fc37f0fdc2a6a77a836cba8cbc37d9203d376305dbf8158776515e766b9ae172dc24f1b8c972c23bbfd1776f648693949462aedec8c3ff8272ffc132bc5bfb7d78d0cd199741f01695304d5b5d78f396e0fd9ad94ff00ac9c8209fe18c1058e4a23feed7ecf1fb39f843f658f85d63e10f04e910e93a3d97ced8f9a6bb94801a699fac92360658f6000c2a8037fe1f7c3dd13e14782b4ef0e786f4bb3d1743d2211059d95ac612281073c0f5249249e4924924926b66bf8fb8e38fb19c415f97e0a117eec3ff6e97797e0b65d5bfa9c0e5d1a0b9e7acff2f25fe7d7f00a28a2be04f482bc43f6fcfdb77c3ffb0a7c07bcf13ea8d15d6b5761ad741d28b7cfa95dedc8040e4449c348fd8600f9994197f6dcfdbbbc11fb09fc323ae78a6ebed3aa5e064d2344b671f6cd5a518c8507ee46b905e56f954103e666546fc0cfdadbf6b7f187ed9df176ebc5fe31bc12dc3830d959c236db6996e18958225fee8c9c939663924935fa7f879e1ed7cf6bac562938e1a2f57b73dbecc7f57d365aedc98cc6c70f1bbd65d17eafcbf3fbdae23e2078f356f8a3e39d5fc49aede49a86b3aeddcb7d7b72fd6696462cc70381c9e00e00e0702b1e8a2bfafa9d38d38a841592d125d11f21393949ca5bb0a28a2ac90a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a280377e187c3bd4be2efc48d07c2da3c5e7eabe22d420d3ad13d6495c22e7d064e49ec01afe957f66bf803a27ecbdf03bc3be05f0f47b74ed02d160f34a80f7729e659df1c6f91cb31f76e38afc4eff0082167c3e87c77ff0514f0ccf709be3f0ed85eeac060fdf584c487f06994f3e95fbd75fcd3e39e735258ba195c5fb918f3bf36db4bee49dbfc47b592525294eb3e9a2fcdfe6828a28afc14fa20af92bfe0a5fff000557f0dfec1fa01d1f4c8ad3c49f122fe1df69a4b487c9d3d181db7174579099e4460877ec547ce3d17fe0a23fb5c27ec53fb2b6bfe358a3b6b8d6414d3f46b79f3e5dc5ecb909b80e4aa287908c8c88c8c8ce6bf9daf1e78ef58f89fe33d4fc43e20d42e755d6b59b87bbbdbbb86dd24f231c963dbe80700600000afd73c31f0fa19dd478fc77fbbc1dadfcf2dede515a5fbdecbadb8730c67d5e0b97e27b7979ff0097e3b59ea7c6af8e3e2bfda27e21def8abc67addeebfae5f9fde5c5c37dc5c92238d461638d727088028cf02b94a28afeafa3469d1a6a9528a8c5689256497923e527394e4e52776c28a28ad480a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2800a28a2803ed6ff00820dfc4ef0a7c24fdb3756d5bc61e23d03c2fa77fc22b770c379abea3158c0d335c5ae103c8caa58a8721739c0271c57ec07fc376fc10ffa2c9f0abff0adb0ff00e3b5fce9fc32f817e36f8d6f78be0df0778abc5a74e086ec68ba4cf7e6d43eed9e67948db776d6c6719da71d2bacff008612f8e1ff00446fe2affe1257ff00fc6abf23e33e02caf39cc7eb78bc67b39a8a8f2de3d35eaefadcf47038ba9420e308deeeff00825fa1fd007fc376fc10ff00a2c9f0abff000adb0ffe3b47fc376fc10ffa2c9f0abff0adb0ff00e3b5fcff00ff00c3097c70ff00a237f157ff00092bff00fe3547fc3097c70ffa237f157ff092bfff00e355f27ff108321ffa18fe30ff0033b7fb56bffcfbfccfbcbfe0e0efda87c17f183e1a7c37d13c19e35f0af8b225d4ef2faf9345d5adeffecc5228d2232794edb33e6c98c8e70de95f96f5dcfc43fd98be257c23d006abe2bf87be38f0c696655805e6ada0dd595b991b2553cc9115771c1c0ce4e0d70d5fb0707e4b85ca72c8e070757da462dfbda6adbbf4d34bd8f3b1b889d69a94d5b4fd58514515f50710514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451401fa9dff0006ccff00c857e32ffd72d1ff009df57eaf57e50ffc1b33ff00215f8cbff5cb47fe77d5fabd5fc6fe2dff00c95589f4a7ff00a6e07d2e4dfc07ebfa20a28a2bf373d73e17ff0083857fe4c161ff00b1a2c7ff0045dc57e1dd7ee27fc1c2bff260b0ff00d8d163ff00a2ee2bf0eebfacbc14ff00927a5ff5f25f944f9fcf7f8b4ffc3ffb74828a28afd78f0c28a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a0028a28a00fd4eff0083667fe42bf197feb968ff00cefabf57abf9faff0082667fc14bff00e1dd375e3293fe10aff84c7fe12d4b35c7f6c7f67fd93ece673ff3c25dfbbcef6c6def9e3eafff00889b3fea897fe5e1ff00dc35fcd3e22787f9fe699fd7c6e06873d392859f3416d08a7a3927ba7d0f732cc651a549c6a3b3bf9f91faad457e54ff00c44d9ff544bff2f0ff00ee1a3fe226cffaa25ff9787ff70d7c4ffc428e2aff00a05ffc9e9fff00267a3fda786fe6fc1ff91eddff00070aff00c982c3ff0063458ffe8bb8afc3bafb8bfe0a15ff00059aff0086f1f8049e07ff00856fff0008aecd520d4bedbff0907dbb3e5ac8bb3cbfb347d77f5ddc63a735f0ed7f43785f90e3b28c99e17308724f9e4ed74f46a3d62dae878f9b6269d69c1d277b46df8b7fa8514515fa31e5051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451400514514005145140051451401fffd9, 'image/jpeg', '2016-11-10 12:38:42');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Quests`
--

CREATE TABLE `_Quests` (
  `quest_id` int(11) NOT NULL,
  `questname` varchar(100) NOT NULL,
  `json_quest_task_ids` text NOT NULL,
  `json_pre_quest_ids` text NOT NULL,
  `score_rule` int(11) NOT NULL,
  `is_starter_quest` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Quests_Descriptions`
--

CREATE TABLE `_Quests_Descriptions` (
  `quest_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `questname` varchar(100) NOT NULL,
  `description_long` text NOT NULL,
  `solved_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Statistics`
--

CREATE TABLE `_Statistics` (
  `statistic_id` int(11) NOT NULL,
  `statistic_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `json_statistic` text NOT NULL,
  `ts_last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Statistics`
--

INSERT INTO `_Statistics` (`statistic_id`, `statistic_type_id`, `user_id`, `json_statistic`, `ts_last_update`) VALUES
(1, 1, 1, '[]', '2017-01-16 23:24:53'),
(2, 2, 1, '[]', '2017-01-16 23:24:53');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Statistics_Administration`
--

CREATE TABLE `_Statistics_Administration` (
  `statistic_id` int(11) NOT NULL,
  `statistic_type_id` int(11) NOT NULL,
  `json_statistic` text NOT NULL,
  `ts_last_update` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Statistics_Administration`
--

INSERT INTO `_Statistics_Administration` (`statistic_id`, `statistic_type_id`, `json_statistic`, `ts_last_update`) VALUES
(1, 1, '[]', '2017-01-17 10:44:09'),
(2, 2, '[]', '2017-01-17 10:44:09');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Tasks`
--

CREATE TABLE `_Tasks` (
  `task_id` int(11) NOT NULL,
  `task_type_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `json_task_data` text NOT NULL,
  `needed_value` int(11) NOT NULL,
  `score_rule` int(11) NOT NULL,
  `is_task_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Tasks_Descriptions`
--

CREATE TABLE `_Tasks_Descriptions` (
  `task_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `taskname` varchar(100) NOT NULL,
  `description_long` text NOT NULL,
  `solved_description` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Tasks_Types`
--

CREATE TABLE `_Tasks_Types` (
  `task_type_id` int(11) NOT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Tasks_Types`
--

INSERT INTO `_Tasks_Types` (`task_type_id`, `is_active`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Tasks_Types_Descriptions`
--

CREATE TABLE `_Tasks_Types_Descriptions` (
  `task_type_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `task_type_name` varchar(100) NOT NULL,
  `description_long` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Tasks_Types_Descriptions`
--

INSERT INTO `_Tasks_Types_Descriptions` (`task_type_id`, `language`, `task_type_name`, `description_long`) VALUES
(1, 'de_DE', 'Quizfragen', 'L&ouml;se eine oder mehrere Quizfragen, um Punkte zu erhalten.'),
(1, 'en_US', 'Quiz questions', 'Solve one or more quiz questions to collect experience.'),
(2, 'de_DE', 'Besuche Orte', 'Gehe zu einer Bibliothek oder anderen interessanten Ort und checke mit der Karte ein, dass du dort warst.'),
(2, 'en_US', 'Visit a place', 'Visit a special part of the library and check in with the map.\\r\\n'),
(3, 'de_DE', 'ISBN Suche', 'Suche ein Buch in der Bibliothek und scanne es ein!'),
(3, 'en_US', 'ISBN searching', 'Search for a book in the library and scan the ISBN.'),
(4, 'de_DE', 'Bewerte Quellen', 'Schaue dir verschiedene Quellen an und entscheide über deren Relevanz.'),
(4, 'en_US', 'Evaluate sources', 'Have a look at different sources and classify their relevance.'),
(5, 'de_DE', 'Lückentext', 'F&uuml;lle die fehlenden W&ouml;rter eines gegebenen Textes aus.'),
(5, 'en_US', 'Fill in the blank', 'Fill in the missing words of the given text.'),
(6, 'de_DE', 'QRCode Suche', 'Finde einen QRCode!'),
(6, 'en_US', 'QRCode Searching', 'Search for a QRCode!');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_Users`
--

CREATE TABLE `_Users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pwd_addition` varchar(100) NOT NULL,
  `pwd_login` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `language` varchar(10) NOT NULL,
  `user_score` int(11) NOT NULL,
  `completed_tasks` int(11) NOT NULL,
  `completed_badges` int(11) NOT NULL,
  `completed_quests` int(11) NOT NULL,
  `json_active_quest_ids` text NOT NULL,
  `json_active_task_ids` text NOT NULL,
  `ts_active` datetime NOT NULL,
  `ts_registration` datetime NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `is_user_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `_Users`
--

INSERT INTO `_Users` (`user_id`, `username`, `pwd_addition`, `pwd_login`, `email`, `user_type_id`, `language`, `user_score`, `completed_tasks`, `completed_badges`, `completed_quests`, `json_active_quest_ids`, `json_active_task_ids`, `ts_active`, `ts_registration`, `faculty_id`, `is_user_active`) VALUES
(1, 'Root', 'e616d35abf', '6d31180fb3450474fec0ccf9d92b937b', 'root@root.de', 2, 'de_DE', 0, 0, 0, 0, '[]', '[]', '2017-01-17 10:44:00', '2015-01-23 17:07:38', -2, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_User_Badge`
--

CREATE TABLE `_User_Badge` (
  `user_id` int(11) NOT NULL,
  `badge_id` int(11) NOT NULL,
  `completed` int(11) NOT NULL,
  `ts_badge_completed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_User_Quest`
--

CREATE TABLE `_User_Quest` (
  `user_id` int(11) NOT NULL,
  `quest_id` int(11) NOT NULL,
  `completed` int(11) NOT NULL,
  `ts_quest_completed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_User_Session`
--

CREATE TABLE `_User_Session` (
  `user_id` int(11) NOT NULL,
  `session_hash_id` varchar(150) NOT NULL,
  `json_data` text NOT NULL,
  `ts` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `_User_Task_Score`
--

CREATE TABLE `_User_Task_Score` (
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `ts_first_update` datetime NOT NULL,
  `ts_last_update` datetime NOT NULL,
  `json_ts_value_update` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `_Badges`
--
ALTER TABLE `_Badges`
  ADD PRIMARY KEY (`badge_id`);

--
-- Indizes für die Tabelle `_Badges_Descriptions`
--
ALTER TABLE `_Badges_Descriptions`
  ADD PRIMARY KEY (`badge_id`,`language`);

--
-- Indizes für die Tabelle `_Blocked_Tasks`
--
ALTER TABLE `_Blocked_Tasks`
  ADD PRIMARY KEY (`blocked_task_id`),
  ADD UNIQUE KEY `task_id` (`task_id`,`user_id`);

--
-- Indizes für die Tabelle `_Content`
--
ALTER TABLE `_Content`
  ADD PRIMARY KEY (`content_id`),
  ADD UNIQUE KEY `content_mapper` (`content_mapper`,`language`);

--
-- Indizes für die Tabelle `_Faculties`
--
ALTER TABLE `_Faculties`
  ADD PRIMARY KEY (`faculty_id`);

--
-- Indizes für die Tabelle `_Locations`
--
ALTER TABLE `_Locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indizes für die Tabelle `_Locations_Descriptions`
--
ALTER TABLE `_Locations_Descriptions`
  ADD PRIMARY KEY (`location_id`,`language`);

--
-- Indizes für die Tabelle `_Mapping_User_Types`
--
ALTER TABLE `_Mapping_User_Types`
  ADD PRIMARY KEY (`user_type_id`,`language`);

--
-- Indizes für die Tabelle `_Pictures`
--
ALTER TABLE `_Pictures`
  ADD PRIMARY KEY (`picture_id`);

--
-- Indizes für die Tabelle `_Quests`
--
ALTER TABLE `_Quests`
  ADD PRIMARY KEY (`quest_id`);

--
-- Indizes für die Tabelle `_Quests_Descriptions`
--
ALTER TABLE `_Quests_Descriptions`
  ADD PRIMARY KEY (`quest_id`,`language`);

--
-- Indizes für die Tabelle `_Statistics`
--
ALTER TABLE `_Statistics`
  ADD PRIMARY KEY (`statistic_id`);

--
-- Indizes für die Tabelle `_Statistics_Administration`
--
ALTER TABLE `_Statistics_Administration`
  ADD PRIMARY KEY (`statistic_id`);

--
-- Indizes für die Tabelle `_Tasks`
--
ALTER TABLE `_Tasks`
  ADD PRIMARY KEY (`task_id`);

--
-- Indizes für die Tabelle `_Tasks_Descriptions`
--
ALTER TABLE `_Tasks_Descriptions`
  ADD PRIMARY KEY (`task_id`,`language`);

--
-- Indizes für die Tabelle `_Tasks_Types`
--
ALTER TABLE `_Tasks_Types`
  ADD PRIMARY KEY (`task_type_id`);

--
-- Indizes für die Tabelle `_Tasks_Types_Descriptions`
--
ALTER TABLE `_Tasks_Types_Descriptions`
  ADD PRIMARY KEY (`task_type_id`,`language`);

--
-- Indizes für die Tabelle `_Users`
--
ALTER TABLE `_Users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indizes für die Tabelle `_User_Badge`
--
ALTER TABLE `_User_Badge`
  ADD PRIMARY KEY (`user_id`,`badge_id`);

--
-- Indizes für die Tabelle `_User_Quest`
--
ALTER TABLE `_User_Quest`
  ADD PRIMARY KEY (`user_id`,`quest_id`);

--
-- Indizes für die Tabelle `_User_Task_Score`
--
ALTER TABLE `_User_Task_Score`
  ADD PRIMARY KEY (`user_id`,`task_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
