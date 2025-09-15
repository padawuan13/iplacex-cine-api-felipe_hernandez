import { ObjectId } from "mongodb";
import { getDb } from "../db.js";
import { buildPelicula } from "./pelicula.js";

const peliculaCollection = () => getDb().collection("pelicula");

// Insertar (POST) una nueva pelicula
export async function handleInsertPeliculaRequest(req, res) {
    try {
        const doc = buildPelicula(req.body);
        const r = await peliculaCollection().insertOne(doc);
        return res.status(201).json({ insertedId: r.insertedId });
    } catch (error) {
        return res.status(500).json({ error: "Error al insertar la pelicula", detail: error.message });
    }
}

// Obtener (GET) todas las peliculas
export async function handleGetPeliculasRequest(req, res) {
    try {
        const list = await peliculaCollection().find({}).toArray();
        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener peliculas", detail: error.message });
    }
}

// Obtener (GET) una pelicula por ID
export async function handleGetPeliculaByIdRequest(req, res) {
    let _id;
    try {
        _id = new ObjectId(String(req.params.id));
    } catch {
        return res.status(400).json({ error: "ID de pelicula invalido" });
    }

    try {
        const doc = await peliculaCollection().findOne({ _id });
        return doc ? res.status(200).json(doc) : res.status(404).json({ error: "Pelicula no encontrada" });
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener la pelicula", detail: error.message });
    }
}

// Actualizar (PUT) una pelicula por ID
export async function handleUpdatePeliculaByIdRequest(req, res) {
    let _id;
    try {
        _id = new ObjectId(String(req.params.id));
    } catch {
        return res.status(400).json({ error: "ID de pelicula invalido" });
    }

    try {
        const body = buildPelicula(req.body);
        const r = await peliculaCollection().updateOne({ _id },
            { $set: {nombre: body.nombre, generos: body.generos, anioEstreno: body.anioEstreno}});
        return r.matchedCount === 0
            ? res.status(404).json({ error: "Pelicula no encontrada" })
            : res.status(200).json({ matched: r.matchedCount, modified: r.modifiedCount });
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar pelicula", detail: error.message });
    }
}

// Eliminar (DELETE) una pelicula por ID
export async function handleDeletePeliculaByIdRequest(req, res) {
    let _id;
    try {
        _id = new ObjectId(String(req.params.id));
    } catch {
        return res.status(400).json({ error: "ID de pelicula invalido" });
    }

    try {
        const r = await peliculaCollection().deleteOne({ _id });
        return r.deletedCount === 0
            ? res.status(404).json({ error: "Pelicula no encontrada" })
            : res.status(200).json({ deleted: r.deletedCount });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar pelicula", detail: error.message });
    }
}