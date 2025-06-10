import { Router } from "express";
import { getMedicos, getMedicosxid, postMedicos, putMedicos, patchMedicos, deleteMedicosxid } from "../controladores/medicosC.js";


const router = Router();

router.get('/medicos', getMedicos);
router.get('/medicos/:id', getMedicosxid);
router.post('/medicos', postMedicos);
router.put('/medicos', putMedicos);
router.patch('/medicos/:id', patchMedicos);
router.delete('/medicos/:id', deleteMedicosxid)
export default router; 
