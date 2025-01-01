export const pixelsToInches = (n: number, dpi: number) => {
  return Math.round((n / dpi) * 100) / 100;
};

export const inchesToPixels = (n: number, dpi: number) => Math.round(n * dpi);

