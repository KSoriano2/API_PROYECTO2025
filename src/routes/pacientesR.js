import { Router } from "express";
import { getPacientes, getPacientesxid, postPacientes, putPaciente, patchPaciente, deletePacientesxid } from "../controladores/pacientesC.js";



const router = Router();

//armar las rutas "URL";
router.get('/pacientes', getPacientes),
router.get('/pacientes/:id', getPacientesxid)
router.post('/pacientes', postPacientes)
router.put('/pacientes/:id', putPaciente)
router.patch('/pacientes/:id', patchPaciente)
router.delete('/pacientes/:id', deletePacientesxid)

export default router;