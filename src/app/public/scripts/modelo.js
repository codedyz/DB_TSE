export const modelosql = [
    `CREATE SCHEMA IF NOT EXISTS minitrep`,

    `USE minitrep`,

    `CREATE TABLE IF NOT EXISTS minitrep.departamento (
      id_depar INT PRIMARY KEY,
      nombre VARCHAR(25) NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.mesa (
      id_mesa INT PRIMARY KEY,
      id_depar INT NOT NULL,
      FOREIGN KEY (id_depar) REFERENCES minitrep.departamento(id_depar)
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.ciudadano (
      dpi VARCHAR(13) PRIMARY KEY NOT NULL,
      nombre VARCHAR(50) NOT NULL,
      apellido VARCHAR(50) NOT NULL,
      direccion VARCHAR(75) NOT NULL,
      telefono VARCHAR(10) NOT NULL,
      edad INT NOT NULL,
      genero VARCHAR(1) NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.voto (
      id_voto INT PRIMARY KEY NOT NULL,
      fechahora DATETIME NOT NULL,
      dpi VARCHAR(13) NOT NULL,
      id_mesa INT NOT NULL,
      FOREIGN KEY (dpi) REFERENCES minitrep.ciudadano(dpi),
      FOREIGN KEY (id_mesa) REFERENCES minitrep.mesa(id_mesa)
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.partido (
      id_partido INT PRIMARY KEY NOT NULL,
      nombre_partido VARCHAR(50) NOT NULL,
      siglas VARCHAR(15) NOT NULL,
      fundacion DATE NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.cargo (
      id_cargo INT PRIMARY KEY NOT NULL,
      cargo VARCHAR(40) NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.candidato (
      id_candidato INT PRIMARY KEY NOT NULL,
      nombre VARCHAR(40) NOT NULL,
      fecha_naci DATE NOT NULL,
      id_cargo INT NOT NULL,
      id_partido INT NOT NULL,
      FOREIGN KEY (id_cargo) REFERENCES minitrep.cargo(id_cargo),
      FOREIGN KEY (id_partido) REFERENCES minitrep.partido(id_partido)
    )`,

    `CREATE TABLE IF NOT EXISTS minitrep.detalle_voto (
      id_detalle INT AUTO_INCREMENT PRIMARY KEY,
      id_voto INT NOT NULL,
      id_candidato INT NOT NULL,
      FOREIGN KEY (id_voto) REFERENCES minitrep.voto(id_voto),
      FOREIGN KEY (id_candidato) REFERENCES minitrep.candidato(id_candidato)
    )`
    
];
