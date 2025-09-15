import { ObjectId } from "mongodb";
import { getDb } from "../db.js";
import { buildActor } from "./actor.js";

const COLLECTION = "actor";

// Ingresar (POST) un nuevo actor
export async function handleInsertActorRequest(req, res) {
    const db = getDb();
    const {nombrePelicula } = req.body;
    if (!nombrePelicula) 
        return res.status(400).json({ error: "Faltan datos obligatorios (nombre Pelicula)" });

    return db.collection("pelicula").findOne({ nombre: String(nombrePelicula).trim() })
        .then(pelicula => {
            if (!pelicula) return res.status(404).json({ error: "No existe la pelicula indicada" });

            const actor = buildActor(req.body);
            actor.idPelicula = String(pelicula._id);

            return db.collection(COLLECTION).insertOne(actor)
                .then(r => res.status(201).json({ insertedId: r.insertedId }))
                .catch(err => res.status(500).json({ error: "Error al insertar el actor", details: err.message }));
        })
        .catch(err => res.status(500).json({ error: "Error al buscar la pelicula", details: err.message }));    
}

// Listar (GET) todos los actores
export async function handleGetActoresRequest(req, res) {
    const db = getDb();
    return db.collection(COLLECTION).find().toArray()
        .then(list => res.status(200).json(list))
        .catch(err => res.status(500).json({ error: "Error al listar los actores", details: err.message }));
}

// Obtener (GET) un actor por su ID
export async function handleGetActorByIdRequest(req, res) {
    const db = getDb();
    let _id;
    try {
        _id = new ObjectId(String(req.params.id));
    } catch {
        return res.status(400).json({ error: "ID de actor inválido"});
    }
    return db.collection(COLLECTION).findOne({ _id })
        .then(doc => doc ? res.status(200).json(doc) : res.status(404).json({ error: "No existe el actor indicado" }))
        .catch(err => res.status(500).json({ error: "Error al buscar el actor", details: err.message }));
}

// Listar (GET) actores por ID de pelicula
export async function handleGetActoresByPeliculaRequest(req, res) {
    const db = getDb();
    const peliculaId = String(req.params.id || "").trim();
    if (!peliculaId) return res.status(400).json({ error: "Falta el ID de la pelicula" });

    return db.collection(COLLECTION).find({ idPelicula: peliculaId }).toArray()
        .then(list => res.status(200).json(list))
        .catch(err => res.status(500).json({ error: "Error al listar los actores de la pelicula", details: err.message }));
}