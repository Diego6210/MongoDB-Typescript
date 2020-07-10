import { Router,Request, Response} from 'express';
import UsuarioRouter from '../Routers/Usuario';
import { usuarioController } from '../Controller/UsuariosController';

const router: Router = Router();

router.get('/hola', usuarioController.index);

router.use(UsuarioRouter);

export default router;