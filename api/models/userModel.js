const { admin } = require('../config/firebase');

// Firebase doesn't use traditional models, but we can create a wrapper for user-related operations

class User {
  // Get user by ID
  static async findById(uid) {
    try {
      return await admin.auth().getUser(uid);
    } catch (error) {
      throw error;
    }
  }
  
  // Get user by email
  static async findByEmail(email) {
    try {
      return await admin.auth().getUserByEmail(email);
    } catch (error) {
      throw error;
    }
  }
  
  // Update user
  static async update(uid, data) {
    try {
      return await admin.auth().updateUser(uid, data);
    } catch (error) {
      throw error;
    }
  }
  
  // Delete user
  static async delete(uid) {
    try {
      return await admin.auth().deleteUser(uid);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;