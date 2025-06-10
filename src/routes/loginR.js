import { Router } from "express";
import { loginUsuario} from "../controladores/loginC.js";


const router = Router();

router.post('/login', loginUsuario);

export default router; 
