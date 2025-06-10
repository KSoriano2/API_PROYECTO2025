import { Router } from "express";
import { getMedicamentos, getMedicamentosxid, postMedicamentos, putMedicamentos, patchMedicamentos, deleteMedicamentosxid } from "../controladores/medicamentosC.js";


const router = Router();

router.get('/medicamentos', getMedicamentos);
router.get('/medicamentos/:id', getMedicamentosxid);
router.post('/medicamentos', postMedicamentos);
router.put('/medicamentos', putMedicamentos);
router.patch('/medicamentos/:id', patchMedicamentos);
router.delete('/medicamentos/:id',deleteMedicamentosxid)
export default router; 
