use mssqlupc
go
CREATE TABLE CATEGORIA
(
IDCATEGORIA CHAR(1),
NOMBRE VARCHAR(80)
)
GO
CREATE TABLE PRODUCTO
(
IDPRODUCTO CHAR(4),
NOMBRE VARCHAR(200),
IDCATEGORIA CHAR(1),
PRECIO FLOAT,
STOCK FLOAT,
RUTAIMAGEN VARCHAR(200)
)
GO
SELECT RIGHT('00' + CONVERT(VARCHAR(2), 1), 2)
FROM Mytable

CREATE TABLE PEDIDO
(
ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
IDPEDIDO AS 'PE' + RIGHT('00' + CONVERT(VARCHAR(2), ID), 2) PERSISTED,
IDCLIENTE CHAR(3),
TOTALVENTA FLOAT,
REALIZADO BIT
)
GO
CREATE TABLE PEDIDODETALLE
(
IDPEDIDODETALLE INT IDENTITY(1,1) PRIMARY KEY,
IDPEDIDO VARCHAR(4),
IDPRODUCTO CHAR(4),
CANTIDAD DECIMAL(10,2),
PRECIO DECIMAL(10,2),
TOTAL AS ROUND(CANTIDAD*PRECIO,2) PERSISTED 
)
GO

/*C01	GIANFRANCO	CARRASCO	46056544	AV LIMA 1232	GIANFRANCO@GMAIL.COM	1234	999888333*/
CREATE TABLE CLIENTE 
(
ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY CLUSTERED,
IDCLIENTE AS 'C' + RIGHT('00' + CONVERT(VARCHAR(2), ID), 2) PERSISTED,
NOMBRES VARCHAR(70),
APELLIDOS VARCHAR(100),
DNI CHAR(8),
DIRECCION VARCHAR(20),
CORREO VARCHAR(100),
CONTRASENA VARCHAR(50),
TELEFONO VARCHAR(30)
)
GO

ALTER PROCEDURE REGISTRAR_PEDIDO
(
@IDPEDIDO VARCHAR(4),
@IDCLIENTE CHAR(3),
@TOTALVENTA FLOAT,
@REALIZADO BIT,
@IDPRODUCTO CHAR(4),
@CANTIDAD FLOAT,
@PRECIO FLOAT
)
AS
IF EXISTS(SELECT 1 FROM PEDIDO WHERE IDCLIENTE = @IDCLIENTE AND REALIZADO = 0)
BEGIN
	UPDATE PEDIDO SET TOTALVENTA = @TOTALVENTA WHERE IDCLIENTE = @IDCLIENTE
END
ELSE
BEGIN
	INSERT INTO PEDIDO (IDCLIENTE, TOTALVENTA, REALIZADO)
	VALUES (@IDCLIENTE,@TOTALVENTA,@REALIZADO)
	SET @IDPEDIDO = (SELECT IDPEDIDO FROM PEDIDO WHERE IDCLIENTE = @IDCLIENTE AND REALIZADO = 0)
END

IF EXISTS(SELECT 1 FROM PEDIDODETALLE WHERE IDPEDIDO = @IDPEDIDO AND IDPRODUCTO = @IDPRODUCTO)
BEGIN
	UPDATE PEDIDODETALLE SET CANTIDAD = CANTIDAD + @CANTIDAD, PRECIO = @PRECIO  WHERE IDPEDIDO = @IDPEDIDO AND IDPRODUCTO = @IDPRODUCTO
END
ELSE
BEGIN
	INSERT INTO PEDIDODETALLE (IDPEDIDO, IDPRODUCTO, CANTIDAD, PRECIO) VALUES (@IDPEDIDO, @IDPRODUCTO, @CANTIDAD, @PRECIO)
END

SELECT @IDPEDIDO
GO

CREATE PROCEDURE REGISTRAR_CLIENTE
(
@NOMBRES VARCHAR(70),
@APELLIDOS VARCHAR(100),
@DNI CHAR(8),
@DIRECCION VARCHAR(20),
@CORREO VARCHAR(100),
@CONTRASENA VARCHAR(50),
@TELEFONO VARCHAR(30)
)
AS
INSERT INTO CLIENTE 
(
NOMBRES,
APELLIDOS,
DNI,
DIRECCION,
CORREO,
CONTRASENA,
TELEFONO
)
VALUES
(@NOMBRES,
@APELLIDOS,
@DNI,
@DIRECCION,
@CORREO,
@CONTRASENA,
@TELEFONO
)

GO


CREATE PROCEDURE VALIDAR_CLIENTE
(
@CORREO VARCHAR(80), 
@CONTRASENA VARCHAR(80)
)
AS
SELECT A.IDCLIENTE, A.NOMBRES, A.APELLIDOS, A.DNI, A.DIRECCION, A.CORREO, A.TELEFONO, ISNULL(A.IDPEDIDO,'') AS IDPEDIDO FROM (
SELECT C.IDCLIENTE, C.NOMBRES, C.APELLIDOS, C.DNI, C.DIRECCION, C.CORREO, C.CONTRASENA, C.TELEFONO
, (
SELECT P.IDPEDIDO FROM PEDIDO P WHERE P.IDCLIENTE = C.IDCLIENTE AND P.REALIZADO = 0
) AS IDPEDIDO 
FROM CLIENTE C
WHERE UPPER(CORREO) = UPPER(@CORREO) AND UPPER(C.CONTRASENA) = UPPER(@CONTRASENA) 
) A
GO
CREATE PROCEDURE OBTENER_DETALLE_PRODUCTO
(
@IDPRODUCTO VARCHAR(5)
)
AS
SELECT * FROM PRODUCTO WHERE IDPRODUCTO=@IDPRODUCTO
GO
CREATE PROCEDURE OBTENER_PRODUCTOS_DESTACADOS
AS
SELECT TOP 8 * FROM PRODUCTO ORDER BY NEWID()
GO
CREATE PROCEDURE OBTENER_PRODUCTOS_N_TOP_ITEMS
(
@ITEMS INT
)
AS
SELECT TOP (@ITEMS) * FROM PRODUCTO ORDER BY NEWID()
GO
CREATE PROCEDURE OBTENER_PRODUCTOS_X_CATEGORIA
(
@CATEGORIA VARCHAR(5)
)
AS
SELECT * FROM PRODUCTO WHERE IDCATEGORIA = @CATEGORIA
GO
CREATE PROCEDURE ELIMINAR_PEDIDO
(
@IDPEDIDO VARCHAR(5),
@IDPRODUCTO VARCHAR(5)
)
AS
DELETE PEDIDODETALLE WHERE IDPEDIDO = @IDPEDIDO AND IDPRODUCTO = @IDPRODUCTO
GO
CREATE PROCEDURE ACTUALIZAR_PEDIDO
(
@IDPEDIDO VARCHAR(5),
@IDPRODUCTO VARCHAR(5),
@CANTIDAD FLOAT
)
AS
UPDATE PEDIDODETALLE SET CANTIDAD=@CANTIDAD WHERE IDPEDIDO=@IDPEDIDO AND IDPRODUCTO=@IDPRODUCTO
GO
CREATE PROCEDURE OBTENER_PEDIDO
(
@PEDIDO VARCHAR(5)
)
AS
SELECT PD.IDPEDIDODETALLE, PD.IDPEDIDO, PD.IDPRODUCTO, PR.NOMBRE AS NOMBREPRODUCTO, PR.RUTAIMAGEN, PD.CANTIDAD, PD.PRECIO, 
PD.TOTAL  FROM PEDIDO P 
INNER JOIN PEDIDODETALLE PD ON P.IDPEDIDO = PD.IDPEDIDO 
INNER JOIN PRODUCTO PR ON PD.IDPRODUCTO = PR.IDPRODUCTO
WHERE PD.IDPEDIDO = @PEDIDO AND REALIZADO=0
GO
CREATE PROCEDURE ACTUALIZAR_ESTADO_PEDIDO
(
@IDPEDIDO VARCHAR(5),
@REALIZADO BIT
)
AS
UPDATE PEDIDO SET REALIZADO=@REALIZADO WHERE IDPEDIDO=@IDPEDIDO
GO



INSERT INTO CATEGORIA (IDCATEGORIA, NOMBRE) VALUES ('V', 'VERDURAS')
INSERT INTO CATEGORIA (IDCATEGORIA, NOMBRE) VALUES ('M', 'ALIMENTOS MARINOS')
INSERT INTO CATEGORIA (IDCATEGORIA, NOMBRE) VALUES ('F', 'FRUTAS')
INSERT INTO CATEGORIA (IDCATEGORIA, NOMBRE) VALUES ('L', 'LACTEOS')

INSERT INTO PRODUCTO (IDPRODUCTO, NOMBRE, IDCATEGORIA, PRECIO, STOCK, RUTAIMAGEN)
VALUES
    ('P001', 'TOMATE', 'V', 4.5, 100,'../../assets/img/featured/feature-3.jpg'),
    ('P002', 'SAND�A', 'F', 3.9, 50, '../../assets/img/featured/feature-4.jpg'),
    ('P003', 'AR�NDANOS', 'F', 5.4, 30, '../../assets/img/featured/feature-5.jpg'),
	('P004', 'MANGO', 'F', 2.3, 30, '../../assets/img/featured/feature-7.jpg'),
	('P005', 'MANZANA', 'F', 7.7, 50, '../../assets/img/featured/feature-8.jpg'),
	('P006', 'LECHE SIN LACTOSA PASTEURIZADA', 'L', 19.8, 50, '../../assets/img/featured/feature-9.jpg'),
	('P007', 'CARNE PARA GUISO', 'M', 3.5, 200,'../../assets/img/featured/feature-1.jpg')
GO
	INSERT INTO PRODUCTO (IDPRODUCTO, NOMBRE, IDCATEGORIA, PRECIO, STOCK, RUTAIMAGEN)
	VALUES
	('P008', 'CALABAZA', 'F', 5.6, 200,'../../assets/img/featured/calabaza.jpg'),
	('P009', 'CARNE DE CERDO', 'M', 19.4, 200,'../../assets/img/featured/carne_cerdo.jpg'),
	('P010', 'CEBOLLA', 'M', 1.4, 200,'../../assets/img/featured/cebolla.jpg'),
	('P011', 'COLIFLOR', 'V', 2.7, 200,'../../assets/img/featured/coliflor.jpg'),
	('P012', 'ESPINACA', 'V', 2.8, 200,'../../assets/img/featured/espinaca.jpg'),
	('P013', 'FILETE DE CARNE', 'M', 20.4, 200,'../../assets/img/featured/filete_carne.jpg'),
	('P014', 'FILETE DE PESCADO', 'M', 25.9, 200,'../../assets/img/featured/filete_pescado.jpg'),
	('P015', 'LECHE 0 GRASAS', 'L', 7.8, 200,'../../assets/img/featured/leche_2.jpg'),
	('P016', 'LECHA PASTEURIZADA', 'L', 8.1, 200,'../../assets/img/featured/leche_3.jpg'),
	('P017', 'LECHUGA', 'V', 3.5, 200,'../../assets/img/featured/lechuga.jpg'),
	('P018', 'MANTEQUILLA', 'L', 14.3, 200,'../../assets/img/featured/mantequilla.jpg'),
	('P019', 'PEREJIL', 'V', 2.3, 200,'../../assets/img/featured/perejil.jpg'),
	('P020', 'PIERNA DE POLLO', 'M', 15.4, 200,'../../assets/img/featured/pierna_pollo.jpg'),
	('P021', 'QUESO CHEDDAR', 'L', 6.5, 200,'../../assets/img/featured/queso_cheddar.jpg'),
	('P022', 'QUESO FRESCO', 'L', 7.4, 200,'../../assets/img/featured/queso_fresco.jpg'),
	('P023', 'YOGUR', 'L', 8.9, 200,'../../assets/img/featured/yogur.jpg'),
	('P024', 'ZANAHORIA', 'V', 1.7, 200,'../../assets/img/featured/zanahoria.jpg'),
	('P025', 'BERENJENA', 'V', 1.8, 200,'../../assets/img/featured/berenjena.jpg')

GO
INSERT INTO CLIENTE (IDCLIENTE, NOMBRES, APELLIDOS, DNI, DIRECCION, CORREO, CONTRASENA) VALUES
('C01', 'GIANFRANCO','CARRASCO','46056544','AV LIMA 1232','GIANFRANCO@GMAIL.COM','1234')

GO
SELECT * FROM CLIENTE
SELECT * FROM PEDIDO
SELECT * FROM PEDIDODETALLE
SELECT * FROM CATEGORIA
SELECT * FROM PRODUCTO

DELETE FROM PEDIDO
DELETE FROM PEDIDODETALLE


GO
SELECT TOP 4 * FROM PRODUCTO ORDER BY NEWID()