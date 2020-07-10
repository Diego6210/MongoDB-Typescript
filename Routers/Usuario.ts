import { Router,Request, Response} from 'express';
import { usuarioController } from '../Controller/UsuariosController';

class UsuarioRouter{
    public router: Router = Router();

    constructor() {
        this.init();
    }

    init(): void {
        this.router.get('/getUsuario', usuarioController.getUsuarios);
        this.router.post('/setUsuario', usuarioController.setUsuario);
        this.router.put('/setUsuario', usuarioController.setUsuarioUpdate);
        this.router.delete('/setUsuario', usuarioController.setUsuarioDelete);
    }
}

const usuarioRouter = new UsuarioRouter();
export default usuarioRouter.router;
