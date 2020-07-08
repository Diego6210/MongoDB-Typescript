import { Router,Request, Response} from 'express';
import Usuario from '../Routers/Usuario';

const router: Router = Router();

router.get('/hola', (req:Request, res:Response) =>{
    res.send('hola como estas');
});

router.use(Usuario);

export default router;