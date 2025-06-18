import { Router } from "express";
import { getMedicamentosPorReceta,getRecetasPorPaciente,getRecetasMedicas,getRecetasMedicasxid, postRecetasMedicas, putRecetasMedicas, patchRecetasMedicas, deleteRecetasMedicasxid } from "../controladores/recetasMedicasC.js";


const router = Router();
router.get('/recetas/medicamentos/:id', getMedicamentosPorReceta);
router.get('/recetas_medicas', getRecetasMedicas);
router.get('/recetas_medicas/:id', getRecetasMedicasxid);
router.get('/paciente_recetas/:id', getRecetasPorPaciente);
router.post('/recetas_medicas', postRecetasMedicas);
router.put('/recetas_medicas', putRecetasMedicas);
router.patch('/recetas_medicas/:id', patchRecetasMedicas);
router.delete('/recetas_medicas/:id', deleteRecetasMedicasxid)

export default router; 
