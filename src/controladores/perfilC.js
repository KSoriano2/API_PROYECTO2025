import { conmysql } from "../bd.js";

export const obtenerPerfiles = (req, resp)=>{
    resp.send('Lista de Perfiles')
}

export const getPerfiles=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from PERFIL where PER_ESTADO="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getPerfilxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * PERFIL where ID_PERFIL =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_perfil:0,
            message: "Perfil no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postPerfil = async(req, res)=>{
    try{
        const per_estado = "A"
        const {descripcion_perfil} =req.body
        const [result] = await conmysql.query(' INSERT INTO PERFIL (DESCRIPCION_PERFIL,PER_ESTADO) VALUES(?,?)', 
        [descripcion_perfil, per_estado])
        
        res.send({
            id_perfil: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putPerfil=async(req,res)=>{
    try{
        const {id} = req.params
        const {descripcion_perfil, per_estado}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE PERFIL SET DESCRIPCION_PERFIL=?,PER_ESTADO=? WHERE ID_PERFIL=?',
            [descripcion_perfil, per_estado,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Perfil no encontrado"
            })

            const [row] = await conmysql.query(' select * from PERFIL WHERE ID_PERFIL=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchPerfil=async(req,res)=>{
    try{
        const {id} = req.params
        const {descripcion_perfil, per_estado}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE PERFIL SET DESCRIPCION_PERFIL=IFNULL(?, DESCRIPCION_PERFIL),PER_ESTADO=IFNULL(?, PER_ESTADO) WHERE ID_PERFIL=?',
            [descripcion_perfil, per_estado, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Perfil no encontrado"
            })

            const [row] = await conmysql.query(' select * from PERFIL WHERE ID_PERFIL=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deletePerfilxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from PERFIL where ID_PERFIL=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Perfil no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    