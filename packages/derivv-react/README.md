# Derivv - Resize images in the browser before uploading using React

Save time and bandwidth by resizing images in the browser before uploading. Configure target sizes and options to fit your needs.

## Features

- Automatically resizes and crops images to the target size
- Create mulitiple sizes from a single image or multiple images in a single pass
- Optimizes images for faster uploads
- Retains aspect ratio if desired

## Install

React:

```bash
npm install @derivv/core @derivv/react
```

## Usage

Simple usage with multiple files:

```typescript
import { useResize } from "@derivv/react";

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

function App() {
  const { images, resize, errors } = useResize(TARGET_SIZES, options);

  const handleChange = async(e) => {
    await resize(e.target.files);
  };

  if (errors?.length) {
    errors.forEach(console.warn);
  }

  return (
    <div>
      <input type="file" onChange={handleChange} multiple />
      {images?.map((image) => (
        <img src={URL.createObjectURL(image)} alt="Resized" />
      ))}
    </div>
  );
}
```