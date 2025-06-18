import { conmysql } from "../bd.js";

export const obtenerRecetasMedicas = (req, resp)=>{
    resp.send('Lista de Recetas Médicas')
}

export const getRecetasMedicas=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from RECETAS_MEDICAS')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}

export const getRecetasPorPaciente = async (req, res) => {
  const {id} = req.params;
  try {
    const [result] = await conmysql.query(`
      SELECT R.ID_RECETA, R.FECHA_RECETA, R.DESCRIPCION_RECETA
      FROM RECETAS_MEDICAS R
      JOIN CITAS C ON R.ID_CITA = C.ID_CITA
      WHERE C.ID_PACIENTE = ?`, [id]);

    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(500).json({ ok: false, error });
  }
};



//retorna cliente x id
export const getRecetasMedicasxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * RECETAS_MEDICAS where ID_CITA =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_cita:0,
            message: "Receta médica no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postRecetasMedicas = async(req, res)=>{
    try{
        const {id_cita,fecha_receta,descripcion_receta} =req.body
        const [result] = await conmysql.query(' INSERT INTO RECETAS_MEDICAS (ID_CITA,FECHA_RECETA,DESCRIPCION_RECETA) VALUES(?,?,?)', 
        [id_cita,fecha_receta,descripcion_receta])
        
        res.send({
            id_receta_medica: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putRecetasMedicas=async(req,res)=>{
    try{
        const {id} = req.params
        const {fecha_receta,descripcion_receta}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE RECETAS_MEDICAS SET FECHA_RECETA=?,DESCRIPCION_RECETA=? WHERE ID_RECETA=?',
            [fecha_receta,descripcion_receta,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Receta médica no encontrada"
            })

            const [row] = await conmysql.query(' select * from RECETAS_MEDICAS WHERE ID_RECETA=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchRecetasMedicas=async(req,res)=>{
    try{
        const {id} = req.params
        const {fecha_receta,descripcion_receta}=req.body
        
        const [result] = await conmysql.query(
            'UPDATE RECETAS_MEDICAS SET FECHA_RECETA=IFNULL(?, FECHA_RECETA),DESCRIPCION_RECETA=IFNULL(?, DESCRIPCION_RECETA) WHERE ID_RECETA=?',
            [fecha_receta,descripcion_receta,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Receta médica no encontrada"
            })

            const [row] = await conmysql.query(' select * from RECETAS_MEDICAS WHERE ID_RECETA=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteRecetasMedicasxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from RECETAS_MEDICAS where ID_RECETA=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Receta Médica no encontrada"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
