const fileTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  heic: "image/heic",
  heif: "image/heif",
  tiff: "image/tiff",
  tif: "image/tiff",
  bmp: "image/bmp",
  gif: "image/gif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  cur: "image/x-icon",
  psd: "image/vnd.adobe.photoshop"
};

export async function createFileFromURL(url: string): Promise<File>  {
  url = new URL(url).href;

  const response = await fetch(url);
  const blob = await response.blob();

  const fileName = url.split("/").pop() as string;
  const fileExtension = fileName.split(".").pop() as keyof typeof fileTypes;
  const fileType = fileTypes[fileExtension];

  return new File([blob], fileName, { type: fileType });
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
