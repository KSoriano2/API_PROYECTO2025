import { Router } from "express";
import {
  getMedicamentos,
  getMedicamentosxid,
  restarStock,
  postMedicamentos,
  putMedicamentos,
  patchMedicamentos,
  deleteMedicamentosxid
} from "../controladores/medicamentosC.js";
import multer from "multer";

const router = Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/medicamentos', getMedicamentos);
router.get('/medicamentos/:id', getMedicamentosxid);
router.post('/medicamentos', upload.single('imagen_medicamento'), postMedicamentos);
router.patch('/medicamentos/restar_stock', restarStock)
router.put('/medicamentos/:id', upload.single('imagen_medicamento'), putMedicamentos);  
router.patch('/medicamentos/:id', upload.single('imagen_medicamento'), patchMedicamentos);
router.delete('/medicamentos/:id', deleteMedicamentosxid);

export default router;
