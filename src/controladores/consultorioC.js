import { conmysql } from "../bd.js";

export const obtenerConsultorios = (req, resp)=>{
    resp.send('Lista de Consultorios');
}

export const getConsultorios=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from CONSULTORIOS where ESTADO_CONSULTORIO="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getConsultoriosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from CONSULTORIOS where ID_CONSULTORIO =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_consultorio:0,
            message: "Consultorio no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postConsultorio = async(req, res)=>{
    try{
        const estado_consultorio = "A";
        const {nombre_consultorio,ubicacion_consultorio} =req.body
        const [result] = await conmysql.query(' INSERT INTO CONSULTORIOS (NOMBRE_CONSULTORIO,UBICACION_CONSULTORIO,ESTADO_CONSULTORIO) VALUES(?,?,?)', 
        [nombre_consultorio,ubicacion_consultorio,estado_consultorio])
        
        res.send({
            id_consultorio: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putConsultorio=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_consultorio,ubicacion_consultorio,estado_consultorio}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE CONSULTORIOS SET NOMBRE_CONSULTORIO=?,UBICACION_CONSULTORIO=?,ESTADO_CONSULTORIO=? WHERE ID_CONSULTORIO=?',
            [nombre_consultorio,ubicacion_consultorio,estado_consultorio,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Consultorio no encontrado"
            })

            const [row] = await conmysql.query(' select * from CONSULTORIOS WHERE ID_CONSULTORIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchConsultorio=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_consultorio,ubicacion_consultorio,estado_consultorio}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE INSTITUCION_ESPECIALIDAD SET NOMBRE_CONSULTORIO=IFNULL(?, NOMBRE_CONSULTORIO),UBICACION_CONSULTORIO=IFNULL(?, UBICACION_CONSULTORIO),ESTADO_CONSULTORIO=IFNULL(?, ESTADO_CONSULTORIO) WHERE ID_CONSULTORIO=?',
            [nombre_consultorio,ubicacion_consultorio,estado_consultorio, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Consultorio no encontrado"
            })

            const [row] = await conmysql.query(' select * from CONSULTORIOS WHERE ID_CONSULTORIO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteConsultorioxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from CONSULTORIOS where ID_CONSULTORIO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Consultorio no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    