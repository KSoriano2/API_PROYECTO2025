import { conmysql } from "../bd.js";

export const obtenerUsuarios = (req, resp)=>{
    resp.send('Lista de Usuarios')
}

export const getUsuarios=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from USUARIOS where ESTADO_USUARIO="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getUsuariosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from USUARIOS where ID_USUARIO =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_usuario:0,
            message: "Usuario no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postUsuarios = async(req, res)=>{
    try{
        const estado_usuario = "A"
        const {nombre_usuario,usr_usuario,usr_clave,id_perfil} =req.body
        const [result] = await conmysql.query(' INSERT INTO USUARIOS (NOMBRE_USUARIO,USR_USUARIO,USR_CLAVE,ESTADO_USUARIO,ID_PERFIL) VALUES(?,?,?,?,?)', 
        [nombre_usuario,usr_usuario,usr_clave,estado_usuario,id_perfil])
        
        res.send({
            id_usuario: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putUsuarios=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_usuario,usr_usuario,usr_clave,estado_usuario,id_perfil}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE USUARIOS SET NOMBRE_USUARIO=?,USR_USUARIO=?,USR_CLAVE=?,ESTADO_USUARIO=?,ID_PERFIL=? WHERE ID_USUARIO=?',
            [nombre_usuario,usr_usuario,usr_clave,estado_usuario,id_perfil,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Usuario no encontrado"
            })

            const [row] = await conmysql.query(' select * from USUARIOS WHERE ID_USUARIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchUsuarios=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_usuario,usr_usuario,usr_clave,estado_usuario,id_perfil}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE USUARIOS SET NOMBRE_USUARIO=IFNULL(?, NOMBRE_USUARIO),USR_USUARIO=IFNULL(?, USR_USUARIO),USR_CLAVE=IFNULL(?, USR_CLAVE),ESTADO_USUARIO=IFNULL(?, ESTADO_USUARIO),ID_PERFIL=IFNULL(?, ID_PERFIL) WHERE ID_USUARIO=?',
            [nombre_usuario,usr_usuario,usr_clave,estado_usuario,id_perfil, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Usuario no encontrado"
            })

            const [row] = await conmysql.query(' select * from USUARIOS WHERE ID_USUARIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteUsuariosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from USUARIOS where ID_USUARIO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Usuario no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    