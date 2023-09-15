import {pool} from '../config/db.js'

export const getConsulta5 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT
            C.nombre AS Departamento,
            COUNT(V.id_voto) AS No_Votos
        FROM
            minitrep.departamento C
        LEFT JOIN
            minitrep.mesa M
        ON
            C.id_depar = M.id_depar
        LEFT JOIN
            minitrep.voto V
        ON
            M.id_mesa = V.id_mesa
        GROUP BY
            C.nombre;
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 5</h1>
            <table border="1">
                <tr>
                <th>Departamento</th>
                <th>No_Votos</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Departamento}</td>
                    <td>${row.No_Votos}</td>
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