import { Router } from "express";
import { loginUsuario, recuperarMenu, obtenerIdPaciente} from "../controladores/loginC.js";


const router = Router();

router.post('/login', loginUsuario);
router.post('/menu', recuperarMenu);
router.post('/obteneridpac', obtenerIdPaciente)
export default router; 
