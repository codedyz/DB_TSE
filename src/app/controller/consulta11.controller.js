import {pool} from '../config/db.js'

export const getConsulta11 = async (req,res)=>{
    const connection = await pool.getConnection();

    try { 
        const [sql] = await connection.query(`
        SELECT 
            C.genero AS Genero,
            COUNT(*) AS Total
        FROM minitrep.voto V
        JOIN minitrep.ciudadano C
        ON V.dpi = C.dpi
        GROUP BY
            C.genero;
        `);
        
        const tableHtml = `
        <html>
            <head>
            <title>Resultados de la consulta</title>
            </head>
            <body>
            <h1>Consulta 11</h1>
            <table border="1">
                <tr>
                <th>Genero</th>
                <th>Total</th>
                <!-- Agrega más encabezados según tu tabla -->
                </tr>
                ${sql.map((row) => {
                return `
                    <tr>
                    <td>${row.Genero}</td>
                    <td>${row.Total}</td>
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