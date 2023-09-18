--CREACION DE TABLAS Y BASE DE DATOS

CREATE SCHEMA IF NOT EXISTS minitrep

USE minitrep

CREATE TABLE IF NOT EXISTS minitrep.departamento (
	id_depar INT PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL
)

CREATE TABLE IF NOT EXISTS minitrep.mesa (
	id_mesa INT PRIMARY KEY,
	id_depar INT NOT NULL,
	FOREIGN KEY (id_depar) REFERENCES minitrep.departamento(id_depar)
)

CREATE TABLE IF NOT EXISTS minitrep.ciudadano (
	dpi VARCHAR(13) PRIMARY KEY NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	apellido VARCHAR(50) NOT NULL,
	direccion VARCHAR(75) NOT NULL,
	telefono VARCHAR(10) NOT NULL,
	edad INT NOT NULL,
	genero VARCHAR(1) NOT NULL
)

CREATE TABLE IF NOT EXISTS minitrep.voto (
	id_voto INT PRIMARY KEY NOT NULL,
	fechahora DATETIME NOT NULL,
	dpi VARCHAR(13) NOT NULL,
	id_mesa INT NOT NULL,
	FOREIGN KEY (dpi) REFERENCES minitrep.ciudadano(dpi),
	FOREIGN KEY (id_mesa) REFERENCES minitrep.mesa(id_mesa)
)

CREATE TABLE IF NOT EXISTS minitrep.partido (
	id_partido INT PRIMARY KEY NOT NULL,
	nombre_partido VARCHAR(50) NOT NULL,
	siglas VARCHAR(15) NOT NULL,
	fundacion DATE NOT NULL
)

CREATE TABLE IF NOT EXISTS minitrep.cargo (
	id_cargo INT PRIMARY KEY NOT NULL,
	cargo VARCHAR(40) NOT NULL
)

CREATE TABLE IF NOT EXISTS minitrep.candidato (
	id_candidato INT PRIMARY KEY NOT NULL,
	nombre VARCHAR(40) NOT NULL,
	fecha_naci DATE NOT NULL,
	id_cargo INT NOT NULL,
	id_partido INT NOT NULL,
	FOREIGN KEY (id_cargo) REFERENCES minitrep.cargo(id_cargo),
	FOREIGN KEY (id_partido) REFERENCES minitrep.partido(id_partido)
)

CREATE TABLE IF NOT EXISTS minitrep.detalle_voto (
	id_detalle INT AUTO_INCREMENT PRIMARY KEY,
	id_voto INT NOT NULL,
	id_candidato INT NOT NULL,
	FOREIGN KEY (id_voto) REFERENCES minitrep.voto(id_voto),
	FOREIGN KEY (id_candidato) REFERENCES minitrep.candidato(id_candidato)
)


--TABLAS TEMPORALES

CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpdepartamentos (
      id INT NOT NULL,
      nombre VARCHAR(25) NOT NULL
)

CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpmesas (
      id_mesa INT NOT NULL,
      id_departamento INT NOT NULL
)

CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpciudadanos (
      DPI VARCHAR(13) NOT NULL,
      Nombre VARCHAR(50) NOT NULL,
      Apellido VARCHAR(50) NOT NULL,
      Direccion VARCHAR(75) NOT NULL,
      Telefono VARCHAR(10) NOT NULL,
      Edad INT NOT NULL,
      Genero VARCHAR(1) NOT NULL
)

CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpcandidatos (
      id INT NOT NULL,
      nombres VARCHAR(40) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      cargo_id INT NOT NULL,
      partido_id INT NOT NULL
)

CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpcargos (
      id INT NOT NULL,
      cargo VARCHAR(40) NOT NULL
)

CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmppartidos (
      id_partido INT NOT NULL,
      nombrePartido VARCHAR(50) NOT NULL,
      Siglas VARCHAR(15) NOT NULL,
      Fundacion DATE NOT NULL
)
    
CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpvotaciones (
      id_voto INT NOT NULL,
      id_candidato INT NOT NULL,
      dpi_ciudadano VARCHAR(13) NOT NULL,
      mesa_id INT NOT NULL,
      fecha_hora DATETIME NOT NULL
)


--CONSULTA 1

SELECT 
    P.nombre_partido AS Partido, 
    CP.nombre AS Presidente, 
    CV.nombre AS Vicepresidente
FROM 
    minitrep.partido P
LEFT JOIN 
    minitrep.candidato CP 
ON CP.id_cargo = 1 AND P.id_partido = CP.id_partido
LEFT JOIN 
    minitrep.candidato CV 
ON CV.id_cargo = 2 AND P.id_partido = CV.id_partido
WHERE
    CP.id_candidato IS NOT NULL
    AND CV.id_candidato IS NOT NULL;
    
--CONSULTA 2

SELECT
    P.nombre_Partido AS Partido,
    COUNT(C.id_candidato) AS No_Candidatos
FROM
    minitrep.partido P
LEFT JOIN
    minitrep.candidato C
ON P.id_partido = C.id_partido
LEFT JOIN
    minitrep.cargo CR
ON C.id_cargo = CR.id_cargo
WHERE
    CR.cargo LIKE 'diputado congreso lista nacional'
    OR CR.cargo LIKE 'diputado congreso distrito electoral'
    OR CR.cargo LIKE 'diputado parlamento centroamericano'
GROUP BY
    P.nombre_Partido;


--CONSULTA 3

SELECT 
    P.nombre_partido AS Partido, 
    CA.nombre AS Alcalde
FROM 
    minitrep.partido P
LEFT JOIN 
    minitrep.candidato CA 
ON CA.id_cargo = 6 AND P.id_partido = CA.id_partido
WHERE
    CA.id_candidato IS NOT NULL


--CONSULTA 4

SELECT
            P.nombre_Partido AS Partido,
            COUNT(C.id_candidato) AS No_Candidatos
        FROM
            minitrep.partido P
        LEFT JOIN
            minitrep.candidato C
        ON P.id_partido = C.id_partido 
        WHERE
            P.nombre_Partido <> 'NULO'
        GROUP BY
            P.nombre_Partido;

--CONSULTA 5

SELECT
    Dep.nombre AS Departamento,
    COUNT(V.id_voto) AS No_Votos
FROM
    minitrep.departamento Dep
LEFT JOIN
    minitrep.mesa M
ON
    Dep.id_depar = M.id_depar
LEFT JOIN
    minitrep.voto V
ON
    M.id_mesa = V.id_mesa
GROUP BY
    Dep.nombre;

--CONSULTA 6

SELECT COUNT(DISTINCT id_voto) AS Total_Nulos,
COUNT(*) AS Nulos_Por_Persona
FROM minitrep.detalle_voto
WHERE id_candidato = -1;

--CONSULTA 7

SELECT edad, COUNT(*) AS Cantidad
FROM minitrep.ciudadano
GROUP BY edad
ORDER BY Cantidad DESC
LIMIT 10;

--CONSULTA 8

SELECT
    CP.nombre AS Presidente,
    CV.nombre AS Vicepresidente,
    SUM(CASE WHEN (V.id_candidato = CP.id_candidato) OR (V.id_candidato = CV.id_candidato) THEN 1 ELSE 0 END) AS Votos
FROM
    minitrep.partido P
LEFT JOIN
    minitrep.candidato CP
ON
    P.id_partido = CP.id_partido
    AND CP.id_cargo = 1  
INNER JOIN
    minitrep.candidato CV
ON
    P.id_partido = CV.id_partido
    AND CV.id_cargo = 2  
INNER JOIN
    minitrep.detalle_voto V
ON
    CP.id_candidato = V.id_candidato OR CV.id_candidato = V.id_candidato
GROUP BY
    P.nombre_partido, CP.id_candidato, CV.id_candidato
ORDER BY Votos DESC
LIMIT 10;

--CONSULTA 9

SELECT
    M.id_mesa AS No_Mesa,
    D.nombre AS Departamento,
    COUNT(*) AS Votos
FROM
    minitrep.mesa M
INNER JOIN
    minitrep.departamento D
ON
    M.id_depar = D.id_depar
INNER JOIN
    minitrep.voto V
ON
    M.id_mesa = V.id_mesa
GROUP BY
    M.id_mesa, D.nombre
ORDER BY
    Votos DESC
LIMIT 5;

--CONSULTA 10

SELECT 
    TIME_FORMAT(TIME(fechahora), '%H:%i') AS Hora,
    COUNT(fechahora) AS Votantes
FROM minitrep.voto V
GROUP BY V.fechahora
ORDER BY Votantes DESC
LIMIT 5;

--CONSULTA 11

SELECT 
    C.genero AS Genero,
    COUNT(*) AS Total
FROM minitrep.voto V
JOIN minitrep.ciudadano C
ON V.dpi = C.dpi
GROUP BY
    C.genero;
