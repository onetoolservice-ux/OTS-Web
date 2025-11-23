import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let db = null;
if (!global._firebaseAdminInitialized) {
  try {
    const base64 = process.env.FIREBASE_SA_JSON_BASE64 || "";
    if (base64) {
      const sa = JSON.parse(Buffer.from(base64, "base64").toString());
      initializeApp({ credential: cert(sa) });
      global._firebaseAdminInitialized = true;
    }
  } catch (e) {
    console.warn("FIREBASE_SA_JSON_BASE64 not set or invalid.");
  }
}
try { db = getFirestore(); } catch (e) { db = null; }
export { db };
