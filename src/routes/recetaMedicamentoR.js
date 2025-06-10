import { Router } from "express";
import { getRecetasMedicamentos, getRecetasMedicamentosxid, postRecetasMedicamentos, putRecetaMedicamento, patchRecetaMedicamento, deleteRecetaMedicamentoxid } from "../controladores/recetaMedicamentoC.js";


const router = Router();

router.get('/receta_medicamento', getRecetasMedicamentos);
router.get('/receta_medicamento/:id', getRecetasMedicamentosxid);
router.post('/receta_medicamento', postRecetasMedicamentos);
router.put('/receta_medicamento', putRecetaMedicamento);
router.patch('/receta_medicamento/:id', patchRecetaMedicamento);
router.delete('/receta_medicamento/:id', deleteRecetaMedicamentoxid)
export default router; 
