import { conmysql } from "../bd.js";

export const obtenerInstitucionEspe = (req, resp)=>{
    resp.send('Lista de Instituciones Especialidad')
}

export const getInstitucionEspe=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from INSTITUCION_ESPECIALIDAD ', [req.params.id])
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getInstitucionEspexid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from INSTITUCION_ESPECIALIDAD where ID_INSTITUCION_ESPECIALIDAD =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_institucion_especialidad:0,
            message: "Institucion de especialidad no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postInstitucionEspe = async(req, res)=>{
    try{
        const {id_institucion_salud, id_especialidad} =req.body
        const [result] = await conmysql.query(' INSERT INTO INSTITUCION_ESPECIALIDAD (ID_INSTITUCION_SALUD, ID_ESPECIALIDAD) VALUES(?,?)', 
        [id_institucion_salud, id_especialidad])
        
        res.send({
            id_institucion_especialidad: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putInstitucionEspe=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_institucion_salud, id_especialidad}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE INSTITUCION_ESPECIALIDAD SET ID_INSTITUCION_SALUD=?,ID_ESPECIALIDAD=? WHERE ID_INSTITUCION_ESPECIALIDAD=?',
            [id_institucion_salud, id_especialidad,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Institucion de Especialidad no encontrada"
            })

            const [row] = await conmysql.query(' select * from INSTITUCION_ESPECIALIDAD WHERE ID_INSTITUCION_ESPECIALIDAD=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchInstitucionEspe=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_institucion_salud, id_especialidad}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE INSTITUCION_ESPECIALIDAD SET ID_INSTITUCION_SALUD=IFNULL(?, ID_INSTITUCION_SALUD), ID_ESPECIALIDAD=IFNULL(?, ID_ESPECIALIDAD) WHERE ID_INSTITUCION_ESPECIALIDAD=?',
            [id_institucion_salud, id_especialidad, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Institucion de especialidad no encontrada"
            })

            const [row] = await conmysql.query(' select * from INSTITUCION_ESPECIALIDAD WHERE ID_INSTITUCION_ESPECIALIDAD=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteInstitucionEspexid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from INSTITUCION_ESPECIALIDAD where ID_INSTITUCION_ESPECIALIDAD=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Institucion de Especialidad no encontrada"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
