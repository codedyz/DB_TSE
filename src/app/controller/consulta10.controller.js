import {pool} from '../config/db.js'

export const getConsulta10 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT 
            TIME_FORMAT(TIME(fechahora), '%H:%i') AS Hora,
            COUNT(fechahora) AS Votantes
        FROM minitrep.voto V
        GROUP BY V.fechahora
        ORDER BY Votantes DESC
        LIMIT 5;
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 10</h1>
            <table border="1">
                <tr>
                <th>Hora</th>
                <th>Votos</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Hora}</td>
                    <td>${row.Votantes}</td>
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