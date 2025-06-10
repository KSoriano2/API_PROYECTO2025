import {conmysql} from "../bd.js";

export const obtenerAccesos = (req, resp)=>{
    resp.send('Lista de Instituciones Especialidad')
}

export const getAccesos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from ACCESOS where ACCESO_ESTADO="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getAccesoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from ACCESOS where ID_ACCESO =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_acceso:0,
            message: "Acceso no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postAcceso = async(req, res)=>{
    try{
        const acceso_estado = "A";
        const {perfil_id,acceso_nombre,acceso_pagina} =req.body
        const [result] = await conmysql.query(' INSERT INTO ACCESOS(PERFIL_ID,ACCESO_NOMBRE,ACCESO_PAGINA,ACCESO_ESTADO) VALUES(?,?)', 
        [perfil_id,acceso_nombre,acceso_pagina,acceso_estado])
        
        res.send({
            id_acceso: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putAcceso=async(req,res)=>{
    try{
        const {id} = req.params
        const {perfil_id,acceso_nombre,acceso_pagina,acceso_estado}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE ACCESOS SET PERFIL_ID=?,ACCESO_NOMBRE=?,ACCESO_PAGINA=?,ACCESO_ESTADO=? where ID_ACCESO=?',
            [perfil_id,acceso_nombre,acceso_pagina,acceso_estado,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Acceso no encontrado"
            })

            const [row] = await conmysql.query(' select * from ACCESOS WHERE ID_ACCESO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchAcceso=async(req,res)=>{
    try{
        const {id} = req.params
        const {perfil_id,acceso_nombre,acceso_pagina,acceso_estado}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE ACCESOS SET PERFIL_ID=IFNULL(?, PERFIL_ID),ACCESO_NOMBRE=IFNULL(?, ACCESO_NOMBRE),ACCESO_PAGINA=IFNULL(?, ACCESO_PAGINA),ACCESO_ESTADO=IFNULL(?, ACCESO_ESTADO) WHERE ID_ACCESO=?',
            [perfil_id,acceso_nombre,acceso_pagina,acceso_estado, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Acceso no encontrado"
            })

            const [row] = await conmysql.query(' select * from ACCESOS WHERE ID_ACCESO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteAccesoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from ACCESOS where ID_ACCESO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Acceso no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
