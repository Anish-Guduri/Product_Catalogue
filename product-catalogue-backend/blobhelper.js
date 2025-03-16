// Code for uploading files to Azure Blob Storage and generating a SAS URL for read access to the uploaded blob.
require('dotenv').config();
const {
  BlobServiceClient,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
  StorageSharedKeyCredential
} = require('@azure/storage-blob');

/**
 * Uploads a file buffer to Azure Blob Storage (private container) and returns
 * a short-lived SAS URL for read access to the uploaded blob.
 * 
 * @param {Buffer} fileBuffer - The file buffer to upload.
 * @param {string} fileName - The name for the blob (include extension).
 * @param {string} mimetype - MIME type of the file.
 * @returns {Promise<string>} - A SAS URL for the uploaded blob.
 */
async function uploadToBlob(fileBuffer, fileName, mimetype) {
  // Create the BlobServiceClient from the connection string
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  const containerName = process.env.BLOB_CONTAINER_NAME;

  // Create/get container client
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  // Upload the file
  const blobClient = containerClient.getBlockBlobClient(fileName);
  await blobClient.upload(fileBuffer, fileBuffer.length, {
    blobHTTPHeaders: { blobContentType: mimetype }
  });

  // Set SAS token expiry to 60 days (approx. 2 months)
  const TWO_MONTHS_IN_MS = 60 * 24 * 60 * 60 * 1000; // 60 days in milliseconds
  const now = new Date();
  const expiresOn = new Date(now.valueOf() + TWO_MONTHS_IN_MS);

  // Parse storage account name from the connection string
  const accountNameMatch = process.env.AZURE_STORAGE_CONNECTION_STRING.match(/AccountName=(.*?);/);
  if (!accountNameMatch) {
    throw new Error('Could not parse storage account name from connection string.');
  }
  const accountName = accountNameMatch[1];

  // We need a shared key credential for generateBlobSASQueryParameters
  // The connection string includes AccountKey=<key>
  const accountKeyMatch = process.env.AZURE_STORAGE_CONNECTION_STRING.match(/AccountKey=(.*?);/);
  if (!accountKeyMatch) {
    throw new Error('Could not parse account key from connection string.');
  }
  const accountKey = accountKeyMatch[1];

  // Create the credential needed for generating the SAS token
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  // Define permissions, start time, and expiry time for the SAS
  const sasOptions = {
    containerName: containerName,
    blobName: fileName,
    permissions: BlobSASPermissions.parse("r"), // "r" = read permission
    startsOn: now,
    expiresOn: expiresOn
  };

  // Generate the SAS token
  const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

  // Construct the final SAS URL
  const sasUrl = `${blobClient.url}?${sasToken}`;

  return sasUrl;
}

module.exports = { uploadToBlob };
