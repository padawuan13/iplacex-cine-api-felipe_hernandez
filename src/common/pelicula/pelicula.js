import { ObjectId } from "mongodb";

export function buildPelicula(payload) {
    const nombre = String(payload?.nombre ?? "").trim();

    const generos = Array.isArray(payload?.generos)
        ? payload?.generos.map((g) => String(g).trim()).filter(Boolean)
        : [];

        const parsedYear = Number.parseInt(payload?.anioEstreno ?? 0, 10);
        const anioEstreno = Number.isFinite(parsedYear) ? parsedYear : 0;

    const doc = {
        nombre,
        generos,
        anioEstreno
    };

    if (payload?._id) {
        try {
            doc._id = new ObjectId(String(payload._id));
        } catch {}
    }
    return doc;
}

