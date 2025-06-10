import { Router } from "express";
import { getCitasDetalle, getCitasDetallexid, postCitasDetalle, putCitasDetalle, patchCitasDetalle, deleteCitasDetallexid } from "../controladores/citaDetalle.js";



const router = Router();

//armar las rutas "URL";
router.get('/cita_detalle', getCitasDetalle ),
router.get('/cita_detalle/:id', getCitasDetallexid)
router.post('/cita_detalle', postCitasDetalle)
router.put('/cita_detalle/:id', putCitasDetalle)
router.patch('/cita_detalle/:id', patchCitasDetalle)
router.delete('/cita_detalle/:id', deleteCitasDetallexid)

export default router;