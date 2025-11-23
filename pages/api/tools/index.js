import { db } from "../../../lib/firestore";
import { verifyAdmin } from "../../../lib/adminAuth";

export default async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    try {
      if (!db) return res.status(500).json({ error: "Firestore not initialized" });
      const snap = await db.collection("tools").orderBy("createdAt", "desc").get();
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      return res.json({ items });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }

  const admin = await verifyAdmin(req);
  if (!admin) return res.status(401).json({ error: "unauthorized" });

  if (method === "POST") {
    const payload = req.body;
    const now = Date.now();
    const ref = await db.collection("tools").add({ ...payload, createdAt: now, updatedAt: now });
    return res.json({ id: ref.id });
  }

  if (method === "PUT") {
    const { id, update } = req.body;
    if (!id) return res.status(400).json({ error: "missing id" });
    update.updatedAt = Date.now();
    await db.collection("tools").doc(id).set(update, { merge: true });
    return res.json({ ok: true });
  }

  if (method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "missing id" });
    await db.collection("tools").doc(id).delete();
    return res.json({ ok: true });
  }

  res.status(405).end();
}
