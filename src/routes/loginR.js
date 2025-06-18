import { Router } from "express";
import { loginUsuario, recuperarMenu, obtenerIdPaciente, obtenerIdMedico} from "../controladores/loginC.js";


const router = Router();

router.post('/login', loginUsuario);
router.post('/menu', recuperarMenu);
router.post('/obteneridpac', obtenerIdPaciente)
router.post('/obteneridmedic', obtenerIdMedico)
export default router; 
