import {App, getApps, initializeApp, ServiceAccount} from "firebase-admin/app"
import {credential} from "firebase-admin"
import {getFirestore} from "firebase-admin/firestore"

import CredentialJSON from "@/axess-credentials.json"

const existingApps = getApps()
let firebaseApp: App;
if (existingApps.length > 0) {
	firebaseApp = existingApps[0];
} else {
	firebaseApp = initializeApp({
		credential: credential.cert(CredentialJSON as ServiceAccount)
	})
}

let db: FirebaseFirestore.Firestore = getFirestore(firebaseApp)

export {
	db
}