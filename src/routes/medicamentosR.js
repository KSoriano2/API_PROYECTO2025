import { Router } from "express";
import { getMedicamentos, getMedicamentosxid, postMedicamentos, putMedicamentos, patchMedicamentos, deleteMedicamentosxid } from "../controladores/medicamentosC.js";


const router = Router();

router.get('/medicamentos', getMedicamentos);
router.get('/medicamentos/:id', getMedicamentosxid);
router.post('/medicamentos', upload.single('imagen_medicamento'),postMedicamentos);
router.put('/medicamentos', upload.single('imagen_medicamento'), putMedicamentos);
router.patch('/medicamentos/:id',upload.single('imagen_medicamento'), patchMedicamentos);
router.delete('/medicamentos/:id',deleteMedicamentosxid)
export default router; 
