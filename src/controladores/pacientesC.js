import { conmysql } from "../bd.js";

export const obtenerPacientes = (req, resp)=>{
    resp.send('Lista de Pacientes')
}

export const getPacientes=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from PACIENTES where ESTADO_PACIENTE="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getPacientesxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from PACIENTES where ID_PACIENTE =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_cita:0,
            message: "Paciente no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postPacientes = async(req, res)=>{
    try{
        const estado_paciente = "A"
        const {cedula_paciente, nombre_paciente,fecha_nacimiento,celular_paciente,correo_paciente,direccion_paciente,ciudad_paciente,pais_paciente, id_usuario} =req.body
        const [result] = await conmysql.query(' INSERT INTO PACIENTES (CEDULA_PACIENTE,	NOMBRE_PACIENTE,FECHA_NACIMIENTO,CELULAR_PACIENTE,CORREO_PACIENTE,DIRECCION_PACIENTE,CIUDAD_PACIENTE,PAIS_PACIENTE,ESTADO_PACIENTE,ID_USUARIO) VALUES(?,?,?,?,?,?,?,?,?,?)', 
        [cedula_paciente, nombre_paciente,fecha_nacimiento,celular_paciente,correo_paciente,direccion_paciente,ciudad_paciente,pais_paciente,estado_paciente,id_usuario])
        
        res.send({
            id_paciente: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putPaciente=async(req,res)=>{
    try{
        const {id} = req.params
        const {cedula_paciente, nombre_paciente,fecha_nacimiento,celular_paciente,correo_paciente,direccion_paciente,ciudad_paciente,pais_paciente,estado_paciente, id_usuario}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE PACIENTES SET CEDULA_PACIENTE=?,NOMBRE_PACIENTE=?,FECHA_NACIMIENTO=?,CELULAR_PACIENTE=?,CORREO_PACIENTE=?,DIRECCION_PACIENTE=?,CIUDAD_PACIENTE=?,PAIS_PACIENTE=?,ESTADO_PACIENTE=?, ID_USUARIO=? where ID_PACIENTE=?',
            [cedula_paciente, nombre_paciente,fecha_nacimiento,celular_paciente,correo_paciente,direccion_paciente,ciudad_paciente,pais_paciente,estado_paciente,id_usuario,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Paciente no encontrado"
            })

            const [row] = await conmysql.query(' select * from PACIENTES WHERE ID_PACIENTE=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchPaciente=async(req,res)=>{
    try{
        const {id} = req.params
        const {cedula_paciente, nombre_paciente,fecha_nacimiento,celular_paciente,correo_paciente,direccion_paciente,ciudad_paciente,pais_paciente,estado_paciente, id_usuario}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CITAS SET CEDULA_PACIENTE=IFNULL(?, CEDULA_PACIENTE),NOMBRE_PACIENTE=IFNULL(?, NOMBRE_PACIENTE),FECHA_NACIMIENTO=IFNULL(?, FECHA_NACIMIENTO),CELULAR_PACIENTE=(?, CELULAR_PACIENTE),CORREO_PACIENTE=IFNULL(?, CORREO_PACIENTE),DIRECCION_PACIENTE=IFNULL(?, DIRECCION_PACIENTE),CIUDAD_PACIENTE=IFNULL(?, CIUDAD_PACIENTE),PAIS_PACIENTE=IFNULL(?, PAIS_PACIENTE),ESTADO_PACIENTE=IFNULL(?, ESTADO_PACIENTE), ID_USUARIO=IFNULL(?,ID_USUARIO) WHERE ID_PACIENTE=?',
            [cedula_paciente, nombre_paciente,fecha_nacimiento,celular_paciente,correo_paciente,direccion_paciente,ciudad_paciente,pais_paciente,estado_paciente,id_usuario, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Paciente no encontrado"
            })

            const [row] = await conmysql.query(' select * from PACIENTES WHERE ID_PACIENTE=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deletePacientesxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from PACIENTES where ID_PACIENTE=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Paciente no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    