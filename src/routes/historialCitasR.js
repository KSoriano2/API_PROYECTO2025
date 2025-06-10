import { Router } from "express";
import { getHistorialCitas, getHistorialCitasxid, postHistorialCitas, putHistorialCitas, patchHistorialCitas, deleteHistorialCitaxid  } from "../controladores/historialCitasC.js";


const router = Router();

router.get('/historial_citas', getHistorialCitas);
router.get('/accesos/:id', getHistorialCitasxid);
router.post('/accesos', postHistorialCitas);
router.put('/accesos', putHistorialCitas);
router.patch('/accesos/:id', patchHistorialCitas);
router.delete('/accesos/:id', deleteHistorialCitaxid)
export default router; 
