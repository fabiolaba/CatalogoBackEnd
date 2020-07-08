import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as methodOverride from "method-override";
import { SERVER_PORT, urlDb } from './config';
import { Routes } from "routes";
export  class App {
    public app: express.Application;
    public routes: Routes = new Routes();

    public constructor(){
        this.app = express();
        this.routes.routes(this.app);
    }
    public conectar(){
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(methodOverride());
        mongoose.connect(urlDb, (err, res ) => {
            if(err) {
                console.log('Error al conectarse a la Base de datos ', err);
            }
            this.app.listen(SERVER_PORT, ()=> {
                console.log('Servidor corriendo en el puerto ', SERVER_PORT);
            })
        });
    }
} 