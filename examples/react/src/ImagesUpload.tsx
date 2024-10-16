import { useEffect } from "react";
import { useResize } from "@derivv/react";

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

export default function ImageList() {
  const { images, resize, errors } = useResize(targetSizes, {
    quality: 0.6,
  });

  useEffect(() => {
    if (errors) {
      errors.forEach((error) => console.warn(error));
    }
  }, [errors]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await resize(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!images) return;

    const formData  = new FormData();

    for (const image of images) {
      formData.append("files", image);
    }
    
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    console.log(response);
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="files"
            onChange={handleChange}
            multiple
            accept="image/*"
          />
          <button type="submit" disabled={!images}>Upload</button>
        </form>
      </div>
    </div>
  );
}
