import { Router } from "express";
import { getExpedientesMedicos, getExpedienteMedicoxid, postExpedienteMedico, putExpedienteMedico, patchExpedienteMedico, deleteExpedienteMedicoxid } from "../controladores/expedienteMedicoC.js";


const router = Router();

router.get('/expediente_medico', getExpedientesMedicos);
router.get('/expediente_medico/:id', getExpedienteMedicoxid)
router.post('/expediente_medico', postExpedienteMedico)
router.put('/expediente_medico/:id', putExpedienteMedico)
router.patch('/expediente_medico/:id', patchExpedienteMedico)
router.delete('/expediente_medico/:id', deleteExpedienteMedicoxid)
export default router; 
