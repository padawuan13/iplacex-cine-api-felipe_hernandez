import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import {connectMongo} from './src/common/db.js';

import peliculaRoutes from './src/common/pelicula/routes.js';
import actorRoutes from './src/common/actor/routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.status(200).send("Bienvenido al cine Iplacex"));

app.use("/api/peliculas", peliculaRoutes);
app.use("/api/actores", actorRoutes);

connectMongo()
    .then(() => {
        console.log("Conexion exitosa al cluster de MongoDB");
        app.listen(PORT, () => 
            console.log(`Servidor ejecutandose en http://localhost:${PORT}`));
        })
        .catch((error) => {
            console.error("Error al conectar a MongoDB:", error.message);
            process.exit(1);
        });
