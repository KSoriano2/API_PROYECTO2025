import { Router } from "express";
import { getCitasxid, postCitas, putCitas, patchCitas, deleteCitasxid, getCitas } from "../controladores/citasC.js";



const router = Router();

//armar las rutas "URL";
router.get('/citas', getCitas ),
router.get('/citas/:id', getCitasxid)
router.post('/citas', postCitas)
router.put('/citas/:id', putCitas)
router.patch('/citas/:id', patchCitas)
router.delete('/citas/:id', deleteCitasxid)

export default router;