const { admin } = require('../config/firebase');
const { error } = require('../utils/responseHandler');

exports.verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, 'No token provided', 401);
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add user data to request
    req.user = decodedToken;
    
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return error(res, 'Invalid or expired token', 401);
  }
};