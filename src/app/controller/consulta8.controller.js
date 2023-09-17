import {pool} from '../config/db.js'

export const getConsulta8 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
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
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 8</h1>
            <table border="1">
                <tr>
                <th>Presidente</th>
                <th>Vicepresidente</th>
                <th>Votos</th>

                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Presidente}</td>
                    <td>${row.Vicepresidente}</td>
                    <td>${row.Votos}</td>
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