
import { getConnection, sql } from "../database/connection";


export const getObjects = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Objeto')
    console.log(result)
    res.json(result.recordset)
};


export const newObject = async (req, res) => {

    const { matricula, fecha, hora } = req.body
    
    if (matricula == null || fecha == null || hora == null){
        return res.status(400).json({
            error: "faltan datos"
        });
    }

    //ingresamos los datos a la base
    const pool = await getConnection();
    await pool.request()
    .input('matricula', sql.VarChar, matricula)
    .input('fecha', sql.VarChar, fecha)
    .input('hora', sql.VarChar, hora)
    .query('INSERT INTO Objeto (matricula, fecha, hora) VALUES (@matricula, @fecha, @hora)');

    // obtenemos el ultimo digito numerico de la matricula en el caso de ser carro o moto
    var lastdigit = JSON.stringify(matricula)
    lastdigit = lastdigit.split('')
    
    var last = ''
    if (lastdigit.length == 10){
        last = lastdigit[lastdigit.length-2]
    }else if (lastdigit.length == 9){
        //para el caso de moto
        last = lastdigit[lastdigit.length-2]
        if (last != '0' && last != '1' && last != '2' && last != '3' && last != '4' && last != '5' && last != '6' && last != '7' 
        && last != '8' && last != '9') {
            last = lastdigit[lastdigit.length-3]
        }
    }
    
    console.log('digito = '+last)

    //limpiamos los strings
    var fechaf = JSON.stringify(fecha).replace('"','')
    fechaf = fechaf.replace('"',' ')
    var fechafinal = new Date(fechaf)

    var horaf = JSON.stringify(hora).replace('"','')
    horaf = horaf.replace('"','')
    
    var fecha_final = fechaf.concat(horaf)
    console.log("fecha final = "+fecha_final)

    var dia = new Date(fechafinal).getDay()

    var iniciapicoyplacatarde = new Date(fechafinal).setHours(16);
    var terminapicoyplacatarde = new Date(fechafinal).setHours(21);

    var iniciapicoyplacamanana = new Date(fechafinal).setHours(6);
    var terminapicoyplacamanana = new Date(fechafinal).setHours(9,30);
    
    var horafeliz = new Date(fecha_final)
    
    var puede = "puede estar en carretera";
    var nopuede = "no puede estar en carretera";

    
    switch (last) {

        case '1' || '2':
            console.log('aquiiii')
            if (dia != 1){
                res.json(puede)
            }else if (dia == 1 && (horafeliz < iniciapicoyplacatarde && horafeliz > terminapicoyplacamanana) || (horafeliz > terminapicoyplacatarde && horafeliz < iniciapicoyplacamanana)){
                res.json(puede)
            }else{
                res.json(nopuede)
            }
            break;
        case '3' || '4':
            if (dia != 2){
                res.json(puede)
            }else if (dia == 2 && (horafeliz < iniciapicoyplacatarde && horafeliz > terminapicoyplacamanana) || (horafeliz > terminapicoyplacatarde && horafeliz < iniciapicoyplacamanana)){
                res.json(puede)
            }else{
                res.json(nopuede)
            }
            break;
        case '5' || '6':
            if (dia != 3){
                res.json(puede)
            }else if (dia == 3 && (horafeliz < iniciapicoyplacatarde && horafeliz > terminapicoyplacamanana) || (horafeliz > terminapicoyplacatarde && horafeliz < iniciapicoyplacamanana)){
                res.json(puede)
            }else{
                res.json(nopuede)
            }
            break;
        case '7' || '8':
            if (dia != 4){
                res.json(puede)
            }else if (dia == 4 && (horafeliz < iniciapicoyplacatarde && horafeliz > terminapicoyplacamanana) || (horafeliz > terminapicoyplacatarde && horafeliz < iniciapicoyplacamanana)){
                res.json(puede)
            }else{
                res.json(nopuede)
            }
            break;
        case '9' || '0':
            if (dia != 5){
                res.json(puede)
            }else if (dia == 5 && (horafeliz < iniciapicoyplacatarde && horafeliz > terminapicoyplacamanana) || (horafeliz > terminapicoyplacatarde && horafeliz < iniciapicoyplacamanana)){
                res.json(puede)
            }else{
                res.json(nopuede)
            }
            break;
        default:
            break;
    }

    

}



