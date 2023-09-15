import {pool} from '../config/db.js'

export const getConsulta2 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT
            P.nombre_Partido AS Partido,
            COUNT(C.id_candidato) AS No_Candidatos
        FROM
            minitrep.partido P
        LEFT JOIN
            minitrep.candidato C
        ON P.id_partido = C.id_partido
        LEFT JOIN
            minitrep.cargo CR
        ON C.id_cargo = CR.id_cargo
        WHERE
            CR.cargo LIKE 'diputado congreso lista nacional'
            OR CR.cargo LIKE 'diputado congreso distrito electoral'
            OR CR.cargo LIKE 'diputado parlamento centroamericano'
        GROUP BY
            P.nombre_Partido;
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 2</h1>
            <table border="1">
                <tr>
                <th>Partido</th>
                <th>No. Diputados</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Partido}</td>
                    <td>${row.No_Candidatos}</td>
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