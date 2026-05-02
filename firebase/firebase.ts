import * as admin from 'firebase-admin';
import { GeoFirestore } from 'geofirestore';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();
const geoFirestore = new GeoFirestore(db);

export { db, geoFirestore };
