import { Router } from "express";
import { getHorariosMedicos, postHorariosMedicos, putHorariosMedicos, patchHorariosMedico, deleteHorariosMedicoxid } from "../controladores/horariosmedicoC.js";


const router = Router();


router.get('/horariosmedico/:id', getHorariosMedicos);
router.post('/horariosmedico', postHorariosMedicos);
router.put('/horariosmedico', putHorariosMedicos);
router.patch('/horariosmedico/:id', patchHorariosMedico);
router.delete('/horariosmedico/:id', deleteHorariosMedicoxid)
export default router; 
