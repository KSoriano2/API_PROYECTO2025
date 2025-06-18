import { conmysql } from "../bd.js";

export const obtenerMedicamentos = (req, resp)=>{
    resp.send('Lista de Medicamentos')
}

export const getMedicamentos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from MEDICAMENTOS where ESTADO_MEDICAMENTO="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getMedicamentosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from MEDICAMENTOS where ID_MEDICAMENTO =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_medicamento:0,
            message: "Medicamento no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postMedicamentos = async(req, res)=>{
    try{
        const estado_medicamento = "A"
        const {nombre_medicamento,descripcion_medicamento,categoria_medicamento,stock_medicamento} =req.body
        const imagen_medicamento = req.file ? `/uploads/${req.file.filename}`: null;
        const [result] = await conmysql.query(' INSERT INTO MEDICAMENTOS (NOMBRE_MEDICAMENTO,DESCRIPCION_MEDICAMENTO,CATEGORIA_MEDICAMENTO,STOCK_MEDICAMENTO,IMAGEN_MEDICAMENTO,ESTADO_MEDICAMENTO) VALUES(?,?,?,?,?,?)', 
        [nombre_medicamento,descripcion_medicamento,categoria_medicamento,stock_medicamento,estado_medicamento,imagen_medicamento])
        
        res.send({
            id_institucion_salud: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putMedicamentos=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_medicamento,descripcion_medicamento,categoria_medicamento,stock_medicamento,estado_medicamento}=req.body
        const imagen_medicamento = req.file ? `/uploads/${req.file.filename}`: null;
        const [result] = await conmysql.query(
            'UPDATE MEDICAMENTOS SET NOMBRE_MEDICAMENTO=?,DESCRIPCION_MEDICAMENTO=?,CATEGORIA_MEDICAMENTO=?,STOCK_MEDICAMENTO=?,IMAGEN_MEDICAMENTO=?,ESTADO_MEDICAMENTO=? WHERE ID_MEDICAMENTO=?',
            [nombre_medicamento,descripcion_medicamento,categoria_medicamento,stock_medicamento,imagen_medicamento,estado_medicamento,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Medicamento no encontrado"
            })

            const [row] = await conmysql.query(' select * from MEDICAMENTOS WHERE ID_MEDICAMENTO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchMedicamentos=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_medicamento,descripcion_medicamento,categoria_medicamento,stock_medicamento,estado_medicamento}=req.body
        const imagen_medicamento = req.file ? `/uploads/${req.file.filename}`: null;
        const [result] = await conmysql.query(
            'UPDATE MEDICAMENTOS SET NOMBRE_MEDICAMENTO=IFNULL(?, NOMBRE_MEDICAMENTO),DESCRIPCION_MEDICAMENTO=IFNULL(?, DESCRIPCION_MEDICAMENTO),CATEGORIA_MEDICAMENTO=IFNULL(?, CATEGORIA_MEDICAMENTO),STOCK_MEDICAMENTO=IFNULL(?, STOCK_MEDICAMENTO),IMAGEN_MEDICAMENTO=IFNULL(?, IMAGEN_MEDICAMENTO),ESTADO_MEDICAMENTO=IFNULL(?, ESTADO_MEDICAMENTO) WHERE ID_MEDICAMENTO=?',
            [nombre_medicamento,descripcion_medicamento,categoria_medicamento,stock_medicamento,imagen_medicamento,estado_medicamento, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Medicamento no encontrado"
            })

            const [row] = await conmysql.query(' select * from MEDICAMENTOS WHERE ID_MEDICAMENTO=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteMedicamentosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from MEDICAMENTOS where ID_MEDICAMENTO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: " Medicamento no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
