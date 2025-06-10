-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2021 a las 19:36:23
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_almacen`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accesos`
--

CREATE TABLE `accesos` (
  `ACC_ID` int(11) NOT NULL,
  `PER_ID` int(11) NOT NULL,
  `ACC_NOMBRE` varchar(200) NOT NULL,
  `ACC_PAGINA` varchar(200) NOT NULL,
  `ACC_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `accesos`
--

INSERT INTO `accesos` (`ACC_ID`, `PER_ID`, `ACC_NOMBRE`, `ACC_PAGINA`, `ACC_ESTADO`) VALUES
(1, 2, 'REGISTRO CLIENTES', 'registrocliente', 'A'),
(2, 2, 'CATALOGO PRODUCTOS23', 'catalogo', 'A'),
(3, 3, 'REGISTRAR CATALOGO', 'mancatalogo', 'A'),
(4, 3, 'DESPACHAR PEDIDOS', 'despachar', 'A'),
(5, 1, 'REGISTRO EMPLEADOS34', 'registroempleados', 'A'),
(6, 1, 'CONSULTAR VENTAS', 'consultaventas', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `CLI_ID` int(11) NOT NULL,
  `CLI_CEDULA` varchar(150) NOT NULL,
  `CLI_NOMBRES` varchar(80) NOT NULL,
  `CLI_APELLIDOS` varchar(80) NOT NULL,
  `CLI_DIRECCION` varchar(200) DEFAULT NULL,
  `CLI_TELEFONO` varchar(80) DEFAULT NULL,
  `CLI_CORREO` varchar(80) DEFAULT NULL,
  `CLI_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`CLI_ID`, `CLI_CEDULA`, `CLI_NOMBRES`, `CLI_APELLIDOS`, `CLI_DIRECCION`, `CLI_TELEFONO`, `CLI_CORREO`, `CLI_ESTADO`) VALUES
(1, '1234567890', 'JAIME ', 'OROZCO', 'SALINAS', '123', 'jorozco@upse.edu.ec', 'A'),
(2, '2450134263\r\n', 'KENYA GISSELL\r\n', 'MEJILLON GONZALEZ', 'SANTA ELENA', '34112', 'kenya.mejillongonzalez@upse.edu.ec\r\n', 'A'),
(3, '0928146273\r\n', 'ROGER ALEXANDER\r\n', 'MUÑOZ ROCA\r\n', 'SANTA ELENA', '65453', 'roger.munozroca@upse.edu.ec\r\n', ''),
(4, '2400170631\r\n', 'JAMES ROGER\r\n', 'ORRALA MEREJILDO\r\n', 'SANTA ELANA', '3543534', 'james.orralamerejildo@upse.edu.ec\r\n', 'A'),
(5, '2450295874\r\n', 'JULIO ANTONIO\r\n', 'ORRALA MOREIRA\r\n', 'SANTA ELENA', '453', 'julio.orralamoreira@upse.edu.ec\r\n', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `DET_ID` int(11) NOT NULL,
  `TA_ID` int(11) DEFAULT NULL,
  `PED_ID` int(11) DEFAULT NULL,
  `DET_CANTIDAD` int(11) DEFAULT 0,
  `DET_PRECIO` decimal(18,2) DEFAULT 0.00,
  `DET_IVA` decimal(18,2) DEFAULT 0.00,
  `DET_TOTAL` decimal(18,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`DET_ID`, `TA_ID`, `PED_ID`, `DET_CANTIDAD`, `DET_PRECIO`, `DET_IVA`, `DET_TOTAL`) VALUES
(1, 4, 2, 1, '60.00', '7.20', '67.20'),
(2, 11, 2, 1, '120.00', '14.40', '134.40'),
(3, 17, 3, 1, '170.00', '20.40', '190.40'),
(4, 10, 4, 1, '120.00', '14.40', '134.40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `IMG_ID` int(11) NOT NULL,
  `PRO_ID` int(11) NOT NULL,
  `IMG_FOTO` varchar(150) DEFAULT NULL,
  `IMG_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`IMG_ID`, `PRO_ID`, `IMG_FOTO`, `IMG_ESTADO`) VALUES
(1, 1, '9278301405214.jpg', 'A'),
(2, 1, '9278302191646.jpg', 'A'),
(3, 1, '9278302978078.jpg', 'A'),
(4, 1, '9278303764510.jpg', 'A'),
(5, 1, '9278305337374.jpg', 'A'),
(6, 2, '9287447248926.jpg', 'A'),
(7, 2, '9287448035358.jpg', 'A'),
(8, 2, '9287448821790.jpg', 'A'),
(9, 2, '9287449608222.jpg', 'A'),
(10, 3, '9125826887710.jpg', 'A'),
(11, 3, '9125834752030.jpg', 'A'),
(12, 3, '9125835538462.jpg', 'A'),
(13, 3, '9125827674142.jpg', 'A'),
(14, 4, '9222027149342.jpg', 'A'),
(15, 4, '9222028722206.jpg', 'A'),
(16, 4, '9222027935774.jpg', 'A'),
(17, 4, '9222029508638.jpg', 'A'),
(18, 4, '9222030295070.jpg', 'A'),
(19, 4, '9192500199454.jpg', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros`
--

CREATE TABLE `parametros` (
  `PARAM_ID` int(11) NOT NULL,
  `PARAM_CODIGO` varchar(20) NOT NULL,
  `PARAM_VALOR` double NOT NULL,
  `PARAM_DESC` varchar(200) NOT NULL,
  `PARAM_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parametros`
--

INSERT INTO `parametros` (`PARAM_ID`, `PARAM_CODIGO`, `PARAM_VALOR`, `PARAM_DESC`, `PARAM_ESTADO`) VALUES
(1, 'IVA', 12, 'VALOR DEL IVA ACTUAL 12%', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `PED_ID` int(11) NOT NULL,
  `CLI_ID` int(11) NOT NULL,
  `USR_ID` int(11) NOT NULL,
  `PED_FECHA` timestamp NULL DEFAULT NULL,
  `PED_SUBTOTAL` float NOT NULL,
  `PED_IVA` float NOT NULL,
  `PED_TOTAL` float NOT NULL,
  `PED_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`PED_ID`, `CLI_ID`, `USR_ID`, `PED_FECHA`, `PED_SUBTOTAL`, `PED_IVA`, `PED_TOTAL`, `PED_ESTADO`) VALUES
(1, 1, 1, '2021-08-25 14:18:42', 2, 3, 23, 'A'),
(2, 2, 2, '2021-09-01 13:50:18', 180, 21.6, 201.6, 'A'),
(3, 3, 1, '2021-09-02 13:50:18', 170, 20.4, 190.4, 'A'),
(4, 5, 2, '2021-08-03 13:54:20', 120, 14.4, 134.4, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `PER_ID` int(11) NOT NULL,
  `PER_DECRIPCION` varchar(200) NOT NULL,
  `PER_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`PER_ID`, `PER_DECRIPCION`, `PER_ESTADO`) VALUES
(1, 'ARMINISTRADOR', 'A'),
(2, 'CLIENTE', 'A'),
(3, 'EMPLEADO', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `PRO_ID` int(11) NOT NULL,
  `PRO_CODIGO` varchar(80) DEFAULT NULL,
  `PRO_NOMBRE` varchar(80) DEFAULT NULL,
  `PRO_DESCRIPCION` varchar(250) NOT NULL,
  `PRO_FOTO` varchar(80) NOT NULL,
  `PRO_PRECIO` decimal(18,2) DEFAULT 0.00,
  `PRO_ESTADO` varchar(1) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`PRO_ID`, `PRO_CODIGO`, `PRO_NOMBRE`, `PRO_DESCRIPCION`, `PRO_FOTO`, `PRO_PRECIO`, `PRO_ESTADO`) VALUES
(1, 'GZ0094', 'adidas Deep Threat Primeblue23', 'Zapatos Básquet Niño/Niña', '9278301405214.jpg', '60.00', 'A'),
(2, 'DJ3071-101', 'Nike Free Metcon 4', 'Zapatos Entrenar Mujer', '9287447248926.jpg', '165.00', 'A'),
(3, 'AT5292-010', 'Nike Tiempo Legend 8 Academy MG', 'Zapatos Fútbol Hombre/Mujer', '9125826101278.jpg', '120.00', 'A'),
(4, 'FV2969', 'Reebok Kamikaze II', 'Zapatos Básquet Hombre', '9222026362910.jpg', '170.00', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tallas`
--

CREATE TABLE `tallas` (
  `TA_ID` int(11) NOT NULL,
  `PRO_ID` int(11) DEFAULT NULL,
  `TA_TALLA` varchar(10) NOT NULL,
  `TA_STOCK` int(11) DEFAULT NULL,
  `TA_ESTADO` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tallas`
--

INSERT INTO `tallas` (`TA_ID`, `PRO_ID`, `TA_TALLA`, `TA_STOCK`, `TA_ESTADO`) VALUES
(1, 1, '34.5', 4, 'A'),
(2, 1, '35', 2, 'A'),
(3, 1, '36', 4, 'A'),
(4, 1, '37', 1, 'A'),
(5, 2, '35', 12, 'A'),
(6, 2, '36', 3, 'A'),
(7, 2, '37', 1, 'A'),
(8, 2, '38', 1, 'A'),
(9, 3, '38', 2, 'A'),
(10, 3, '39', 4, 'A'),
(11, 3, '40', 2, 'A'),
(12, 3, '41', 2, 'A'),
(13, 3, '42', 1, 'A'),
(14, 3, '43', 2, 'A'),
(15, 4, '38', 2, 'A'),
(16, 4, '40', 1, 'A'),
(17, 4, '42', 4, 'A'),
(18, 4, '44', 3, 'A'),
(19, 4, '46', 1, 'A'),
(20, 4, '41', 5, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `USR_ID` int(11) NOT NULL,
  `USR_NOMBRES` varchar(100) NOT NULL,
  `USR_USUARIO` varchar(60) NOT NULL,
  `USR_CLAVE` varchar(60) NOT NULL,
  `PER_ID` int(11) NOT NULL,
  `USR_ESTADO` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`USR_ID`, `USR_NOMBRES`, `USR_USUARIO`, `USR_CLAVE`, `PER_ID`, `USR_ESTADO`) VALUES
(1, 'CARLOS TORRES', 'jorozco', '123', 1, 'A'),
(2, 'VIVIANA CARNENAS', 'vcardenas', '123', 2, 'A'),
(3, 'MARCELA SANTOS', 'msantos', '123', 3, 'A');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accesos`
--
ALTER TABLE `accesos`
  ADD PRIMARY KEY (`ACC_ID`),
  ADD KEY `FK_ACCESOS_PERFIL` (`PER_ID`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`CLI_ID`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`DET_ID`),
  ADD KEY `FK_DETALLE_PEDIDOS` (`PED_ID`),
  ADD KEY `FK_DETALLE_TALLAS` (`TA_ID`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`IMG_ID`),
  ADD KEY `FK_IMAGENES_PRODUCTO` (`PRO_ID`);

--
-- Indices de la tabla `parametros`
--
ALTER TABLE `parametros`
  ADD PRIMARY KEY (`PARAM_ID`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`PED_ID`),
  ADD KEY `FK_PEDIDOS_CLIENTE` (`CLI_ID`),
  ADD KEY `FK_PEDIDOS_USUARIO` (`USR_ID`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`PER_ID`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`PRO_ID`);

--
-- Indices de la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD PRIMARY KEY (`TA_ID`),
  ADD KEY `FK_TALLA_PRODUCTO` (`PRO_ID`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`USR_ID`),
  ADD KEY `FK_USUARIOS_PERFIL` (`PER_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `accesos`
--
ALTER TABLE `accesos`
  MODIFY `ACC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `CLI_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `DET_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `IMG_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `parametros`
--
ALTER TABLE `parametros`
  MODIFY `PARAM_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `PED_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `PER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `PRO_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tallas`
--
ALTER TABLE `tallas`
  MODIFY `TA_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `USR_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `accesos`
--
ALTER TABLE `accesos`
  ADD CONSTRAINT `FK_ACCESOS_PERFIL` FOREIGN KEY (`PER_ID`) REFERENCES `perfil` (`PER_ID`);

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `FK_DETALLE_PEDIDOS` FOREIGN KEY (`PED_ID`) REFERENCES `pedidos` (`PED_ID`),
  ADD CONSTRAINT `FK_DETALLE_TALLAS` FOREIGN KEY (`TA_ID`) REFERENCES `tallas` (`TA_ID`);

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `FK_IMAGENES_PRODUCTO` FOREIGN KEY (`PRO_ID`) REFERENCES `producto` (`PRO_ID`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `FK_PEDIDOS_CLIENTE` FOREIGN KEY (`CLI_ID`) REFERENCES `clientes` (`CLI_ID`),
  ADD CONSTRAINT `FK_PEDIDOS_USUARIO` FOREIGN KEY (`USR_ID`) REFERENCES `usuarios` (`USR_ID`);

--
-- Filtros para la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD CONSTRAINT `FK_TALLA_PRODUCTO` FOREIGN KEY (`PRO_ID`) REFERENCES `producto` (`PRO_ID`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_USUARIOS_PERFIL` FOREIGN KEY (`PER_ID`) REFERENCES `perfil` (`PER_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
