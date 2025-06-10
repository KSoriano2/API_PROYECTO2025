import { Router } from "express";
import { recuperarMenu, getAccesos, getAccesoxid, postAcceso, putAcceso, patchAcceso, deleteAccesoxid } from "../controladores/accesosC.js";


const router = Router();

router.post('/menu', recuperarMenu);
router.get('/accesos', getAccesos);
router.get('/accesos/:id', getAccesoxid);
router.post('/accesos', postAcceso);
router.put('/accesos', putAcceso);
router.patch('/accesos/:id', patchAcceso);
router.delete('/accesos/:id', deleteAccesoxid)
export default router; 
