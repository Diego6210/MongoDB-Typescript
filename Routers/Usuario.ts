import { Router,Request, Response} from 'express';
import underscore from 'underscore';
import bcrypt from 'bcrypt';
import Usuario from '../Models/UsuarioModel';

const router = Router();

router.get('/getUsuario', (req:Request, res:Response) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find().skip(desde).limit(limite).exec((err, usuarios) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            Usuario.count((err:any, conteo:number) => {

                res.status(200).json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });
        }
    });
});



router.post('/setUsuario', (req:Request, res:Response) =>{

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 0),
        role: body.role
    });

    usuario.save((err:any, usuarioDB:any) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            res.status(200).json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});



router.put('/setUsuario/:id', (req:Request, res:Response) => {

    let id = req.params.id;
    let body = underscore.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            res.status(200).json({
                ok: true,
                usuario: usuarioDB
            });
        }
    })
});

router.delete('/setUsuario/:id', (req:Request, res:Response) => {


    let id = req.params.id;

    let cambiaEstado = [{
        estado: false
    }];

    Usuario.findByIdAndUpdate(id, cambiaEstado, (err:any, usuarioBorrado:any) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }else{
            res.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            });
        }
    });
});



export default router;
