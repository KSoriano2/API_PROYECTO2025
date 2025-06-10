import { conmysql } from "../bd.js";

export const obtenerRecetaMedicamento = (req, resp)=>{
    resp.send('Lista de Recetas Medicamentos')
}

export const getRecetasMedicamentos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from RECETA_MEDICAMENTO ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getRecetasMedicamentosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * RECETA_MEDICAMENTO where ID_RECETA =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_receta_medicamento:0,
            message: "Receta medicamento no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postRecetasMedicamentos = async(req, res)=>{
    try{
        const {id_receta,id_medicamento,cantidad,dosis} =req.body
        const [result] = await conmysql.query(' INSERT INTO RECETA_MEDICAMENTO (ID_RECETA,ID_MEDICAMENTO,CANTIDAD,DOSIS) VALUES(?,?,?,?)', 
        [id_receta,id_medicamento,cantidad,dosis])
        
        res.send({
            id_receta_medicamento: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putRecetaMedicamento=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_medicamento,cantidad,dosis}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE RECETA_MEDICAMENTO SET ID_MEDICAMENTO=?,CANTIDAD=?,DOSIS=? WHERE ID_RECETA_MEDICAMENTO=?',
            [id_medicamento,cantidad,dosis,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Receta medicamento no encontrada"
            })

            const [row] = await conmysql.query(' select * from RECETA_MEDICAMENTO WHERE ID_RECETA_MEDICAMENTO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchRecetaMedicamento=async(req,res)=>{
    try{
        const {id} = req.params
        const {id_medicamento,cantidad,dosis}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE RECETA_MEDICAMENTO SET ID_MEDICAMENTO=IFNULL(?, ID_MEDICAMENTO),CANTIDAD=IFNULL(?, CANTIDAD),DOSIS=IFNULL(?, DOSIS) WHERE ID_RECETA_MEDICAMENTO=?',
            [id_medicamento,cantidad,dosis, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Receta medicamento no encontrada"
            })

            const [row] = await conmysql.query(' select * from RECETA_MEDICAMENTO WHERE ID_RECETA_MEDICAMENTO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteRecetaMedicamentoxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from RECETA_MEDICAMENTO where ID_RECETA_MEDICAMENTO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Receta medicamento no encontrada"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    