# Derivv - Resize images in the browser before uploading

Save time and bandwidth by resizing images in the browser before uploading. Configure target sizes and options to fit your needs.

## Features

- Automatically resizes and crops images to the target size
- Create mulitiple sizes from a single image or multiple images in a single pass
- Optimizes images for faster uploads
- Retains aspect ratio if desired

## Install

```bash
npm install @derivv/core
```

## Usage

Simple usage with multiple files:

```typescript
// index.js
import { resize } from "@derivv/core";

const TARGET_SIZES = [
  { width: 100, height: 100 },
  { width: 200, height: 200 },
  { width: 300 }, // Height will be calculated to maintain aspect ratio
  { height: 300 }, // Width will be calculated to maintain aspect ratio
  {} // Image will only be compressed
];

const options = {
  quality: 0.6, // default 0.7
  // disableCrop: true, // default false
  // cropCoordinates: { // set custom crop coordinates
  //   x: 0,
  //   y: 0,
  // },
};

document.getElementById("file").addEventListener("change", async (e) => {
  const { images, errors } = await resize(e.target.files, TARGET_SIZES, options);

  images.forEach((image) => {
    document.body.appendChild(`
      <img src="${URL.createObjectURL(image)}" />
    `);
  });

  errors.forEach(console.warn);
});
```

```html
<!-- index.html -->
<html>
  <head>
    <script src="index.js"></script>
  </head>
  <body>
    <input type="file" id="file" multiple />
  </body>
</html>
```