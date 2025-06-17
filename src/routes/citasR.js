import { Router } from "express";
import {getCitas, getCitasOcupadas, getCitasxid, postCitas, putCitas, patchCitas, deleteCitasxid } from "../controladores/citasC.js";



const router = Router();

//armar las rutas "URL";
router.post('/citaspac', getCitas ),
router.get('/citas/:id', getCitasxid)
router.get('/ocupadas/:idMedico/:fecha', getCitasOcupadas);
router.post('/citas', postCitas)
router.put('/citas/:id', putCitas)
router.patch('/citas/:id', patchCitas)
router.delete('/citas/:id', deleteCitasxid)

export default router;
