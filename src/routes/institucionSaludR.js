import { Router } from "express";
import { getInstitucionesSalud, getInstitucionesSaludxid, postInstitucionSalud, putInstitucionSalud, patchInstitucionSalud, deleteInstitucionSaludxid } from "../controladores/institucionSaludC.js";
import multer from "multer";


const router = Router();

const storage = multer.diskStorage({
destination: (req, file, cb)=>{
    cb(null, 'uploads'); //carpeta donde se guardan las imagenes
},
filename:(req, file, cb)=>{
    cb(null, `${Date.now()}-${file.originalname}`);
}
})


const upload = multer({storage});



//armar las rutas "URL";
router.get('/institucion_salud', getInstitucionesSalud),
router.get('/institucion_salud/:id', getInstitucionesSaludxid)
router.post('/institucion_salud', upload.single('imagen_institucion'),postInstitucionSalud)
router.put('/institucion_salud/:id', upload.single('imagen_institucion'),putInstitucionSalud)
router.patch('/institucion_salud/:id', upload.single('imagen_institucion'),patchInstitucionSalud)
router.delete('/institucion_salud/:id', deleteInstitucionSaludxid)

export default router;
