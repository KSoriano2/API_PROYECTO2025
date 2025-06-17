import { conmysql } from "../bd.js";

export const obtenerCitas = (req, resp)=>{
    resp.send('Lista de Citas')
}

export const getCitas=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from CITAS')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getCitasxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from CITAS where ID_CITA =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_cita:0,
            message: "Cita no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postCitas = async(req, res)=>{
    try{
        const estado_cita = "P"
        const {id_paciente, id_medico, id_institucion_salud, fecha_cita} =req.body
        const [result] = await conmysql.query(' INSERT INTO CITAS (ID_PACIENTE, ID_MEDICO, ID_INSTITUCION_SALUD, FECHA_CITA, ESTADO_CITA) VALUES(?,?,?,?,?)', 
        [id_paciente, id_medico, id_institucion_salud, fecha_cita, estado_cita])
        
        res.send({
            id_cita: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putCitas=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_paciente, id_medico, id_institucion_salud, fecha_cita, estado_cita}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CITAS SET ID_PACIENTE=?, ID_MEDICO=?, ID_INSTITUCION_SALUD=?, FECHA_CITA=?,ESTADO_CITA=? WHERE ID_CITA=?',
            [id_paciente, id_medico, id_institucion_salud, fecha_cita, estado_cita,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Cita no encontrada"
            })

            const [row] = await conmysql.query(' select * from CITAS WHERE ID_CITA=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchCitas=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_paciente, id_medico, id_institucion_salud, fecha_cita, estado_cita}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CITAS SET ID_PACIENTE=IFNULL(?, ID_PACIENTE), ID_MEDICO=IFNULL(?, ID_MEDICO), ID_INSTITUCION_SALUD=IFNULL(?, ID_INSTITUCION_SALUD), FECHA_CITA=IFNULL(?, FECHA_CITA), ESTADO_CITA=IFNULL(?, ESTADO_CITA) WHERE ID_CITA=?',
            [id_paciente, id_medico, id_institucion_salud, fecha_cita, estado_cita, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Cita no encontrada"
            })

            const [row] = await conmysql.query(' select * from CITAS WHERE ID_CITA=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const getCitasOcupadas = async (req, res) => {
  const { idMedico, fecha } = req.params;

  try {
    const [result] = await conmysql.query(`
      SELECT HORA_CITA
      FROM CITAS
      WHERE ID_MEDICO = ? AND FECHA_CITA = ?
    `, [idMedico, fecha]);

    const horas = result.map(row => row.HORA_CITA);  // por ejemplo: "16:30:00"
    res.json({ ocupadas: horas });  // enviamos las horas ocupadas
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener citas ocupadas' });
  }
}
//función eliminar
export const deleteCitasxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from CITAS where ID_CITA=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Cita no encontrada"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
