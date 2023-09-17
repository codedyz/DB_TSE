import {pool} from '../config/db.js'

export const getConsulta6 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT COUNT(DISTINCT id_voto) AS Total_Nulos,
        COUNT(*) AS Nulos_Por_Persona
        FROM minitrep.detalle_voto
        WHERE id_candidato = -1;
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 6</h1>
            <table border="1">
                <tr>
                <th>Total_Nulos</th>
                <th>Nulos_Por_Persona</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Total_Nulos}</td>
                    <td>${row.Nulos_Por_Persona}</td>
                    <!-- Agrega más celdas según tu tabla -->
                    </tr>
                `;
                }).join('')}
            </table>
            </body>
        </html>
        `;

        res.header('Content-Type', 'text/html');
        res.send(tableHtml);

    } catch (error) {
        console.error('Error al crear la tabla:', error);
        res.status(500).json({ error: 'Error interno del servidor ' + error });
  
    } finally {
        connection.release(); // Liberar la conexión al pool
    }
}