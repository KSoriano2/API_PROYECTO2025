import { Router } from "express";
import { getMedicamentos, getMedicamentosxid, postMedicamentos, putMedicamentos, patchMedicamentos, deleteMedicamentosxid } from "../controladores/medicamentosC.js";
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



router.get('/medicamentos', getMedicamentos);
router.get('/medicamentos/:id', getMedicamentosxid);
router.post('/medicamentos', upload.single('imagen_medicamento'),postMedicamentos);
router.put('/medicamentos', upload.single('imagen_medicamento'), putMedicamentos);
router.patch('/medicamentos/:id',upload.single('imagen_medicamento'), patchMedicamentos);
router.delete('/medicamentos/:id',deleteMedicamentosxid)
export default router; 
