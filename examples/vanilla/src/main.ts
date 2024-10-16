import { resize, ImageFile } from "@derivv/core";
import "./style.css";

const targetSizes = [
  {
    height: 200,
    width: 300,
  },
  {
    height: 500,
    width: 200,
  },
  {
    height: 100,
    width: 100,
  },
  {
    height: 500,
    width: 500,
  },
  {
    height: 1000,
    width: 2000,
  },
  {
    height: 1000,
  },
  {
    width: 1000,
  },
  {},
];

const images: ImageFile[] = [];

const handleSubmit = async (event: Event) => {
  event.preventDefault();
  if (images.length === 0) return;

  const formData = new FormData();

  for (const image of images) {
    formData.append("files", image);
  }

  await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });
};

const makeImages = async (event: Event) => {
  images.splice(0, images.length); // Clear images

  const files = (event.target as HTMLInputElement).files;

  if (!files) return;

  const { images: _images, errors } = await resize(files, targetSizes);

  images.push(..._images);

  for (const error of errors) {
    console.warn(error);
  }
};

document.querySelector<HTMLInputElement>("#files")!.onchange = makeImages;
document.querySelector<HTMLFormElement>("#form")!.onsubmit = handleSubmit;
