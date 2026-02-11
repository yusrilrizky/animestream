const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Initialize Google Drive API
let drive = null;
let isConfigured = false;

function initGoogleDrive() {
  try {
    // Check if credentials are provided
    if (!process.env.GOOGLE_DRIVE_CLIENT_ID || 
        !process.env.GOOGLE_DRIVE_CLIENT_SECRET || 
        !process.env.GOOGLE_DRIVE_REFRESH_TOKEN) {
      console.log('⚠️ Google Drive not configured (credentials missing)');
      return false;
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_DRIVE_CLIENT_ID,
      process.env.GOOGLE_DRIVE_CLIENT_SECRET,
      process.env.GOOGLE_DRIVE_REDIRECT_URI || 'http://localhost:3000/oauth2callback'
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
    });

    drive = google.drive({ version: 'v3', auth: oauth2Client });
    isConfigured = true;
    console.log('✅ Google Drive API initialized');
    return true;
  } catch (error) {
    console.error('❌ Google Drive init error:', error.message);
    return false;
  }
}

// Upload file to Google Drive
async function uploadToGoogleDrive(filePath, fileName, mimeType = 'video/mp4') {
  if (!isConfigured) {
    throw new Error('Google Drive not configured');
  }

  try {
    console.log('📤 Uploading to Google Drive:', fileName);

    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID || 'root']
    };

    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath)
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, webViewLink, webContentLink'
    });

    console.log('✅ Upload successful:', response.data.id);

    // Make file publicly accessible
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });

    // Get direct download link
    const file = await drive.files.get({
      fileId: response.data.id,
      fields: 'id, name, webViewLink, webContentLink, size'
    });

    return {
      fileId: file.data.id,
      fileName: file.data.name,
      webViewLink: file.data.webViewLink,
      webContentLink: file.data.webContentLink,
      size: file.data.size,
      // Direct streaming link
      streamLink: `https://drive.google.com/uc?export=download&id=${file.data.id}`
    };
  } catch (error) {
    console.error('❌ Google Drive upload error:', error);
    throw error;
  }
}

// Delete file from Google Drive
async function deleteFromGoogleDrive(fileId) {
  if (!isConfigured) {
    throw new Error('Google Drive not configured');
  }

  try {
    await drive.files.delete({
      fileId: fileId
    });
    console.log('🗑️ Deleted from Google Drive:', fileId);
    return true;
  } catch (error) {
    console.error('❌ Google Drive delete error:', error);
    throw error;
  }
}

// Get file info from Google Drive
async function getFileInfo(fileId) {
  if (!isConfigured) {
    throw new Error('Google Drive not configured');
  }

  try {
    const file = await drive.files.get({
      fileId: fileId,
      fields: 'id, name, webViewLink, webContentLink, size, mimeType'
    });
    return file.data;
  } catch (error) {
    console.error('❌ Google Drive get file error:', error);
    throw error;
  }
}

// Generate OAuth URL for getting refresh token
function generateAuthUrl() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI || 'http://localhost:3000/oauth2callback'
  );

  const scopes = [
    'https://www.googleapis.com/auth/drive.file'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  return url;
}

// Get tokens from authorization code
async function getTokensFromCode(code) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI || 'http://localhost:3000/oauth2callback'
  );

  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

module.exports = {
  initGoogleDrive,
  uploadToGoogleDrive,
  deleteFromGoogleDrive,
  getFileInfo,
  generateAuthUrl,
  getTokensFromCode,
  isConfigured: () => isConfigured
};
