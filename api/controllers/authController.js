const axios = require('axios');
const { admin } = require('../config/firebase');
const { success, error } = require('../utils/responseHandler');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    // Validation
    if (!email || !password) {
      return error(res, 'Email and password are required', 400);
    }
    
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || '',
      emailVerified: false,
    });
    
    // Return success response
    return success(res, 'User registered successfully', {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName
    }, 201);
    
  } catch (err) {
    console.error('Registration error:', err.message);
    return error(res, err.message, 400);
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return error(res, 'Email and password are required', 400);
    }
    
    // Using Firebase Auth REST API for email/password authentication
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );
    
    // Return success response with token
    return success(res, 'Login successful', {
      token: response.data.idToken,
      refreshToken: response.data.refreshToken,
      expiresIn: response.data.expiresIn,
      uid: response.data.localId,
      email: response.data.email
    });
    
  } catch (err) {
    console.error('Login error:', err.message);
    const errorMessage = err.response?.data?.error?.message || 'Invalid email or password';
    return error(res, errorMessage, 401);
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return error(res, 'Email is required', 400);
    }
    
    // Send password reset email using Firebase Auth REST API
    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        requestType: 'PASSWORD_RESET',
        email
      }
    );
    
    return success(res, 'Password reset email sent');
    
  } catch (err) {
    console.error('Forgot password error:', err.message);
    const errorMessage = err.response?.data?.error?.message || 'Failed to send password reset email';
    return error(res, errorMessage, 400);
  }
};