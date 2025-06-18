import { Router } from 'express';
import {
  buscarPacientePorCedula,
  obtenerExpedientePorPaciente
} from '../controladores/expedienteC.js';

const router = Router();

router.get('/pacientes/cedula/:cedula', buscarPacientePorCedula);
router.get('/expedientes/paciente/:id', obtenerExpedientePorPaciente);

export default router;
