import { Router } from "express";
import { getInstitucionesSalud, getInstitucionesSaludxid, postInstitucionSalud, putInstitucionSalud, patchInstitucionSalud, deleteInstitucionSaludxid } from "../controladores/institucionSalud.js";



const router = Router();

//armar las rutas "URL";
router.get('/institucion_salud', getInstitucionesSalud),
router.get('/institucion_salud/:id', getInstitucionesSaludxid)
router.post('/institucion_salud', postInstitucionSalud)
router.put('/institucion_salud/:id', putInstitucionSalud)
router.patch('/institucion_salud/:id', patchInstitucionSalud)
router.delete('/institucion_salud/:id', deleteInstitucionSaludxid)

export default router;