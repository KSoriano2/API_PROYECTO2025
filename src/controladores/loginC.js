import { conmysql } from "../bd.js";


export const loginUsuario = async (req, res) => {
  const { usr_usuario, usr_clave } = req.body;

  if (!usr_usuario || !usr_clave) {
    return res.status(400).json({ error: "Usuario y clave son requeridos" });
  }

  try {
    const [rows] = await conmysql.query("SELECT * FROM USUARIOS WHERE USR_USUARIO = ? AND USR_CLAVE", [usr_usuario, usr_clave]);
   
    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    res.json({ cant: rows.length, data: rows })
    
  } catch (error) {
    console.error("Error general:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
}



