import {pool} from '../config/db.js'

export const getConsulta3 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
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
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 3</h1>
            <table border="1">
                <tr>
                <th>Partido</th>
                <th>Alcalde</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Partido}</td>
                    <td>${row.Alcalde}</td>
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