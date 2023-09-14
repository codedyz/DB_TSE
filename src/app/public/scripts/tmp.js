export const tmpsql = [ 
    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpdepartamentos (
      id INT NOT NULL,
      nombre VARCHAR(25) NOT NULL
    )`,

    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpmesas (
      id_mesa INT NOT NULL,
      id_departamento INT NOT NULL
    )`,

    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpciudadanos (
      DPI VARCHAR(13) NOT NULL,
      Nombre VARCHAR(50) NOT NULL,
      Apellido VARCHAR(50) NOT NULL,
      Direccion VARCHAR(75) NOT NULL,
      Telefono VARCHAR(10) NOT NULL,
      Edad INT NOT NULL,
      Genero VARCHAR(1) NOT NULL
    )`,

    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpcandidatos (
      id INT NOT NULL,
      nombres VARCHAR(40) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      cargo_id INT NOT NULL,
      partido_id INT NOT NULL
    )`,

    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpcargos (
      id INT NOT NULL,
      cargo VARCHAR(40) NOT NULL
    )`,

    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmppartidos (
      id_partido INT NOT NULL,
      nombrePartido VARCHAR(50) NOT NULL,
      Siglas VARCHAR(15) NOT NULL,
      Fundacion DATE NOT NULL
    )`,
    
    `CREATE TEMPORARY TABLE IF NOT EXISTS minitrep.tmpvotaciones (
      id_voto INT NOT NULL,
      id_candidato INT NOT NULL,
      dpi_ciudadano VARCHAR(13) NOT NULL,
      mesa_id INT NOT NULL,
      fecha_hora DATETIME NOT NULL
    )`
];
