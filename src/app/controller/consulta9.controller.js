import {pool} from '../config/db.js'

export const getConsulta9 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT
            M.id_mesa AS No_Mesa,
            D.nombre AS Departamento,
            COUNT(*) AS Votos
        FROM
            minitrep.mesa M
        INNER JOIN
            minitrep.departamento D
        ON
            M.id_depar = D.id_depar
        INNER JOIN
            minitrep.voto V
        ON
            M.id_mesa = V.id_mesa
        GROUP BY
            M.id_mesa, D.nombre
        ORDER BY
            Votos DESC
        LIMIT 5;

        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 9</h1>
            <table border="1">
                <tr>
                <th>No_Mesa</th>
                <th>Departamento</th>
                <th>Votos</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.No_Mesa}</td>
                    <td>${row.Departamento}</td>
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