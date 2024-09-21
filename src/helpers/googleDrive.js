// src/helpers/googleDrive.js
import { gapi } from "gapi-script";

// Create or update a file in Google Drive
export const createFile = async (filename, content, accessToken) => {
  const file = new Blob([content], { type: "application/json" });
  const metadata = {
    name: filename,
    mimeType: "application/json",
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  const data = await response.json();
  return data;
};

// Fetch a file from Google Drive by name
export const getFile = async (filename, accessToken) => {
  // Search for the file by name
  const searchResponse = await gapi.client.drive.files.list({
    q: `name='${filename}' and mimeType='application/json'`,
    fields: "files(id, name)",
    spaces: "drive",
  });

  const files = searchResponse.result.files;
  if (files && files.length > 0) {
    const fileId = files[0].id;

    // Get the file content
    const fileResponse = await gapi.client.drive.files.get({
      fileId,
      alt: "media",
    });

    return fileResponse.body;
  }

  return null;
};
