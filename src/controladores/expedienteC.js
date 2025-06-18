import { conmysql } from '../bd.js';

export const buscarPacientePorCedula = async (req, res) => {
  try {
    const {cedula} = req.params;
    const [rows] = await conmysql.query(
      'SELECT ID_PACIENTE, NOMBRE, APELLIDO, CEDULA, CORREO, TELEFONO FROM PACIENTES WHERE CEDULA = ?',
      [cedula]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.json({ data: rows[0] });
  } catch (error) {
    console.error('Error al buscar paciente por cédula:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const obtenerExpedientePorPaciente = async (req, res) => {
  try {
    const {id} = req.params;
    const [rows] = await conmysql.query(
      'SELECT * FROM EXPEDIENTE_MEDICO WHERE ID_PACIENTE = ? AND ESTADO_EXPEDIENTE = "A"',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Expediente no encontrado' });
    }

    res.json({ data: rows[0] });
  } catch (error) {
    console.error('Error al obtener expediente médico:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
