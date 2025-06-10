import { Router } from "express";
import { recuperarMenu} from "../controladores/menuC.js";


const router = Router();

router.post('/menu', recuperarMenu);

export default router;