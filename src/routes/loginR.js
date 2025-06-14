import { Router } from "express";
import { loginUsuario, recuperarMenu} from "../controladores/loginC.js";


const router = Router();

router.post('/login', loginUsuario);
router.post('/menu', recuperarMenu);

export default router; 
