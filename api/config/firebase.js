const admin = require('firebase-admin');

// Initialize Firebase Admin only once
let adminInstance = null;

function getAdmin() {
  if (!adminInstance && !admin.apps.length) {
    try {
      // Parse service account JSON
      let serviceAccount;
      try {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        
        // Fix private key format if needed
        if (typeof serviceAccount.private_key === 'string') {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '');
        }
      } catch (parseError) {
        console.error('Error parsing Firebase service account:', parseError);
        throw new Error('Invalid service account format');
      }
      
      // Initialize app
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      
      adminInstance = admin;
      console.log('Firebase Admin initialized successfully');
    } catch (error) {
      console.error('Firebase Admin initialization error:', error);
      throw error;
    }
  } else if (adminInstance) {
    return adminInstance;
  } else if (admin.apps.length) {
    adminInstance = admin;
  }
  
  return admin;
}

// Export the admin instance
module.exports = {
  admin: getAdmin()
};