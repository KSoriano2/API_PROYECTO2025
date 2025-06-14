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
router.get('/institucionsalud', getInstitucionesSalud),
router.get('/institucionsalud/:id', getInstitucionesSaludxid)
router.post('/institucionsalud', upload.single('imagen_institucion'),postInstitucionSalud)
router.put('/institucionsalud/:id', upload.single('imagen_institucion'),putInstitucionSalud)
router.patch('/institucionsalud/:id', upload.single('imagen_institucion'),patchInstitucionSalud)
router.delete('/institucionsalud/:id', deleteInstitucionSaludxid)

export default router;
