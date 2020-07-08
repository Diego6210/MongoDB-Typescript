import { Server } from './Server/Server';
import { environment } from './Config/Config';

const server =  Server.init(environment.port);

server.Iniciar();