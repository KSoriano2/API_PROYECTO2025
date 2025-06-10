import { Router } from "express";
import { getConsultorios, getConsultoriosxid, postConsultorio, putConsultorio, patchConsultorio, deleteConsultorioxid } from "../controladores/consultorioC.js";


const router = Router();

router.get('/consultorios', getConsultorios);
router.get('/consultorios/:id', getConsultoriosxid)
router.post('/consultorios', postConsultorio)
router.put('/consultorios/:id', putConsultorio)
router.patch('/consultorios/:id', patchConsultorio)
router.delete('/consultorios/:id', deleteConsultorioxid)
export default router; 
