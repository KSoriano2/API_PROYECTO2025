import { Router } from "express";
import {
  getMedicamentos,
  getMedicamentosxid,
  postMedicamentos,
  putMedicamentos,
  patchMedicamentos,
  deleteMedicamentosxid
} from "../controladores/medicamentosC.js";
import multer from "multer";

const router = Router();

// Usamos memoryStorage porque subimos a Cloudinary directamente desde el buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/medicamentos', getMedicamentos);
router.get('/medicamentos/:id', getMedicamentosxid);
router.post('/medicamentos', upload.single('imagen_medicamento'), postMedicamentos);
router.put('/medicamentos/:id', upload.single('imagen_medicamento'), putMedicamentos);  // <--- corregido
router.patch('/medicamentos/:id', upload.single('imagen_medicamento'), patchMedicamentos);
router.delete('/medicamentos/:id', deleteMedicamentosxid);

export default router;
