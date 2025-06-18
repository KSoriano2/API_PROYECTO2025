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

function subirImagenCloudinary(buffer, carpeta = 'medicamentos') {
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





export const obtenerMedicos = (req, resp)=>{
    resp.send('Lista de Médicos')
}

export const getMedicos=async(req, resp)=>{
try{
    const [result] = await conmysql.query(' select * from MEDICOS where ESTADO_MEDICO="A" ')
    resp.json({ cant: result.length, data: result }) 
}catch(error){
    return resp.status(500).json({ message: "error en el servidor"})
}
}


//retorna cliente x id
export const getMedicosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' select * MEDICOS where ID_MEDICO =? ', [req.params.id])
        console.log(req.params.id)
        if(result.length<=0) return res.status(400).json({
            id_medico:0,
            message: "Médico no encontrado"
        })

        res.json(result[0])

    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})

    }

}

//funcion para insertar un cliente
export const postMedicos = async (req, res) => {
  try {
    const estado_medico = "A";
    const {
      nombre_medico,
      cedula_medico,
      especialidad_medico,
      telefono_medico,
      correo_medico,
      id_consultorio,
      id_usuario,
      id_inst_esp,
    } = req.body;

    const imagen_medico = req.file ? req.file.path : null;

    const [result] = await conmysql.query(
      `INSERT INTO MEDICOS 
      (NOMBRE_MEDICO, CEDULA_MEDICO, ESPECIALIDAD_MEDICO, TELEFONO_MEDICO, CORREO_MEDICO, 
       ESTADO_MEDICO, IMAGEN_MEDICO, ID_CONSULTORIO, ID_USUARIO, ID_INST_ESP) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_medico,
        cedula_medico,
        especialidad_medico,
        telefono_medico,
        correo_medico,
        estado_medico,
        imagen_medico,
        id_consultorio,
        id_usuario,
        id_inst_esp,
      ]
    );

    res.send({ id_medico: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};


export const putMedicos = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_medico,
      cedula_medico,
      especialidad_medico,
      telefono_medico,
      correo_medico,
      estado_medico,
      id_consultorio,
      id_usuario,
      id_inst_esp,
    } = req.body;

    const imagen_medico = req.file ? req.file.path : null;

    const [result] = await conmysql.query(
      `UPDATE MEDICOS SET 
        NOMBRE_MEDICO = ?, 
        CEDULA_MEDICO = ?, 
        ESPECIALIDAD_MEDICO = ?, 
        TELEFONO_MEDICO = ?, 
        CORREO_MEDICO = ?, 
        ESTADO_MEDICO = ?, 
        IMAGEN_MEDICO = ?, 
        ID_CONSULTORIO = ?, 
        ID_USUARIO = ?, 
        ID_INST_ESP = ? 
      WHERE ID_MEDICO = ?`,
      [
        nombre_medico,
        cedula_medico,
        especialidad_medico,
        telefono_medico,
        correo_medico,
        estado_medico,
        imagen_medico,
        id_consultorio,
        id_usuario,
        id_inst_esp,
        id,
      ]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    const [row] = await conmysql.query("SELECT * FROM MEDICOS WHERE ID_MEDICO = ?", [id]);
    res.json(row[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const patchMedicos = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_medico,
      cedula_medico,
      especialidad_medico,
      telefono_medico,
      correo_medico,
      estado_medico,
      id_consultorio,
      id_usuario,
      id_inst_esp,
    } = req.body;

    const imagen_medico = req.file ? req.file.path : null;

    const [result] = await conmysql.query(
      `UPDATE MEDICOS SET 
        NOMBRE_MEDICO = IFNULL(?, NOMBRE_MEDICO),
        CEDULA_MEDICO = IFNULL(?, CEDULA_MEDICO),
        ESPECIALIDAD_MEDICO = IFNULL(?, ESPECIALIDAD_MEDICO),
        TELEFONO_MEDICO = IFNULL(?, TELEFONO_MEDICO),
        CORREO_MEDICO = IFNULL(?, CORREO_MEDICO),
        ESTADO_MEDICO = IFNULL(?, ESTADO_MEDICO),
        IMAGEN_MEDICO = IFNULL(?, IMAGEN_MEDICO),
        ID_CONSULTORIO = IFNULL(?, ID_CONSULTORIO),
        ID_USUARIO = IFNULL(?, ID_USUARIO),
        ID_INST_ESP = IFNULL(?, ID_INST_ESP)
      WHERE ID_MEDICO = ?`,
      [
        nombre_medico,
        cedula_medico,
        especialidad_medico,
        telefono_medico,
        correo_medico,
        estado_medico,
        imagen_medico,
        id_consultorio,
        id_usuario,
        id_inst_esp,
        id,
      ]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Médico no encontrado" });
    }

    const [row] = await conmysql.query("SELECT * FROM MEDICOS WHERE ID_MEDICO = ?", [id]);
    res.json(row[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

//función eliminar
export const deleteMedicosxid = async(req, res)=>{
    try{
        const [result] = await conmysql.query(' delete from MEDICOS where ID_MEDICO=? ', [req.params.id])
        if(result.length<=0) return res.status(400).json({
            message: "Médico no encontrado"
        })
    
        res.status(204).json({ message: "eliminado"})
    
    } catch (error){
        return res.status(500).json({ message: "error en el servidor"})
    
    }
    
}
    
