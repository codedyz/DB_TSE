import {pool} from '../config/db.js'

export const getEliminarmodelo = async (req,res)=>{
    const connection = await pool.getConnection();

    try {           
        const sql = "DROP DATABASE minitrep"

        await connection.query(sql) 
        
               
        console.log('MODELO BORRADO EXITOSAMENTE');
        res.status(200).json({ message: 'MODELO BORRADO EXITOSAMENTE' });

      } catch (error) {
        console.error('Error al crear la tabla:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

      } finally {
        connection.release(); // Liberar la conexión al pool
      }
}