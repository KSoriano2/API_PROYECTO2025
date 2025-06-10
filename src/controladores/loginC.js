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



export const recuperarMenu = async (req, res) => {
  const { usr_usuario } = req.body;

  if (!usr_usuario) {
    return res.status(400).json({ error: "Usuario requerido" });
  }

  try {
    
    const [userRows] = await conmysql.query(
      "SELECT ID_PERFIL FROM USUARIOS WHERE USR_USUARIO = ?",
      [usr_usuario]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const per_id = userRows[0].PER_ID;

    // 2. Obtener accesos según PER_ID
    const [menuRows] = await conmysql.query(
      "SELECT ACCESO_NOMBRE, ACCESO_PAGINA FROM ACCESOS WHERE PERFIL_ID = ? AND ACCESO_ESTADO = 'A'",
      [per_id]
    );

    res.json({ cant: menuRows.length, data: menuRows })
  } catch (error) {
    console.error("Error al recuperar menú:", error);
    return res.status(500).json({ error: "Error al recuperar el menú" });
  }
};
