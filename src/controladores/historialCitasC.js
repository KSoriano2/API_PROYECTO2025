import { conmysql } from "../bd.js";

export const obtenerHistorialCitas = (req, resp)=>{
    resp.send('Historial de Citas');
}

export const getHistorialCitas=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from HISTORIAL_CITAS ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getHistorialCitasxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from HISTORIAL_CITAS where ID_HISTORIAL =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_historial:0,
            message: "Historial de citas no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postHistorialCitas = async(req, res)=>{
    try{
        const {id_cita,id_paciente,id_medico,fecha_cita,diagnostico,observaciones} =req.body
        const [result] = await conmysql.query(' INSERT INTO HISTORIAL_CITAS (ID_CITA,ID_PACIENTE,ID_MEDICO,FECHA_CITA,DIAGNOSTICO,OBSERVACIONES) VALUES(?,?,?,?,?,?)', 
        [id_cita,id_paciente,id_medico,fecha_cita,diagnostico,observaciones])
        
        res.send({
            id_historial_citas: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putHistorialCitas=async(req,res)=>{
    try{
        const {id} = req.params
        const {fecha_cita,diagnostico,observaciones}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CONSULTORIOS SET FECHA_CITA=?,DIAGNOSTICO=?,OBSERVACIONES=? WHERE ID_HISTORIAL=?',
            [fecha_cita,diagnostico,observaciones,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: " no encontrado"
            })

            const [row] = await conmysql.query(' select * from CONSULTORIOS WHERE ID_CONSULTORIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchHistorialCitas=async(req,res)=>{
    try{
        const {id} = req.params
        const {fecha_cita,diagnostico,observaciones}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE HISTORIAL_CITAS SET FECHA_CITA=IFNULL(?, FECHA_CITA),DIAGNOSTICO=IFNULL(?, DIAGNOSTICO),OBSERVACIONES=IFNULL(?, OBSERVACIONES) WHERE ID_HISTORIAL=?',
            [fecha_cita,diagnostico,observaciones, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Historial de citas no encontrado"
            })

            const [row] = await conmysql.query(' select * from HISTORIAL_CITAS WHERE ID_HISTORIAL=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteHistorialCitaxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from HISTORIAL_CITA where ID_HISTORIAL=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Historial de citas no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    