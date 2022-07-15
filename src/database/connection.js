import sql from "mssql";

//datos de la base
const dbsetting = {
    user: 'cris',
    password: 'cris123456',
    server: 'localhost',
    database: 'ejercicio',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    port: 1434,
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "SQLEXPRESS"
    }
    
}

//conexion a la base
export async function getConnection(){
    try {
        const pool = await sql.connect(dbsetting)
        //const result = await pool.request().query("SELECT 1");
        //console.log(result)
        return pool;
    } catch (error) {
        console.error(error)
    }
    
}

export { sql }

