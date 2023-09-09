CREATE TABLE CIUDADANOS(
    dpi INT(13) NOT NULL PRIMARY KEY ,
    nombre VARCHAR(25) NOT NULL ,
    apellido VARCHAR(25) NOT NULL ,
    direccion VARCHAR(50) NOT NULL ,
    telefono INT NOT NULL ,
    edad INT NOT NULL ,
    genero VARCHAR(1) NOT NULL
);