import { conmysql } from "../bd.js";

export const obtenerHorariosMedicos = (req, resp)=>{
    resp.send('Lista de Horarios Médicos')
}

export const getHorariosMedicos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from HORARIOS_MEDICO where ID_MEDICO=? ', [req.params.id])
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getHorariosMedicosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from HORARIOS_MEDICO where ID_HORARIO =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_horario_medico:0,
            message: "Horario médico no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postHorariosMedicos = async(req, res)=>{
    try{
        const {dia_horario,hora_inicio,hora_fin,id_medico} =req.body
        const [result] = await conmysql.query(' INSERT INTO HORARIOS_MEDICO (DIA_HORARIO,HORA_INICIO,HORA_FIN,ID_MEDICO) VALUES(?,?,?,?)', 
        [dia_horario,hora_inicio,hora_fin,id_medico])
        
        res.send({
            id_horario_medico: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putHorariosMedicos=async(req,res)=>{
    try{
        const {id} = req.params
        const {dia_horario,hora_inicio,hora_fin,id_medico}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE HORARIOS_MEDICO DIA_HORARIO=?,HORA_INICIO=?,HORA_FIN=?,ID_MEDICO=? WHERE ID_HORARIO=?',
            [dia_horario,hora_inicio,hora_fin,id_medico,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Horario médico no encontrado"
            })

            const [row] = await conmysql.query(' select * from HORARIOS_MEDICO WHERE ID_HORARIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchHorariosMedico=async(req,res)=>{
    try{
        const {id} = req.params
        const {dia_horario,hora_inicio,hora_fin,id_medico}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE HORARIOS_MEDICO DIA_HORARIO=IFNULL(?, DIA_HORARIO),HORA_INICIO=IFNULL(?, HORA_INICIO),HORA_FIN=IFNULL(?, HORA_FIN),ID_MEDICO=IFNULL(?, ID_MEDICO) WHERE ID_HORARIO=?',
            [dia_horario,hora_inicio,hora_fin,id_medico, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Horario médico no encontrado"
            })

            const [row] = await conmysql.query(' select * from HORARIOS_MEDICO WHERE ID_HORARIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteHorariosMedicoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from HORARIOS_MEDICO where ID_HORARIO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Horario médico no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    