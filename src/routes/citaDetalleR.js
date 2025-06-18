import { Router } from "express";
import { getCitasDetalle, getCitasDetallexid, postCitasDetalle, putCitasDetalle, patchCitasDetalle, patchCamposFaltantes,deleteCitasDetallexid } from "../controladores/citaDetalle.js";



const router = Router();

//armar las rutas "URL";
router.get('/cita_detalle/:id', getCitasDetalle ),
router.get('/obtenercita_detalle/:id', getCitasDetallexid)
router.post('/cita_detalle', postCitasDetalle)
router.put('/cita_detalle/:id', putCitasDetalle)
router.patch('/cita_detalle/:id', patchCitasDetalle)
router.patch('campos_faltantes/:id', patchCamposFaltantes)
router.delete('/cita_detalle/:id', deleteCitasDetallexid)

export default router;
