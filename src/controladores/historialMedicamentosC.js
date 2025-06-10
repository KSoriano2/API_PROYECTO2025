import { conmysql } from "../bd.js";

export const obtenerHistorialMedicamentos = (req, resp)=>{
    resp.send('Historial de Medicamentos');
}

export const getHistorialMedicamentos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from HISTORIAL_MEDICAMENTOS')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getHistorialMedicamentosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from HISTORIAL_MEDICAMENTOS where ID_PACIENTE =?', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_historial_medicamentos:0,
            message: "Historial de Medicamentos no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postHistorialMedicamentos = async(req, res)=>{
    try{
        const {id_paciente,id_receta_medicamento,inicio_tratamiento,fin_tratamiento,observaciones} =req.body
        const [result] = await conmysql.query(' INSERT INTO HISTORIAL_MEDICAMENTOS (ID_PACIENTE,ID_RECETA_MEDICAMENTO,INICIO_TRATAMIENTO,FIN_TRATAMIENTO,OBSERVACIONES) VALUES(?,?,?,?,?)', 
        [id_paciente,id_receta_medicamento,inicio_tratamiento,fin_tratamiento,observaciones])
        
        res.send({
            id_historial_medicamentos: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putHistorialMedicamentos=async(req,res)=>{
    try{
        const {id} = req.params
        const {inicio_tratamiento,fin_tratamiento,observaciones}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE HISTORIAL_MEDICAMENTOS SET INICIO_TRATAMIENTO=?,FIN_TRATAMIENTO=?,OBSERVACIONES=? WHERE ID_HISTORIAL_MEDICAMENTO=?',
            [inicio_tratamiento,fin_tratamiento,observaciones,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Historial de medicamentos no encontrado"
            })

            const [row] = await conmysql.query(' select * from HISTORIAL_MEDICAMENTOS WHERE ID_HISTORIAL_MEDICAMENTO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchHistorialMedicamentos=async(req,res)=>{
    try{
        const {id} = req.params
        const {inicio_tratamiento,fin_tratamiento,observaciones}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE HISTORIAL_MEDICAMENTOS SET INICIO_TRATAMIENTO=IFNULL(?, INICIO_TRATAMIENTO),FIN_TRATAMIENTO=IFNULL(?, FIN_TRATAMIENTO),OBSERVACIONES=IFNULL(?, OBSERVACIONES) WHERE ID_HISTORIAL_MEDICAMENTO=?',
            [inicio_tratamiento,fin_tratamiento,observaciones, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Historial de medicamentos no encontrado"
            })

            const [row] = await conmysql.query(' select * from HISTORIAL_MEDICAMENTOS WHERE ID_HISTORIAL_MEDICAMENTO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteHistorialMedicamentoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from HISTORIAL_MEDICAMENTOS where ID_HISTORIAL_MEDICAMENTO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Historial de medicamentos no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    