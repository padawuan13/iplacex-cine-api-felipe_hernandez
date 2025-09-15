import { ObjectId } from "mongodb";

export function buildActor(payload) {
    const idPelicula = String(payload?.idPelicula ?? "").trim();
    const nombre = String(payload?.nombre ?? "").trim();
    const parsedEdad = Number.parseInt(payload?.edad ?? 0, 10);
    const edad = Number.isFinite(parsedEdad) ? parsedEdad : 0;

    const estaRetirado = payload?.estaRetirado === true || String(payload?.estaRetirado).toLowerCase() === "true";

    const premios = Array.isArray(payload?.premios)
        ? payload?.premios.map((p) => String(p).trim()).filter(Boolean)
        : [];

    const doc = {
        idPelicula,
        nombre,
        edad,
        estaRetirado,
        premios
    };

    if (payload?._id) {
        try {
            doc._id = new ObjectId(String(payload._id));
        } catch {}
    }

    return doc;
}