import { Router } from "express";
import { getHistorialMedicamentos, getHistorialMedicamentosxid, postHistorialMedicamentos, putHistorialMedicamentos, patchHistorialMedicamentos, deleteHistorialMedicamentoxid } from "../controladores/historialMedicamentosC.js";


const router = Router();

router.get('/historial_medicamentos', getHistorialMedicamentos);
router.get('/historial_medicamentos/:id', getHistorialMedicamentosxid);
router.post('/historial_medicamentos', postHistorialMedicamentos);
router.put('/historial_medicamentos', putHistorialMedicamentos);
router.patch('/historial_medicamentos/:id', patchHistorialMedicamentos);
router.delete('/historial_medicamentos/:id', deleteHistorialMedicamentoxid)
export default router; 
