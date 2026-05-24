# Portfolio Backend Integration Guide

This document outlines how to replace the current mock API layer with a real backend for Alanwoko Chikanma's portfolio.

## Current Setup
The frontend is built with Next.js 15+ and uses local API routes to read/write to `data/portfolio.json`.

- `src/app/api/get-data/route.js`: Fetches the current portfolio data.
- `src/app/api/update-data/route.js`: Persists updated portfolio data to the JSON file.
- `src/app/api/upload/route.js`: Mock upload service for images and CVs.

## Steps for Real Integration

### 1. Configure Cloudinary
The `api/upload` route is already set up to use the `cloudinary` SDK.
- Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` to your `.env.local` file.
- Update `src/app/api/upload/route.js` to uncomment the real upload logic:
  ```javascript
  const formData = await request.formData();
  const file = formData.get('file');
  const buffer = Buffer.from(await file.arrayBuffer());
  
  const uploadResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
  
  return NextResponse.json({ url: uploadResponse.secure_url });
  ```

### 2. Connect a Real Database
To move away from `portfolio.json`:
- Set up a database (e.g., MongoDB, PostgreSQL, or Turso).
- Update `src/app/api/get-data/route.js` to fetch from the database.
- Update `src/app/api/update-data/route.js` to perform an `update` or `upsert` in the database.

### 3. Authentication
Currently, "Admin Mode" is toggled via local storage (for demo purposes).
- For a real application, implement NextAuth.js or a similar solution.
- Protect the `POST` methods in `api/update-data` and `api/upload` by checking the session/token.

## Frontend Components
The frontend components (`Hero.jsx`, `About.jsx`, `CV.jsx`, `Projects.jsx`) are already designed to handle loading states and display updated data immediately upon successful API calls. No changes to the UI components are required for backend integration.
