import path from 'path';
import csvtojson from 'csvtojson';
import {pool} from '../config/db.js'
import {__dirname} from '../index.js';
import {tmpsql} from '../public/scripts/tmp.js'

export const getCargartabtemp = async (req,res)=>{
    const connection = await pool.getConnection();

    const csvPath = [
      path.join(__dirname, 'public', 'res/csv/departamentos.csv'),
      path.join(__dirname, 'public', 'res/csv/mesas.csv'), 
      path.join(__dirname, 'public', 'res/csv/ciudadanos.csv'), 
      path.join(__dirname, 'public', 'res/csv/candidatos.csv'),
      path.join(__dirname, 'public', 'res/csv/cargos.csv'), 
      path.join(__dirname, 'public', 'res/csv/partidos.csv'),
      path.join(__dirname, 'public', 'res/csv/votaciones.csv')
    ]; 

    try { 
      for (const tmp of tmpsql) {
        await connection.query(tmp) 
      }

      for (const csv of csvPath) {
        const tableName = path.basename(csv, path.extname(csv));
        const tmpsql = 'INSERT INTO minitrep.tmp'+ tableName +' SET ?';
        const jsonArray = await csvtojson().fromFile(csv);
        for (const row of jsonArray) {
          if('fecha_nacimiento' in row && tableName.toLowerCase() === "candidatos"){
            row.fecha_nacimiento = formatDate(row.fecha_nacimiento)
          }else if('Fundacion' in row && tableName.toLowerCase() === "partidos"){
            row.Fundacion = formatDate(row.Fundacion)
          }else if('fecha_hora' in row && tableName.toLowerCase() === "votaciones"){
            row.fecha_hora = formatDateTime(row.fecha_hora)
          }
          await connection.query(tmpsql, row);
        }
        
        console.log("Agregando: " + jsonArray.length +" datos a la tabla: "+ tableName);
      } 

      
      await connection.query(`INSERT INTO minitrep.departamento (id_depar,nombre) 
      SELECT id, nombre FROM minitrep.tmpdepartamentos`);

      await connection.query(`INSERT INTO minitrep.mesa (id_mesa, id_depar) 
      SELECT id_mesa, id_departamento FROM minitrep.tmpmesas`); 
      
      await connection.query(`INSERT INTO minitrep.ciudadano (dpi,nombre,apellido,direccion,telefono,edad,genero)
      SELECT DPI, Nombre, Apellido, Direccion, Telefono, Edad, Genero FROM minitrep.tmpciudadanos`);

      await connection.query(`INSERT IGNORE INTO minitrep.voto (id_voto, fechahora, dpi, id_mesa)
      SELECT id_voto, fecha_hora, dpi_ciudadano, mesa_id FROM minitrep.tmpvotaciones`);

      await connection.query(`INSERT INTO minitrep.partido (id_partido, nombre_partido, siglas, fundacion) 
      SELECT id_partido, nombrePartido, Siglas, Fundacion FROM minitrep.tmppartidos`);

      await connection.query(`INSERT INTO minitrep.cargo (id_cargo,cargo) 
      SELECT id, cargo FROM minitrep.tmpcargos`);

      await connection.query(`INSERT INTO minitrep.candidato (id_candidato, nombre, fecha_naci, id_cargo, id_partido) 
      SELECT id, nombres, fecha_nacimiento, cargo_id, partido_id FROM minitrep.tmpcandidatos`);

      await connection.query(`INSERT INTO minitrep.detalle_voto (id_voto, id_candidato)
      SELECT id_voto, id_candidato FROM minitrep.tmpvotaciones`); 
                 
      console.log('TABLAS TEMPORALES HAN SIDO CREADAS EXITOSAMENTE Y CARGADAS AL MODELO');

      res.status(200).json({
        message: 'TABLAS TEMPORALES HAN SIDO CREADAS EXITOSAMENTE Y CARGADAS AL MODELO'
      });

    }catch (error) {
      console.error('Error al crear la tabla:', error);
      res.status(500).json({
        body: { res: false, message: 'OCURRIÓ UN PROBLEMA AL CREAR TABLAS TEMPORALES', error }
      });

    }finally{
      connection.release(); // Liberar la conexión al pool
    }
}

function formatDate(fechaEnFormatoOriginal) {
  const [dia, mes, anio] = fechaEnFormatoOriginal.split('/');

  // Formatea la fecha en el formato MySQL "YYYY-MM-DD"
  const fechaEnFormatoMysql = `${anio}-${mes}-${dia}`;

  return fechaEnFormatoMysql;
}

function formatDateTime(fechaEnFormatoOriginal) {
  const [fecha, hora] = fechaEnFormatoOriginal.split(' ');

  // Divide la fecha en día, mes y año
  const [dia, mes, anio] = fecha.split('/');

  // Divide la hora en horas y minutos
  const [horas, minutos] = hora.split(':');

  // Formatea la fecha y la hora en el formato MySQL "YYYY-MM-DD HH:MM:SS"
  const fechaHoraEnFormatoMysql = `${anio}-${mes}-${dia} ${horas}:${minutos}:00`;

  return fechaHoraEnFormatoMysql;
}
