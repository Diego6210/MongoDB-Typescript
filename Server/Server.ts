import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from '../Routers/Routers'
import { environment } from '../Config/Config';

export class Server{

    public app: express.Application;
    private port: number;

    constructor(port:number){
        this.port = port;
        this.app = express();
        
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.use(router);
    }

    static init(port:number){
        return new Server(port);
    }

    Iniciar(){
        this.app.listen(this.port);
        console.log(`Servidor corriendo en el puerto: ${this.port}`);

        mongoose.connect(environment.urlDB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }).then(db => console.log('Conectado a la Base de datos')).catch(err => console.error(err));
    }

}