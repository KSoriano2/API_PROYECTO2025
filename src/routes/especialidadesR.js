import { Router } from "express";
import { getEspecialidades, getEspecialidadxid, postEspecialidad, putEspecialidad, patchEspecialidad, deleteEspecialidadxid } from "../controladores/especialidadesC.js";



const router = Router();

//armar las rutas "URL";
router.get('/especialidades', getEspecialidades),
router.get('/especialidades/:id', getEspecialidadxid)
router.post('/especialidades', postEspecialidad)
router.put('/especialidades/:id', putEspecialidad)
router.patch('/especialidades/:id', patchEspecialidad)
router.delete('/especialidades/:id', deleteEspecialidadxid)

export default router;