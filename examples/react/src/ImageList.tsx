import { formatBytes } from "@derivv/core";
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
  const { images, resize } = useResize(targetSizes, {
    quality: 0.6,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const returnedImages = await resize(e.target.files);
    console.log(returnedImages);
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="file"
          multiple
          onChange={handleChange}
          accept="image/*"
        />
      </div>
      <div>
        {images?.map((image, i) => (
          <div
            key={`${i}${image.size}`}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <img alt="" src={URL.createObjectURL(image)} />
              <div>
                {formatBytes(image.size)}
                <br />
                {image.name}
                <br />
                {image.metadata.width}px x {image.metadata.height}px
              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
