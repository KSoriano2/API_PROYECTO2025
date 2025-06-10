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

  // Validación: Verificar si el usuario ha sido proporcionado
  if (!usr_usuario) {
    return res.status(400).json({ error: "El campo 'usr_usuario' es obligatorio." });
  }

  console.log("Usuario recibido:", usr_usuario);

  try {
    // 1. Consultar si el usuario existe en la base de datos
    const [userRows] = await conmysql.query(
      "SELECT ID_PERFIL FROM USUARIOS WHERE USR_USUARIO = ?",
      [usr_usuario]
    );

    // 2. Verificar si el usuario existe en la base de datos
    if (userRows.length === 0) {
      return res.status(404).json({ error: `El usuario ${usr_usuario} no fue encontrado.` });
    }

    const per_id = userRows[0].ID_PERFIL;

    console.log("ID de perfil del usuario:", per_id);

    // 3. Consultar los accesos según el perfil del usuario
    const [menuRows] = await conmysql.query(
      "SELECT ACCESO_NOMBRE, ACCESO_PAGINA FROM ACCESOS WHERE PERFIL_ID = ? OR PERFIL_ID IS NULL AND ACCESO_ESTADO = 'A'",
      [per_id]
    );

    // 4. Verificar si el usuario tiene accesos configurados
    if (menuRows.length === 0) {
      return res.status(404).json({ error: `No se encontraron accesos para el perfil ID: ${per_id}.` });
    }

    // 5. Responder con los accesos encontrados
    res.json({ cant: menuRows.length, data: menuRows });

  } catch (error) {
    // Captura de errores en la consulta o la conexión a la base de datos
    console.error("Error al recuperar el menú:", error);
    return res.status(500).json({ error: "Ocurrió un error al recuperar el menú", message: error.message });
  }
};
