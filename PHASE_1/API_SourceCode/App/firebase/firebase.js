const { initializeApp, cert } = require('firebase-admin/app');
require('dotenv').config({ path: __dirname + '/../../../../.env.local' });

// Setting up the Firebase Admin SDK 
const serviceAccount = {
    "type": process.env.FIRESTORE_TYPE,
    "project_id": process.env.FIRESTORE_PROJECT_ID,
    "private_key_id": process.env.FIRESTORE_PRIVATE_KEY,
    "private_key": process.env.FIRESTORE_PRIVATE_KEY
        ? JSON.parse(process.env.FIRESTORE_PRIVATE_KEY).privateKey
        : null,
    "client_email": process.env.FIRESTORE_CLIENT_EMAIL,
    "client_id": process.env.FIRESTORE_CLIENT_ID,
    "auth_uri": process.env.FIRESTORE_AUTH_URI,
    "token_uri": process.env.FIRESTORE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIRESTORE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIRESTORE_CLIENT_X509_CERT_URL,
}

// Initialse the Firebase app
initializeApp({
    credential: cert(serviceAccount)
});
