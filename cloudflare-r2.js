const { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Initialize R2 Client
let r2Client = null;
let isConfigured = false;
let bucketName = null;
let publicUrl = null;

function initCloudflareR2() {
  try {
    // Check if credentials are provided
    if (!process.env.R2_ACCOUNT_ID || 
        !process.env.R2_ACCESS_KEY_ID || 
        !process.env.R2_SECRET_ACCESS_KEY ||
        !process.env.R2_BUCKET_NAME) {
      console.log('⚠️ Cloudflare R2 not configured (credentials missing)');
      return false;
    }

    const accountId = process.env.R2_ACCOUNT_ID;
    bucketName = process.env.R2_BUCKET_NAME;
    publicUrl = process.env.R2_PUBLIC_URL || `https://${bucketName}.${accountId}.r2.cloudflarestorage.com`;

    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });

    isConfigured = true;
    console.log('✅ Cloudflare R2 initialized');
    console.log('📦 Bucket:', bucketName);
    return true;
  } catch (error) {
    console.error('❌ Cloudflare R2 init error:', error.message);
    return false;
  }
}

// Upload file to R2
async function uploadToR2(filePath, fileName, mimeType = 'video/mp4') {
  if (!isConfigured) {
    throw new Error('Cloudflare R2 not configured');
  }

  try {
    console.log('📤 Uploading to Cloudflare R2:', fileName);

    const fileContent = fs.readFileSync(filePath);
    const key = `videos/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ContentType: mimeType,
    });

    await r2Client.send(command);

    console.log('✅ Upload successful:', key);

    // Generate public URL
    const fileUrl = `${publicUrl}/${key}`;

    return {
      key: key,
      fileName: fileName,
      url: fileUrl,
      size: fileContent.length,
      bucket: bucketName
    };
  } catch (error) {
    console.error('❌ Cloudflare R2 upload error:', error);
    throw error;
  }
}

// Delete file from R2
async function deleteFromR2(key) {
  if (!isConfigured) {
    throw new Error('Cloudflare R2 not configured');
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await r2Client.send(command);
    console.log('🗑️ Deleted from R2:', key);
    return true;
  } catch (error) {
    console.error('❌ Cloudflare R2 delete error:', error);
    throw error;
  }
}

// Get file info from R2
async function getFileInfo(key) {
  if (!isConfigured) {
    throw new Error('Cloudflare R2 not configured');
  }

  try {
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await r2Client.send(command);
    return {
      key: key,
      size: response.ContentLength,
      contentType: response.ContentType,
      lastModified: response.LastModified,
      url: `${publicUrl}/${key}`
    };
  } catch (error) {
    console.error('❌ Cloudflare R2 get file error:', error);
    throw error;
  }
}

module.exports = {
  initCloudflareR2,
  uploadToR2,
  deleteFromR2,
  getFileInfo,
  isConfigured: () => isConfigured
};
