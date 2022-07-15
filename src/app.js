import express  from "express";
import config from "./config";

import objectRoutes from './routes/objeto.routes'

const app = express()

//setings
app.set('port', config.port || 3000)

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(objectRoutes)

export default app
