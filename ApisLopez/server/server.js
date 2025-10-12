import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';

export default class Server {

    constructor() {

        this.app = express();
        this.port = 3000;
        this.generalRoute = '/api/';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.use(this.generalRoute, indexRoutes);

    }

    listen() {

        this.app.listen(this.port, () => {

            console.log('Servidor corriendo en puerto', this.port);

        });

    }

}