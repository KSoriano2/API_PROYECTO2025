import { conmysql } from "../bd.js";

import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';


function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}


cloudinary.config({
  cloud_name: 'dxemv02vq',
  api_key: '553718753892582',
  api_secret: 'B70Rkk4ltT0X6-iKM5Z5UF6JREk'
});

function subirImagenCloudinary(buffer, carpeta = 'medicos') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: carpeta,
        transformation: { width: 800, height: 800, crop: 'limit' }
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    bufferToStream(buffer).pipe(stream);
  });
}


export const obtenerInstitucionesSalud = (req, resp)=>{
    resp.send('Lista de Instituciones de Salud')
}

export const getInstitucionesSalud=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from INSTITUCION_SALUD where ESTADO_INSTITUCION="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getInstitucionesSaludxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * from INSTITUCION_SALUD where ID_INSTITUCION_SALUD =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_usuario:0,
            message: "Institucion de salud no encontrada"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postInstitucionSalud = async(req, res)=>{
    try{
        const estado_institucion = "A"
        const {nombre_institucion_salud,celular_institucion,correo_institucion,ubicacion_institucion} =req.body
        let imagen_institucion = null;
        if (req.file && req.file.buffer) {
            imagen_institucion = await subirImagenCloudinary(req.file.buffer);
        }
        const [result] = await conmysql.query(' INSERT INTO INSTITUCION_SALUD (NOMBRE_INSTITUCION_SALUD,CELULAR_INSTITUCION,CORREO_INSTITUCION,UBICACION_INSTITUCION,IMAGEN_INSTITUCION,ESTADO_INSTITUCION) VALUES(?,?,?,?,?,?)', 
        [nombre_institucion_salud,celular_institucion,correo_institucion,ubicacion_institucion,imagen_institucion,estado_institucion])
        
        res.send({
            id_institucion_salud: result.insertId
        })
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const putInstitucionSalud=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_institucion_salud,celular_institucion,correo_institucion,ubicacion_institucion,estado_institucion}=req.body
        let imagen_institucion = null;
        if (req.file && req.file.buffer) {
            imagen_institucion = await subirImagenCloudinary(req.file.buffer);
        }
        const [result] = await conmysql.query(
            'UPDATE INSTITUCION_SALUD SET NOMBRE_INSTITUCION_SALUD=?,CELULAR_INSTITUCION=?,CORREO_INSTITUCION=?,UBICACION_INSTITUCION=?,IMAGEN_INSTITUCION=?,ESTADO_INSTITUCION=? WHERE ID_INSTITUCION_SALUD=?',
            [nombre_institucion_salud,celular_institucion,correo_institucion,ubicacion_institucion,imagen_institucion,estado_institucion,id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Institucion de Salud no encontrada"
            })

            const [row] = await conmysql.query(' select * from INSTITUCION_SALUD WHERE ID_INSTITUCION_SALUD=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

export const patchInstitucionSalud=async(req,res)=>{
    try{
        const {id} = req.params
        const {nombre_institucion_salud,celular_institucion,correo_institucion,ubicacion_institucion,estado_institucion}=req.body
        let imagen_institucion = null;
        if (req.file && req.file.buffer) {
            imagen_institucion = await subirImagenCloudinary(req.file.buffer);
        }
        const [result] = await conmysql.query(
            'UPDATE INSTITUCION_SALUD SET NOMBRE_INSTITUCION_SALUD=IFNULL(?, NOMBRE_INSTITUCION_SALUD),CELULAR_INSTITUCION=IFNULL(?, CELULAR_INSTITUCION),CORREO_INSTITUCION=IFNULL(?, CORREO_INSTITUCION),UBICACION_INSTITUCION=(?,UBICACION_INSTITUCION),IMAGEN_INSTITUCION=IFNULL(?, IMAGEN_INSTITUCION),ESTADO_INSTITUCION=IFNULL(?, ESTADO_INSTITUCION) WHERE ID_INSTITUCION_SALUD=?',
            [nombre_institucion_salud,celular_institucion,correo_institucion,ubicacion_institucion,imagen_institucion,estado_institucion, id])

            if(result.affectedRows<=0) return res.status(404).json({
                message: "Institucion de Salud no encontrada"
            })

            const [row] = await conmysql.query(' select * from INSTITUCION_SALUD WHERE ID_INSTITUCION_SALUD=?', [id])
            res.json(row[0])


            
        
    }catch(error){
        return res.status(500).json({ message: "error en el servidor"})       
    }
}

//función eliminar
export const deleteInstitucionSaludxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from INSTITUCION_SALUD where ID_INSTITUCION_SALUD=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: " Institucion de Salud no encontrado"
        })
    
        res.status(204).json({ message: "eliminada"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
