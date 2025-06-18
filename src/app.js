import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//importar las rutas
import citasRoutes from './routes/citasR.js'
import usuariosRoutes from './routes/usuariosR.js'
import pacientesRoutes from './routes/pacientesR.js'
import institucionSaludRoutes from './routes/institucionSaludR.js' 
import citaDetalleRoutes from './routes/citaDetalleR.js'
import especialidadesRoutes from './routes/especialidadesR.js'
import loginRoutes from './routes/loginR.js'
import accesosRoutes from './routes/accesosR.js'
import consultoriosRoutes from './routes/consultorioR.js'
import expedientesMedicosRoutes from './routes/expedienteMedicoR.js'
import historialCitasRoutes from './routes/historialCitasR.js'
import historialMedicamentosRoutes from './routes/historialMedicamentosR.js'
import institucionEspecialidadRoutes from './routes/institucionEspeR.js'
import medicamentosRoutes from './routes/medicamentosR.js'
import medicosRoutes from './routes/medicosR.js'
import perfilRoutes from './routes/perfilR.js'
import recetasMedicasRoutes from './routes/recetasMedicasR.js'
import recetaMedicamentoRoutes from './routes/recetaMedicamentoR.js'
import horariosMedicoRoutes from './routes/horariosmedicoR.js'
import expedienteRoutes from './routes/expedienteR.js'





//definir los módulos de entrada
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//definir permisos
const corsOptions = {
    origin: '*', //direccion del dominio del servidor
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    Credentials: true
}


const app = express();
app.use(cors(corsOptions));
app.use(express.json()); //interpreta objetos json
app.use(express.urlencoded({extended: true})) //se añade para mostrar formularios
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//indicar que rutas se utiliza
app.use('/api', accesosRoutes)
app.use('/api', citasRoutes)
app.use('/api', citaDetalleRoutes)
app.use('/api', consultoriosRoutes)
app.use('/api', especialidadesRoutes)
app.use('/api', expedientesMedicosRoutes)
app.use('/api', historialCitasRoutes)
app.use('/api', historialMedicamentosRoutes)
app.use('/api', institucionEspecialidadRoutes)
app.use('/api', institucionSaludRoutes)
app.use('/api', loginRoutes)
app.use('/api', medicamentosRoutes)
app.use('/api', medicosRoutes)
app.use('/api', pacientesRoutes)
app.use('/api', perfilRoutes)
app.use('/api', recetasMedicasRoutes)
app.use('/api', recetaMedicamentoRoutes)
app.use('/api', usuariosRoutes)
app.use('/api', horariosMedicoRoutes)
app.use('/api', expedienteRoutes)


app.use((req, resp, next)=>{
    resp.status(400).json({
        message: 'Endpoint not found'
    })
})

export default app;
