import { Request, Response } from 'express';
import underscore from 'underscore';
import bcrypt from 'bcrypt';
import Usuario from '../Models/UsuarioModel';

class Usuario_Controller {

    public index(req: Request, res: Response) {
        res.send('hola como estas');
    }
    
    public getUsuarios(req: Request, res: Response) {
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
    }

    public async setUsuario(req: Request, res: Response) {
        let body = req.body;

        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 0),
            role: body.role
        });

        await usuario.save((err:any, usuarioDB:any) => {
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
    }

    public async setUsuarioUpdate(req: Request, res: Response) {

        let id = req.body._id;
        let body = underscore.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
        
        await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
    
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
    }

    public async setUsuarioDelete(req: Request, res: Response) {
        let id = req.body._id;

        await Usuario.findByIdAndUpdate(id, {'estado':false}, (err:any, usuarioBorrado:any) => {

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
    }
    
} 

export const usuarioController = new Usuario_Controller();