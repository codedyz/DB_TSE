import {pool} from '../config/db.js'
import {modelosql} from '../public/scripts/modelo.js'

export const getCrearmodelo = async (req,res)=>{
    const connection = await pool.getConnection();

    try {           
        for (const modelo of modelosql) {
           await connection.query(modelo) 
        }
               
        console.log('MODELO CREADO EXITOSAMENTE');
        res.status(200).json({ message: 'MODELO CREADO EXITOSAMENTE' });

    } catch (error) {
      console.error('Error al crear la tabla:', error);
      res.status(500).json({ error: 'Error interno del servidor' });

    } finally {
      connection.release(); // Liberar la conexión al pool
    }
}