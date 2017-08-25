-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2017 a las 01:19:52
-- Versión del servidor: 5.7.14
-- Versión de PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_papp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `cte_id` int(11) NOT NULL,
  `cte_documento` int(11) NOT NULL,
  `cte_nombre` varchar(250) NOT NULL,
  `cte_direccion` varchar(250) NOT NULL,
  `cte_fecha_nacimiento` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`cte_id`, `cte_documento`, `cte_nombre`, `cte_direccion`, `cte_fecha_nacimiento`) VALUES
(1, 1234, 'Pablo', 'Calle 123 # 19', '1990-04-16'),
(2, 56678, 'Pedro', 'Diag 20 # 50 -76', '1942-11-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `cta_id` int(11) NOT NULL,
  `cta_tipo` int(11) NOT NULL,
  `cta_cliente` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`cta_id`, `cta_tipo`, `cta_cliente`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_tipo`
--

CREATE TABLE `cuenta_tipo` (
  `ctp_id` int(11) NOT NULL,
  `ctp_nombre` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cuenta_tipo`
--

INSERT INTO `cuenta_tipo` (`ctp_id`, `ctp_nombre`) VALUES
(1, 'Ahorros'),
(2, 'Corriente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_tipo_transaccion`
--

CREATE TABLE `cuenta_tipo_transaccion` (
  `ctt_id` int(11) NOT NULL,
  `ctt_nombre` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cuenta_tipo_transaccion`
--

INSERT INTO `cuenta_tipo_transaccion` (`ctt_id`, `ctt_nombre`) VALUES
(1, 'Entrada'),
(2, 'Salida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_transaccion`
--

CREATE TABLE `cuenta_transaccion` (
  `ctr_id` int(11) NOT NULL,
  `ctr_cuenta` int(11) NOT NULL,
  `ctr_tipo_transaccion` int(11) NOT NULL,
  `ctr_cuenta_transaccion` int(11) NOT NULL,
  `ctr_monto` int(11) NOT NULL,
  `ctr_fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cuenta_transaccion`
--

INSERT INTO `cuenta_transaccion` (`ctr_id`, `ctr_cuenta`, `ctr_tipo_transaccion`, `ctr_cuenta_transaccion`, `ctr_monto`, `ctr_fecha`) VALUES
(1, 1, 1, 1, 250000, '2017-08-25 01:18:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta_debito`
--

CREATE TABLE `tarjeta_debito` (
  `tjd_numero` varchar(250) NOT NULL,
  `tjd_cuenta` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarjeta_debito`
--

INSERT INTO `tarjeta_debito` (`tjd_numero`, `tjd_cuenta`) VALUES
('9988-5689-5678-6789', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`cte_id`);

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`cta_id`),
  ADD KEY `cta_cliente` (`cta_cliente`),
  ADD KEY `cta_tipo` (`cta_tipo`);

--
-- Indices de la tabla `cuenta_tipo`
--
ALTER TABLE `cuenta_tipo`
  ADD PRIMARY KEY (`ctp_id`);

--
-- Indices de la tabla `cuenta_tipo_transaccion`
--
ALTER TABLE `cuenta_tipo_transaccion`
  ADD PRIMARY KEY (`ctt_id`);

--
-- Indices de la tabla `cuenta_transaccion`
--
ALTER TABLE `cuenta_transaccion`
  ADD PRIMARY KEY (`ctr_id`),
  ADD KEY `ctr_cuenta` (`ctr_cuenta`),
  ADD KEY `ctr_cuenta_transaccion` (`ctr_cuenta_transaccion`);

--
-- Indices de la tabla `tarjeta_debito`
--
ALTER TABLE `tarjeta_debito`
  ADD PRIMARY KEY (`tjd_numero`),
  ADD KEY `tjd_cuenta` (`tjd_cuenta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `cte_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `cta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `cuenta_tipo`
--
ALTER TABLE `cuenta_tipo`
  MODIFY `ctp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `cuenta_tipo_transaccion`
--
ALTER TABLE `cuenta_tipo_transaccion`
  MODIFY `ctt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `cuenta_transaccion`
--
ALTER TABLE `cuenta_transaccion`
  MODIFY `ctr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
