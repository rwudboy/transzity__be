const admin = require('firebase-admin');

// Firebase Admin Singleton
let firebaseAdmin = null;

function initFirebaseAdmin() {
  if (!admin.apps.length) {
    try {
      // Get service account from env var
      let serviceAccount = null;
      
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      } catch (parseError) {
        console.error('Error parsing service account JSON:', parseError);
        throw new Error('Invalid service account JSON format');
      }
      
      // Fix private key if needed
      if (serviceAccount && serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '');
      }
      
      // Initialize app
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      
      console.log('Firebase Admin initialized successfully');
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      throw error;
    }
  }
  
  return admin;
}

// Get Firebase Admin instance
function getFirebaseAdmin() {
  if (!firebaseAdmin) {
    firebaseAdmin = initFirebaseAdmin();
  }
  return firebaseAdmin;
}

// Auth service
function getAuth() {
  return getFirebaseAdmin().auth();
}

// Firestore service
function getFirestore() {
  return getFirebaseAdmin().firestore();
}

// Database service
function getDatabase() {
  return getFirebaseAdmin().database();
}

// Export functions
module.exports = {
  getFirebaseAdmin,
  getAuth,
  getFirestore,
  getDatabase
};