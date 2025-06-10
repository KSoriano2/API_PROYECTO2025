import { Router } from "express";
import { getPerfiles, getPerfilxid, postPerfil, putPerfil, patchPerfil, deletePerfilxid } from "../controladores/perfilC.js";


const router = Router();

router.get('/perfil', getPerfiles);
router.get('/perfil/:id', getPerfilxid);
router.post('/perfil', postPerfil);
router.put('/perfil', putPerfil);
router.patch('/perfil/:id', patchPerfil);
router.delete('/perfil/:id', deletePerfilxid)
export default router; 
