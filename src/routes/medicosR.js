import { Router } from "express";
import { getMedicos, getMedicosxid, postMedicos, putMedicos, patchMedicos, deleteMedicosxid } from "../controladores/medicosC.js";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });




router.get('/medicos', getMedicos);
router.get('/medicos/:id', getMedicosxid);
router.post('/medicos',upload.single('imagen_medico') ,postMedicos);
router.put('/medicos/:id',upload.single('imagen_medico') ,putMedicos);
router.patch('/medicos/:id',upload.single('imagen_medico') ,patchMedicos);
router.delete('/medicos/:id' ,deleteMedicosxid)
export default router; 
