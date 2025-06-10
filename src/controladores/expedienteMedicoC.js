import { conmysql } from "../bd.js";

export const obtenerExpedienteMedico = (req, resp)=>{
    resp.send('Lista de Expedientes Medicos')
}

export const getExpedientesMedicos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from EXPEDIENTE_MEDICO where ID_PACIENTE=? ', [req.params.id])
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getExpedienteMedicoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from EXPEDIENTE_MEDICO  where ID_PACIENTE =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_institucion_especialidad:0,
            message: "Expediente médico  no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postExpedienteMedico = async(req, res)=>{
    try{
        const estado_expediente = "A"
        const {id_paciente,fecha_registro,antecedentes,diagnosticos,examenes_realizados,medicamentos_recetados,notas_adicionales} =req.body
        const [result] = await conmysql.query(' INSERT INTO EXPEDIENTE_MEDICO (ID_PACIENTE,FECHA_REGISTRO,ANTECEDENTES,DIAGNOSTICOS,EXAMENES_REALIZADOS,MEDICAMENTOS_RECETADOS,NOTAS_ADICIONALES,ESTADO_EXPEDIENTE) VALUES(?,?,?,?,?,?,?,?)', 
        [id_paciente,fecha_registro,antecedentes,diagnosticos,examenes_realizados,medicamentos_recetados,notas_adicionales, estado_expediente])
        
        res.send({
            id_expediente_medico: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putExpedienteMedico=async(req,res)=>{
    try{
        const {id} = req.params
        const {fecha_registro,antecedentes,diagnosticos,examenes_realizados,medicamentos_recetados,notas_adicionales, estado_expediente}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE EXPEDIENTE_MEDICO SET FECHA_REGISTRO=?,ANTECEDENTES=?,DIAGNOSTICOS=?,EXAMENES_REALIZADOS=?,MEDICAMENTOS_RECETADOS=?,NOTAS_ADICIONALES=? WHERE ID_EXPEDIENTE=?',
            [fecha_registro,antecedentes,diagnosticos,examenes_realizados,medicamentos_recetados,notas_adicionales, estado_expediente,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Expediente médico no encontrado"
            })

            const [row] = await conmysql.query(' select * from EXPEDIENTE_MEDICO WHERE ID_EXPEDIENTE=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchExpedienteMedico=async(req,res)=>{
    try{
        const {id} = req.params
        const {fecha_registro,antecedentes,diagnosticos,examenes_realizados,medicamentos_recetados,notas_adicionales,estado_expediente}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE EXPEDIENTE_MEDICO SET FECHA_REGISTRO=IFNULL(?, FECHA_REGISTRO),ANTECEDENTES=IFNULL(?, ANTECEDENTES),DIAGNOSTICOS=(?,DIAGNOSTICOS),EXAMENES_REALIZADOS=(?, EXAMENES_REALIZADOS),MEDICAMENTOS_RECETADOS=(?, MEDICAMENTOS_RECETADOS),NOTAS_ADICIONALES=(?, NOTAS_ADICIONALES) WHERE ID_EXPEDIENTE=?' ,
            [fecha_registro,antecedentes,diagnosticos,examenes_realizados,medicamentos_recetados,notas_adicionales, estado_expediente ,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Expediente médico no encontrado"
            })

            const [row] = await conmysql.query(' select * from EXPEDIENTE_MEDICO WHERE ID_EXPEDIENTE=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteExpedienteMedicoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from EXPEDIENTE_MEDICO where ID_EXPEDIENTE=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Expediente médico no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    