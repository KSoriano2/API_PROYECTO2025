import { Router } from "express";
import { getInstitucionEspe, getInstitucionEspexid, postInstitucionEspe, putInstitucionEspe, patchInstitucionEspe, deleteInstitucionEspexid } from "../controladores/institucionEspeC.js";


const router = Router();

router.get('/institucion_especialidad/:id', getInstitucionEspe);
router.get('/institucion_especialidad/:id', getInstitucionEspexid);
router.post('/institucion_especialidad', postInstitucionEspe);
router.put('/institucion_especialidad', putInstitucionEspe);
router.patch('/institucion_especialidad/:id', patchInstitucionEspe);
router.delete('/institucion_especialidad/:id', deleteInstitucionEspexid)
export default router; 


