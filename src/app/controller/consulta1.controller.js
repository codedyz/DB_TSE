import {pool} from '../config/db.js'

export const getConsulta1 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT 
            P.nombre_partido AS Partido, 
            CP.nombre AS Presidente, 
            CV.nombre AS Vicepresidente
        FROM 
            minitrep.partido P
        LEFT JOIN 
            minitrep.candidato CP 
        ON CP.id_cargo = 1 AND P.id_partido = CP.id_partido
        LEFT JOIN 
            minitrep.candidato CV 
        ON CV.id_cargo = 2 AND P.id_partido = CV.id_partido
        WHERE
            CP.id_candidato IS NOT NULL
            AND CV.id_candidato IS NOT NULL;
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 1</h1>
            <table border="1">
                <tr>
                <th>Partido</th>
                <th>Presidente</th>
                <th>Vicepresidente</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Partido}</td>
                    <td>${row.Presidente}</td>
                    <td>${row.Vicepresidente}</td>
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
        //res.status(200).json(sql);

    } catch (error) {
        console.error('Error al crear la tabla:', error);
        res.status(500).json({ error: 'Error interno del servidor ' + error });
  
    } finally {
        connection.release(); // Liberar la conexión al pool
    }
}