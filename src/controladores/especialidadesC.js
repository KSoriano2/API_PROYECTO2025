import { conmysql } from "../bd.js";

export const obtenerEspecialidades = (req, resp)=>{
    resp.send('Lista de Especialidades')
}

export const getEspecialidades=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from ESPECIALIDADES where ESTADO_ESPECIALIDAD="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getEspecialidadxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from ESPECIALIDADES where ID_ESPECIALIDAD =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_especialidad:0,
            message: "Especialidad no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postEspecialidad = async(req, res)=>{
    try{
        const estado_especialidad = "A"
        const {nombre_especialidad} =req.body
        const [result] = await conmysql.query(' INSERT INTO USUARIOS (NOMBRE_ESPECIALIDAD,ESTADO_ESPECIALIDAD) VALUES(?,?)', 
        [nombre_especialidad,estado_especialidad])
        
        res.send({
            id_especialidad: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putEspecialidad=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_especialidad,estado_especialidad}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE ESPECIALIDADES SET NOMBRE_ESPECIALIDAD=?,ESTADO_ESPECIALIDAD=? WHERE ID_ESPECIALIDAD=?',
            [nombre_especialidad,estado_especialidad ,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Especialidad no encontrado"
            })

            const [row] = await conmysql.query(' select * from ESPECIALIDADES WHERE ID_ESPECIALIDAD=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchEspecialidad=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_especialidad,estado_especialidad}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE ESPECIALIDADES SET NOMBRE_ESPECIALIDAD=IFNULL(?, NOMBRE_ESPECIALIDAD),ESTADO_ESPECIALIDAD=IFNULL(?, ESTADO_ESPECIALIDAD)  WHERE ID_ESPECIALIDAD=?',
            [nombre_especialidad,estado_especialidad, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Especialidad no encontrada"
            })

            const [row] = await conmysql.query(' select * from ESPECIALIDADES WHERE ID_ESPECIALIDAD=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteEspecialidadxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from ESPECIALIDADES where ID_ESPECIALIDAD=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Especialidad no encontrada"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    