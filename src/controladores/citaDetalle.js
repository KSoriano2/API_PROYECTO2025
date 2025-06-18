import { conmysql } from "../bd.js";

export const obtenerCitasDetalle = (req, resp)=>{
    resp.send('Lista de Citas Detalle')
}

export const getCitasDetalle=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from CITA_DETALLE WHERE ID_CITA=? ', [req.params.id])
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getCitasDetallexid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from CITA_DETALLE where ID_CITA_DETALLE =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_cita_detalle:0,
            message: "Cita Detalle no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postCitasDetalle = async(req, res)=>{
    try{
        const {id_cita,id_especialidad,descripcion_servicio,diagnostico, observaciones} =req.body
        const [result] = await conmysql.query(' INSERT INTO CITA_DETALLE (ID_CITA,ID_ESPECIALIDAD,DESCRIPCION_SERVICIO, DIAGNOSTICO,OBSERVACIONES) VALUES(?,?,?,?,?)', 
        [id_cita,id_especialidad,descripcion_servicio,diagnostico, observaciones])
        
        res.send({
            id_cita_detalle: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putCitasDetalle=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_cita,id_especialidad,descripcion_servicio,diagnostico, observaciones}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CITA_DETALLE SET ID_CITA=?,ID_ESPECIALIDAD=?,DESCRIPCION_SERVICIO=?, DIAGNOSTICO=?, OBSERVACIONES=? WHERE ID_CITA_DETALLE=?',
            [id_cita,id_especialidad,descripcion_servicio,diagnostico, observaciones,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Cita Detalle no encontrada"
            })

            const [row] = await conmysql.query(' select * from CITA_DETALLE WHERE ID_CITA_DETALLE=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchCitasDetalle=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_cita,id_especialidad,descripcion_servicio,diagnostico, observaciones}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CITA_DETALLE SET ID_CITA=IFNULL(?, ID_CITA),ID_ESPECIALIDAD=IFNULL(ID_ESPECIALIDAD),DESCRIPCION_SERVICIO=IFNULL(?, DESCRIPCION_SERVICIO),DIAGNOSTICO=IFNULL(?, DIAGNOSTICO), OBSERVACIONES=IFNULL(?, OBSERVACIONES) WHERE ID_CITA_DETALLE=?',
            [id_cita,id_especialidad,descripcion_servicio,costo_servicio,diagnostico, observaciones ,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Cita Detalle no encontrada"
            })

            const [row] = await conmysql.query(' select * from CITA_DETALLE WHERE ID_CITA_DETALLE=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteCitasDetallexid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from CITA_DETALLE where ID_CITA_DETALLE=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Cita Detalle no encontrada"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
